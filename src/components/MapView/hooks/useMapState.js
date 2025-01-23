import { useState, useEffect } from 'react';
import { fetchLocations, createLocation, updateLocation, deleteLocations } from '../../../services/api';

export const useMapState = ({
  username,
  onLocationDeleted = () => { },
  onLocationApproved = () => { },
  onLocationEdited = () => { },
  onError = () => { }
}) => {
  const [sampleLocations, setSampleLocations] = useState([]);
  const [pendingLocations, setPendingLocations] = useState([]);
  const [reviewedLocations, setReviewedLocations] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isAddingLocation, setIsAddingLocation] = useState(false);
  const [editingPopup, setEditingPopup] = useState(null);
  const [editingData, setEditingData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [expandedGroups, setExpandedGroups] = useState({});

  const refreshLocations = async () => {
    try {
      const [sampleData, pendingData, reviewedData] = await Promise.all([
        fetchLocations('sample_data'),
        fetchLocations('pending_data'),
        fetchLocations('reviewed_data')
      ]);

      setSampleLocations(sampleData);
      setPendingLocations(pendingData);
      setReviewedLocations(reviewedData);
    } catch (error) {
      console.error('Error refreshing locations:', error);
      setError('Failed to refresh locations');
      onError('Failed to refresh locations');
    }
  };

  useEffect(() => {
    refreshLocations();
  }, []);

  const handleDeleteLocations = async (indices) => {
    try {
      // Handle array of indices for batch delete
      for (const index of indices) {
        const [collection, id] = index.split('-');
        let locationToDelete;
        let collectionName;

        // Find location by MongoDB _id
        switch (collection) {
          case 'sample':
            locationToDelete = sampleLocations.find(loc => loc._id === id);
            collectionName = 'sample_data';
            break;
          case 'pending':
            locationToDelete = pendingLocations.find(loc => loc._id === id);
            collectionName = 'pending_data';
            break;
          case 'reviewed':
            locationToDelete = reviewedLocations.find(loc => loc._id === id);
            collectionName = 'reviewed_data';
            break;
          default:
            continue;
        }

        if (!locationToDelete) {
          console.error('Location not found for deletion:', index);
          continue;
        }

        await deleteLocations([locationToDelete._id], collectionName);

        // Update the state based on the collection
        switch (collection) {
          case 'sample':
            setSampleLocations(prevLocations =>
              prevLocations.filter(loc => loc._id !== id)
            );
            break;
          case 'pending':
            setPendingLocations(prevLocations =>
              prevLocations.filter(loc => loc._id !== id)
            );
            break;
          case 'reviewed':
            setReviewedLocations(prevLocations =>
              prevLocations.filter(loc => loc._id !== id)
            );
            break;
        }
      }

      setSelectedRow(null);
      setSelectedLocation(null);

      // Show notification for successful deletion
      onLocationDeleted(indices.length);
    } catch (error) {
      console.error('Error deleting locations:', error);
      onError('Failed to delete locations');
    }
  };

  const handlePopupEdit = (location, index) => {
    console.log('Editing location:', location);
    console.log('With index:', index);
    setEditingPopup(index);
    setEditingData({
      ...location,
      latitude: parseFloat(location.latitude),
      longitude: parseFloat(location.longitude)
    });
  };

  const handlePopupSave = async (index, updatedData) => {
    try {
      console.log('Saving location with index:', index);
      const [type, id] = index.split('-');
      console.log('Type:', type, 'ID:', id);

      let location;
      let collection;

      // Determine collection and find location
      switch (type) {
        case 'sample':
          location = sampleLocations.find(loc => loc._id === id);
          collection = 'sample_data';
          break;
        case 'pending':
          location = pendingLocations.find(loc => loc._id === id);
          collection = 'pending_data';
          break;
        case 'reviewed':
          location = reviewedLocations.find(loc => loc._id === id);
          collection = 'reviewed_data';
          break;
        default:
          console.error('Invalid location type:', type);
          return;
      }

      if (!location) {
        console.error('Location not found for index:', index);
        console.log('Available pending locations:', pendingLocations);
        return;
      }

      console.log('Found location:', location);
      console.log('Location ID:', location._id);
      console.log('Updated data:', updatedData);

      try {
        console.log(`Attempting to update location ${location._id} in collection ${collection}`);
        const updatedLocation = await updateLocation(location._id, updatedData, collection);
        console.log('Successfully updated location:', updatedLocation);

        // Update the local state
        switch (type) {
          case 'sample':
            setSampleLocations(prevLocations =>
              prevLocations.map(loc => loc._id === location._id ? updatedLocation : loc)
            );
            break;
          case 'pending':
            setPendingLocations(prevLocations =>
              prevLocations.map(loc => loc._id === location._id ? updatedLocation : loc)
            );
            break;
          case 'reviewed':
            setReviewedLocations(prevLocations =>
              prevLocations.map(loc => loc._id === location._id ? updatedLocation : loc)
            );
            break;
        }

        setEditingPopup(null);
        setEditingData(null);

        // Show notification for successful update
        onLocationEdited();
      } catch (error) {
        console.error('Error updating location:', error);
        onError('Failed to update location');
      }
    } catch (error) {
      console.error('Error in handlePopupSave:', error);
      onError('Failed to save location');
    }
  };

  // Helper function to find location index
  const findLocationIndex = (location) => {
    // Check in sample locations
    let index = sampleLocations.findIndex(loc => loc._id === location._id);
    if (index !== -1) return `sample-${index}`;

    // Check in pending locations
    index = pendingLocations.findIndex(loc => loc._id === location._id);
    if (index !== -1) return `pending-${index}`;

    // Check in reviewed locations
    index = reviewedLocations.findIndex(loc => loc._id === location._id);
    if (index !== -1) return `reviewed-${index}`;

    return null;
  };

  const handleMarkerClick = (location) => {
    const index = findLocationIndex(location);
    if (index) {
      setSelectedRow(index);
      setSelectedLocation(location);
      // Add timeout to ensure the row is rendered before scrolling
      setTimeout(() => {
        const element = document.getElementById(`row-${index}`);
        if (element) {
          const [group] = index.split('-');
          // Ensure the group is expanded
          setExpandedGroups(prev => ({
            ...prev,
            [group]: true
          }));
          // Wait a bit for expansion animation
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 100);
        }
      }, 0);
    }
  };

  const handleApproveLocations = async (selectedRows) => {
    try {
      // Extract IDs from the selectedRows (format: "pending-{id}")
      const locationIds = selectedRows.map(row => row.split('-')[1]);

      // Move each location from pending to reviewed
      for (const id of locationIds) {
        const response = await fetch(`http://localhost:5001/api/locations/pending_data/${id}/move/reviewed_data`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            approved_by: username,
            approved_datetime: new Date().toISOString()
          })
        });

        if (!response.ok) {
          throw new Error(`Failed to approve location: ${response.statusText}`);
        }

        const approvedLocation = await response.json();

        // Update state
        setPendingLocations(prev => prev.filter(loc => loc._id !== id));
        setReviewedLocations(prev => [...prev, approvedLocation]);
      }

      // Show notification for successful approval
      onLocationApproved(locationIds.length);
    } catch (error) {
      console.error('Error approving locations:', error);
      onError('Failed to approve locations');
    }
  };

  return {
    sampleLocations,
    setSampleLocations,
    pendingLocations,
    setPendingLocations,
    reviewedLocations,
    setReviewedLocations,
    selectedRow,
    setSelectedRow,
    isAddingLocation,
    setIsAddingLocation,
    editingPopup,
    setEditingPopup,
    editingData,
    setEditingData,
    handleDeleteLocations,
    handleApproveLocations,
    handlePopupEdit,
    handlePopupSave,
    handleMarkerClick,
    error,
    selectedLocation,
    setSelectedLocation,
    expandedGroups,
    setExpandedGroups,
    refreshLocations
  };
};