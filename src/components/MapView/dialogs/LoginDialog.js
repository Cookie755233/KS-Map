import React, { useState } from 'react';
import { login } from '../../../services/auth';
import { loginDialogStyles } from '../styles';

const LoginDialog = ({ show, onClose, setIsLoggedIn, setUsername, setIsAdmin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await login(formData.username, formData.password);
      console.log('Login response:', data);
      console.log('is admin?:', data.role === 'admin');
      setIsLoggedIn(true);
      setUsername(data.username);
      setIsAdmin(data.role === 'admin');
      onClose();
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || '登入失敗');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div onClick={onClose} style={loginDialogStyles.overlay}>
      <div onClick={e => e.stopPropagation()} style={loginDialogStyles.container}>
        <h2 style={loginDialogStyles.title}>登入</h2>

        {error && (
          <div style={loginDialogStyles.error}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={loginDialogStyles.form}>
          <div style={loginDialogStyles.formGroup}>
            <label style={loginDialogStyles.label}>
              帳號:
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              disabled={isLoading}
              style={loginDialogStyles.input}
            />
          </div>

          <div style={loginDialogStyles.formGroup}>
            <label style={loginDialogStyles.label}>
              密碼:
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              disabled={isLoading}
              style={loginDialogStyles.input}
            />
          </div>

          <div style={loginDialogStyles.buttonContainer}>
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              style={{
                ...loginDialogStyles.cancelButton,
                ...(isLoading && { cursor: 'not-allowed' })
              }}
            >
              取消
            </button>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                ...loginDialogStyles.submitButton,
                ...(isLoading && loginDialogStyles.submitButtonDisabled)
              }}
            >
              {isLoading ? '登入中...' : '登入'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginDialog; 