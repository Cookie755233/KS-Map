
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
};

export const notificationStyles = {
  banner: {
    position: 'fixed',
    top: '70px', // Below navbar
    right: '20px',
    padding: '12px 20px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    zIndex: 99999, // Increased z-index to be above everything, including map controls
    maxWidth: '400px',
    animation: 'fadeInOut 3s ease-in-out',
    fontSize: '14px',
    fontWeight: 500,
  },
  [NOTIFICATION_TYPES.SUCCESS]: {
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
    border: '1px solid #A5D6A7'
  },
  [NOTIFICATION_TYPES.WARNING]: {
    backgroundColor: '#FFF3E0',
    color: '#E65100',
    border: '1px solid #FFCC80'
  },
  [NOTIFICATION_TYPES.ERROR]: {
    backgroundColor: '#FFEBEE',
    color: '#C62828',
    border: '1px solid #FFCDD2'
  }
};

// Add CSS animation for fade in/out
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(-20px); }
    10% { opacity: 1; transform: translateY(0); }
    90% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-20px); }
  }
`;
document.head.appendChild(style);

export const createNotification = (type, message) => {
  return {
    type,
    message,
    id: Date.now() // Add unique id for managing multiple notifications
  };
};

// Helper functions for common notifications
export const createSuccessNotification = (message) => createNotification(NOTIFICATION_TYPES.SUCCESS, message);
export const createWarningNotification = (message) => createNotification(NOTIFICATION_TYPES.WARNING, message);
export const createErrorNotification = (message) => createNotification(NOTIFICATION_TYPES.ERROR, message);

// Specific notification creators
export const createUploadNotification = (count, skippedCount = 0) => {
  const message = skippedCount > 0
    ? `Successfully uploaded ${count} locations (${skippedCount} duplicates skipped)`
    : `Successfully uploaded ${count} locations`;
  return createSuccessNotification(message);
};

export const createLocationActionNotification = (action, count = 1) => {
  const actionText = {
    approve: 'approved',
    edit: 'updated',
    delete: 'deleted'
  }[action];

  return createSuccessNotification(
    `Successfully ${actionText} ${count} ${count === 1 ? 'location' : 'locations'}`
  );
};

export const createNewLocationNotification = (location) => {
  return createSuccessNotification(
    `Created new location at (${location.longitude.toFixed(4)}, ${location.latitude.toFixed(4)})${location.parcel ? ` Name: ${location.parcel}` : ''}`
  );
};

export const createAuthNotification = (action, username) => {
  const message = action === 'login'
    ? `Welcome back, ${username}!`
    : 'Successfully logged out';
  return createSuccessNotification(message);
}; 