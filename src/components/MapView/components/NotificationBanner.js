import React, { useEffect } from 'react';
import { notificationStyles } from '../utils/notificationUtils';

const NotificationBanner = ({ notification, onDismiss }) => {
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, onDismiss]);

  if (!notification) return null;

  return (
    <div
      style={{
        ...notificationStyles.banner,
        ...notificationStyles[notification.type]
      }}
    >
      {notification.message}
    </div>
  );
};

export default NotificationBanner; 