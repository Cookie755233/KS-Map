import React from 'react';
import { dialogStyles } from '../styles';

const LogoutConfirmDialog = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div onClick={onClose} style={dialogStyles.overlay}>
      <div onClick={e => e.stopPropagation()} style={dialogStyles.container}>
        <h3 style={dialogStyles.title}>登出確認</h3>
        <p style={dialogStyles.message}>確定要登出嗎？</p>
        <div style={dialogStyles.buttonContainer}>
          <button onClick={onClose} style={dialogStyles.cancelButton}>
            取消
          </button>
          <button onClick={onConfirm} style={dialogStyles.confirmButton}>
            登出
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmDialog; 