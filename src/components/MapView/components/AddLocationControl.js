import React from 'react';
import { useMap } from 'react-leaflet';
import { COLORS } from '../styles/colors';

const AddLocationControl = ({ isAddingLocation, setIsAddingLocation, isLoggedIn }) => {
  const map = useMap();

  // Update cursor style based on isAddingLocation state
  React.useEffect(() => {
    const container = map.getContainer();
    if (isAddingLocation) {
      container.style.cursor = 'crosshair';
    } else {
      container.style.cursor = '';
    }
  }, [isAddingLocation, map]);

  // Add event listener to capture phase
  React.useEffect(() => {
    const button = document.querySelector('.add-location-button');
    if (button) {
      const handleCaptureClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        if (isLoggedIn) {
          if (isAddingLocation) {
            console.log('AddLocationControl: Clicked Cancel button');
            setIsAddingLocation(false);
          } else {
            console.log('AddLocationControl: Clicked Add Location button');
            setIsAddingLocation(true);
          }
          console.log('AddLocationControl: Setting isAddingLocation to:', !isAddingLocation);
        }
      };

      button.addEventListener('click', handleCaptureClick, true);
      return () => button.removeEventListener('click', handleCaptureClick, true);
    }
  }, [isAddingLocation, isLoggedIn, setIsAddingLocation]);

  return (
    <div
      className="leaflet-top leaflet-right"
      style={{ pointerEvents: 'none' }}
    >
      <div
        className="leaflet-control leaflet-bar"
        style={{ pointerEvents: 'auto' }}
      >
        <button
          className="add-location-button"
          style={{
            padding: '8px 12px',
            backgroundColor: isAddingLocation ? COLORS.UI.BACKGROUND.PRIMARY_LIGHT : COLORS.UI.BACKGROUND.WHITE,
            border: `1px solid ${isAddingLocation ? COLORS.UI.BORDER.LIGHT : COLORS.UI.BORDER.LIGHT}`,
            borderRadius: '4px',
            cursor: isLoggedIn ? 'pointer' : 'not-allowed',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: `0 2px 4px ${COLORS.UI.SHADOW.DEFAULT}`,
            color: isLoggedIn ? COLORS.UI.INHERIT : COLORS.UI.DISABLED
          }}
          title={isLoggedIn ? 'Add Location' : 'Please login to add locations'}
        >
          {isAddingLocation ? 'Cancel' : 'Add Location'}
        </button>
      </div>
    </div>
  );
};

export default AddLocationControl;
