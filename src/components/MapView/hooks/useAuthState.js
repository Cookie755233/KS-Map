import { useState } from 'react';

export const useAuthState = () => {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    setIsLoggedIn(false);
    setUsername('');
    setIsAdmin(false);
    setShowLogoutDialog(false);
  };

  const handleLogoutCancel = () => {
    setShowLogoutDialog(false);
  };

  return {
    showLoginDialog,
    setShowLoginDialog,
    showLogoutDialog,
    setShowLogoutDialog,
    handleLogoutClick,
    handleLogoutConfirm,
    handleLogoutCancel,
    isLoggedIn,
    setIsLoggedIn,
    username,
    setUsername,
    isAdmin,
    setIsAdmin
  };
}; 