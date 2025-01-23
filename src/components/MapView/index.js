// Main component file
import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, ScaleControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Components
import AddLocationControl from './components/AddLocationControl';
import LocationMarker from './components/LocationMarker';
import NavBar from './components/NavBar';
import SearchableTable from './components/SearchableTable';
import AddLocationMarker from './components/AddLocationMarker';
import NotificationBanner from './components/NotificationBanner';

// Dialogs
import ImportDialog from './dialogs/ImportDialog';
import GuideDialog from './dialogs/GuideDialog';
import LoginDialog from './dialogs/LoginDialog';

// Hooks
import { useMapState } from './hooks/useMapState';
import { useImportState } from './hooks/useImportState';
import { useAuthState } from './hooks/useAuthState';

// Utils
import { handleCsvUpload, handleKmlUpload, handleKmzUpload } from './utils/fileHandlers';
import { setupLeafletIcons, handleLocationClick } from './utils/mapUtils';
import { createUploadNotification, createLocationActionNotification, createNewLocationNotification, createAuthNotification, createErrorNotification } from './utils/notificationUtils';

// Styles
import { mapContainerStyle, customStyles } from './styles';
import { COLORS } from './styles/colors';

// Create a context for the map instance
const MapContext = React.createContext(null);

// Custom hook to get map instance
const useMapInstance = () => {
  const map = useMap();
  const mapContext = React.useContext(MapContext);
  mapContext.current = map;
  return map;
};

// Component to set map instance
const MapInstanceComponent = () => {
  useMapInstance();
  return null;
};

setupLeafletIcons();

