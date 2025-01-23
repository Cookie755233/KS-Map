import React from 'react';
import { dialogStyles } from '../styles';

const DeleteConfirmDialog = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div onClick={onClose} style={dialogStyles.overlay}>
      <div onClick={e => e.stopPropagation()} style={dialogStyles.container}>
        <h3 style={dialogStyles.title}>確認刪除</h3>
        <p style={dialogStyles.message}>
          您確定要刪除此位置嗎？此操作無法復原。
        </p>
        <div style={dialogStyles.buttonContainer}>
          <button onClick={onClose} style={dialogStyles.cancelButton}>
            取消
          </button>
          <button onClick={onConfirm} style={dialogStyles.confirmButton}>
            確認刪除
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmDialog; 