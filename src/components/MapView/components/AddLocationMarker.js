import React, { useState, useRef, useEffect } from 'react';
import { useMapEvents, Marker } from 'react-leaflet';
import LocationFormDialog from '../dialogs/LocationFormDialog';
import { createLocation } from '../../../services/api';
import { createNewLocationNotification, createErrorNotification } from '../utils/notificationUtils';

const AddLocationMarker = ({
  isAddingLocation,
  setIsAddingLocation,
  setPendingLocations,
  isLoggedIn,
  username,
  onLocationAdded,
  setNotification
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [position, setPosition] = useState(null);
  const isAddingRef = useRef(isAddingLocation);
  const map = useMapEvents({
    click(e) {
      // Use ref for immediate state check
      if (!isLoggedIn || !isAddingRef.current || showDialog) {
        return;
      }

      setPosition(e.latlng);
      setShowDialog(true);
    }
  });

  // Disable map interactions when dialog is open
  useEffect(() => {
    if (showDialog) {
      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
      map.boxZoom.disable();
      map.keyboard.disable();
    } else {
      map.dragging.enable();
      map.touchZoom.enable();
      map.doubleClickZoom.enable();
      map.scrollWheelZoom.enable();
      map.boxZoom.enable();
      map.keyboard.enable();
    }
  }, [showDialog, map]);

  // Keep ref in sync with prop
  useEffect(() => {
    isAddingRef.current = isAddingLocation;
  }, [isAddingLocation]);

  const handleFormSubmit = async (formData) => {
    try {
      const locationData = {
        ...formData,
        latitude: position.lat,
        longitude: position.lng,
        uploaded_by: username
      };

      const response = await createLocation(locationData, 'pending_data');
      setPendingLocations(prev => [...prev, response]);
      setShowDialog(false);
      setIsAddingLocation(false);
      setPosition(null);

      // Show notification for new location
      setNotification(createNewLocationNotification(response));

      // Trigger the callback with the new location
      if (onLocationAdded) {
        onLocationAdded(response);
      }
    } catch (error) {
      console.error('Error creating location:', error);
      setNotification(createErrorNotification('Failed to create location'));
    }
  };

  const handleClose = () => {
    setShowDialog(false);
    setPosition(null);
    setIsAddingLocation(false);
  };

  return (
    <>
      {position && (
        <Marker position={position} />
      )}
      <LocationFormDialog
        show={showDialog}
        onClose={handleClose}
        onSubmit={handleFormSubmit}
        coordinates={{ latitude: position?.lat, longitude: position?.lng }}
      />
    </>
  );
};

export default AddLocationMarker; 