const MapView = () => {
  const fileInputRef = useRef(null);
  const mapRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [expandedGroups, setExpandedGroups] = React.useState({
    sample: false,
    pending: true,
    reviewed: true
  });
  const [groupVisibility, setGroupVisibility] = React.useState({
    sample: false,
    pending: true,
    reviewed: true
  });
  const [shouldScroll, setShouldScroll] = React.useState(false);
  const [notification, setNotification] = React.useState(null);

  // Add refs for markers
  const markerRefs = useRef({});

  // Function to register marker refs
  const registerMarker = (id, ref) => {
    if (ref) {
      markerRefs.current[id] = ref;
    } else {
      delete markerRefs.current[id];
    }
  };

  const {
    showLoginDialog,
    setShowLoginDialog,
    isLoggedIn,
    setIsLoggedIn,
    username,
    setUsername,
    handleLogoutClick,
    handleLogoutConfirm,
    handleLogoutCancel,
    showLogoutDialog,
    setIsAdmin,
    isAdmin
  } = useAuthState({
    onLoginSuccess: (username) => setNotification(createAuthNotification('login', username)),
    onLogoutSuccess: () => setNotification(createAuthNotification('logout'))
  });

  const {
    sampleLocations,
    setSampleLocations,
    pendingLocations,
    setPendingLocations,
    reviewedLocations,
    selectedRow,
    setSelectedRow,
    handleDeleteLocations,
    handleApproveLocations,
    handlePopupEdit,
    handlePopupSave,
    editingPopup,
    setEditingPopup,
    editingData,
    setEditingData,
    isAddingLocation,
    setIsAddingLocation,
    refreshLocations
  } = useMapState({
    username,
    onLocationDeleted: (count) => setNotification(createLocationActionNotification('delete', count)),
    onLocationApproved: (count) => setNotification(createLocationActionNotification('approve', count)),
    onLocationEdited: () => setNotification(createLocationActionNotification('edit')),
    onError: (message) => setNotification(createErrorNotification(message))
  });

  const {
    showImportDialog,
    setShowImportDialog,
    showGuide,
    setShowGuide,
    csvHeaders,
    setCsvHeaders,
    csvData,
    setCsvData,
    mappingConfig,
    setMappingConfig,
    handleImportConfirm
  } = useImportState({
    username,
    onImportSuccess: (count, skippedCount) => {
      setNotification(createUploadNotification(count, skippedCount));
      refreshLocations();
    }
  });

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileExtension = file.name.split('.').pop().toLowerCase();
    const reader = new FileReader();

    try {
      switch (fileExtension) {
        case 'csv':
          reader.onload = (e) => handleCsvUpload(
            e.target.result,
            setCsvHeaders,
            setCsvData,
            setMappingConfig,
            setShowImportDialog
          );
          reader.readAsText(file);
          break;
        case 'kml':
          reader.onload = async (e) => await handleKmlUpload(
            e.target.result,
            setCsvData,
            setCsvHeaders,
            setMappingConfig,
            setShowImportDialog
          );
          reader.readAsText(file);
          break;
        case 'kmz':
          await handleKmzUpload(
            file,
            handleKmlUpload,
            setCsvData,
            setCsvHeaders,
            setMappingConfig,
            setShowImportDialog
          );
          break;
        default:
          alert('Unsupported file format. Please upload a CSV, KML, or KMZ file.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  // Helper function to get collection index
  const getLocationIndex = (location) => {
    if (!location) return null;

    let collection;
    let index;

    // Find which collection the location belongs to
    if (sampleLocations.some(l => l._id === location._id)) {
      collection = 'sample';
      index = sampleLocations.findIndex(l => l._id === location._id);
    } else if (pendingLocations.some(l => l._id === location._id)) {
      collection = 'pending';
      index = pendingLocations.findIndex(l => l._id === location._id);
    } else if (reviewedLocations.some(l => l._id === location._id)) {
      collection = 'reviewed';
      index = reviewedLocations.findIndex(l => l._id === location._id);
    }

    return collection && index >= 0 ? `${collection}-${index}` : null;
  };

  return (
    <MapContext.Provider value={mapRef}>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <style>{customStyles}</style>

        <NotificationBanner
          notification={notification}
          onDismiss={() => setNotification(null)}
        />

        <NavBar
          fileInputRef={fileInputRef}
          handleFileUpload={handleFileUpload}
          setShowGuide={setShowGuide}
          isLoggedIn={isLoggedIn}
          username={username}
          handleLogoutClick={handleLogoutClick}
          handleLogoutConfirm={handleLogoutConfirm}
          handleLogoutCancel={handleLogoutCancel}
          showLogoutDialog={showLogoutDialog}
          setShowLoginDialog={setShowLoginDialog}
        />

        <div style={{
          flex: 1,
          display: 'flex',
          position: 'relative',
          padding: '15px',
          gap: '15px',
          backgroundColor: COLORS.UI.BACKGROUND.LIGHT
        }}>
          <div style={{
            width: '500px',
            backgroundColor: 'white',
            borderRadius: '4px',
            boxShadow: `0 1px 3px ${COLORS.UI.SHADOW.DARK}`,
            overflow: 'hidden'
          }}>
            <SearchableTable
              sampleLocations={sampleLocations}
              pendingLocations={pendingLocations}
              reviewedLocations={reviewedLocations}
              onLocationClick={(location, index) => {
                handleLocationClick(location, index, setSelectedLocation, setSelectedRow, mapRef.current, !isAddingLocation);
                setShouldScroll(true);
              }}
              selectedRow={selectedRow}
              onDeleteLocations={handleDeleteLocations}
              onApproveLocations={handleApproveLocations}
              isLoggedIn={isLoggedIn}
              isAdmin={isAdmin}
              expandedGroups={expandedGroups}
              setExpandedGroups={setExpandedGroups}
              groupVisibility={groupVisibility}
              setGroupVisibility={setGroupVisibility}
              shouldScroll={shouldScroll}
              setShouldScroll={setShouldScroll}
            />
          </div>

          <div style={{
            flex: 1,
            backgroundColor: 'white',
            borderRadius: '4px',
            boxShadow: `0 1px 3px ${COLORS.UI.SHADOW.DARK}`,
            overflow: 'hidden',
            border: `1px solid ${COLORS.UI.BORDER.DEFAULT}`
          }}>
            <MapContainer
              center={[22.6656, 120.3096]}
              zoom={13}
              style={{ width: '100%', height: '100%' }}
            >
              <MapInstanceComponent />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <ScaleControl position="bottomleft" />
              <AddLocationControl
                isAddingLocation={isAddingLocation}
                setIsAddingLocation={setIsAddingLocation}
                isLoggedIn={isLoggedIn}
              />
              <AddLocationMarker
                isAddingLocation={isAddingLocation}
                setIsAddingLocation={setIsAddingLocation}
                setPendingLocations={setPendingLocations}
                isLoggedIn={isLoggedIn}
                username={username}
                setNotification={setNotification}
                onLocationAdded={(location) => {
                  const markerId = `pending-${location._id}`;
                  console.log('New location added:', location, 'with markerId:', markerId);
                  handleLocationClick(location, markerId, setSelectedLocation, setSelectedRow, mapRef.current, false);
                  setShouldScroll(true);
                }}
              />
              {groupVisibility.pending && pendingLocations.map((location) => {
                const markerId = `pending-${location._id}`;
                return (
                  <LocationMarker
                    key={markerId}
                    ref={(ref) => registerMarker(markerId, ref)}
                    location={location}
                    index={markerId}
                    editingPopup={editingPopup}
                    editingData={editingData}
                    setEditingData={setEditingData}
                    handlePopupEdit={handlePopupEdit}
                    handlePopupSave={handlePopupSave}
                    handleMarkerClick={(location, index) => {
                      handleLocationClick(location, index, setSelectedLocation, setSelectedRow, mapRef.current, !isAddingLocation);
                      setShouldScroll(true);
                    }}
                    setShouldScroll={setShouldScroll}
                    selectedRow={selectedRow}
                    isLoggedIn={isLoggedIn}
                    isAdmin={isAdmin}
                    onDeleteLocations={handleDeleteLocations}
                    onApproveLocations={handleApproveLocations}
                  />
                );
              })}
              {groupVisibility.sample && sampleLocations.map((location) => {
                const markerId = `sample-${location._id}`;
                return (
                  <LocationMarker
                    key={markerId}
                    ref={(ref) => registerMarker(markerId, ref)}
                    location={location}
                    index={markerId}
                    editingPopup={editingPopup}
                    editingData={editingData}
                    setEditingData={setEditingData}
                    handlePopupEdit={handlePopupEdit}
                    handlePopupSave={handlePopupSave}
                    handleMarkerClick={(location, index) => {
                      handleLocationClick(location, index, setSelectedLocation, setSelectedRow, mapRef.current, !isAddingLocation);
                      setShouldScroll(true);
                    }}
                    setShouldScroll={setShouldScroll}
                    selectedRow={selectedRow}
                    isLoggedIn={isLoggedIn}
                    onDeleteLocations={handleDeleteLocations}
                  />
                );
              })}
              {groupVisibility.reviewed && reviewedLocations.map((location) => {
                const markerId = `reviewed-${location._id}`;
                return (
                  <LocationMarker
                    key={markerId}
                    ref={(ref) => registerMarker(markerId, ref)}
                    location={location}
                    index={markerId}
                    editingPopup={editingPopup}
                    editingData={editingData}
                    setEditingData={setEditingData}
                    handlePopupEdit={handlePopupEdit}
                    handlePopupSave={handlePopupSave}
                    handleMarkerClick={(location, index) => {
                      handleLocationClick(location, index, setSelectedLocation, setSelectedRow, mapRef.current, !isAddingLocation);
                      setShouldScroll(true);
                    }}
                    setShouldScroll={setShouldScroll}
                    selectedRow={selectedRow}
                    isLoggedIn={isLoggedIn}
                    isAdmin={isAdmin}
                    onDeleteLocations={handleDeleteLocations}
                  />
                );
              })}
              {selectedLocation && (() => {
                const MapEffect = () => {
                  const map = useMap();
                  useEffect(() => {
                    // Don't trigger handleLocationClick if we're in adding mode
                    if (map && !isAddingLocation) {
                      handleLocationClick(selectedLocation, selectedRow, setSelectedLocation, setSelectedRow, map, false);
                    }
                  }, [map]);
                  return null;
                };
                return <MapEffect />;
              })()}
            </MapContainer>
          </div>
        </div>

        <ImportDialog
          show={showImportDialog}
          onClose={() => setShowImportDialog(false)}
          onConfirm={handleImportConfirm}
          mappingConfig={mappingConfig}
          setMappingConfig={setMappingConfig}
          csvData={csvData}
          csvHeaders={csvHeaders}
        />

        <GuideDialog
          show={showGuide}
          onClose={() => setShowGuide(false)}
        />

        <LoginDialog
          show={showLoginDialog}
          onClose={() => setShowLoginDialog(false)}
          setIsLoggedIn={setIsLoggedIn}
          setUsername={setUsername}
          setIsAdmin={setIsAdmin}
        />
      </div>
    </MapContext.Provider>
  );
};

export default MapView; 