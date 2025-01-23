import React, { useRef, useMemo, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import MapPopup from './MapPopup';
import { COLORS } from '../styles/colors';

const LocationMarker = forwardRef(({
  location,
  index,
  editingPopup,
  editingData,
  setEditingData,
  handlePopupEdit,
  handlePopupSave,
  handleMarkerClick,
  setShouldScroll,
  selectedRow,
  isLoggedIn,
  isAdmin,
  onDeleteLocations,
  onApproveLocations
}, ref) => {
  const markerRef = useRef(null);

  // Create custom icon based on marker type
  const getMarkerIcon = () => {
    let color;
    if (index.startsWith('sample')) {
      color = COLORS.MARKERS.SAMPLE;
    } else if (index.startsWith('pending')) {
      color = COLORS.MARKERS.PENDING;
    } else if (index.startsWith('reviewed')) {
      color = COLORS.MARKERS.REVIEWED;
    }

    return L.divIcon({
      className: 'custom-marker',
      html: `<svg width="24" height="36" viewBox="0 0 24 36">
        <path d="M12 0C5.383 0 0 5.383 0 12c0 9 12 24 12 24s12-15 12-24c0-6.617-5.383-12-12-12z"
          fill="${color}"
          stroke="white"
          stroke-width="2"
        />
      </svg>`,
      iconSize: [24, 36],
      iconAnchor: [12, 36],
      popupAnchor: [0, -36]
    });
  };

  // Expose the openPopup function through a ref
  useImperativeHandle(ref, () => ({
    openPopup: () => {
      if (markerRef.current) {
        markerRef.current.openPopup();
      }
    },
    closePopup: () => {
      if (markerRef.current) {
        markerRef.current.closePopup();
      }
    }
  }));

  // Effect to handle popup when selected
  useEffect(() => {
    if (selectedRow === index && markerRef.current) {
      // Listen for map movement completion
      const handleMapMove = (e) => {
        if (e.detail.location._id === location._id) {
          setTimeout(() => {
            if (markerRef.current) {
              markerRef.current.openPopup();
            }
          }, 100);
        }
      };

      window.addEventListener('mapMoveComplete', handleMapMove);
      return () => {
        window.removeEventListener('mapMoveComplete', handleMapMove);
      };
    }
  }, [selectedRow, index, location]);

  const eventHandlers = useMemo(() => ({
    click: () => {
      handleMarkerClick(location, index);
      setShouldScroll(true);
    },
  }), [location, index, handleMarkerClick, setShouldScroll]);

  return (
    <Marker
      position={[location.latitude, location.longitude]}
      ref={markerRef}
      eventHandlers={eventHandlers}
      icon={getMarkerIcon()}
    >
      {selectedRow === index && (
        <MapPopup
          location={location}
          index={index}
          editingPopup={editingPopup}
          editingData={editingData}
          setEditingData={setEditingData}
          handlePopupEdit={handlePopupEdit}
          handlePopupSave={handlePopupSave}
          coordinates={[location.latitude, location.longitude]}
          isLoggedIn={isLoggedIn}
          isAdmin={isAdmin}
          onDeleteLocations={onDeleteLocations}
          onApproveLocations={onApproveLocations}
        />
      )}
    </Marker>
  );
});

export default LocationMarker;
