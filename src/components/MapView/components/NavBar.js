import React from 'react';
import {
  navbarStyle, navLeftStyle, titleStyle,
  uploadContainerStyle, uploadButtonStyle, helpButtonStyle, LoginMessageStyle
} from '../styles';
import LogoutConfirmDialog from '../dialogs/LogoutConfirmDialog';
import { COLORS } from '../styles/colors';

const NavBar = ({
  fileInputRef,
  handleFileUpload,
  setShowGuide,
  isLoggedIn,
  username,
  handleLogoutClick,
  handleLogoutConfirm,
  handleLogoutCancel,
  showLogoutDialog,
  setShowLoginDialog
}) => {
  return (
    <>
      <div style={navbarStyle}>
        <div style={navLeftStyle}>
          <h1 style={titleStyle}>Kaohsiung House Mapping</h1>
          <div style={uploadContainerStyle}>
            {isLoggedIn ? (
              <>
                <label style={uploadButtonStyle}>
                  Upload File
                  <input
                    type="file"
                    accept=".csv,.kml,.kmz"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                  />
                </label>
                <button
                  onClick={() => setShowGuide(true)}
                  style={helpButtonStyle}
                  title="CSV Import Guide"
                >
                  ?
                </button>
              </>
            ) : (
              <div
                style={{
                  ...LoginMessageStyle,
                  cursor: 'not-allowed',
                  backgroundColor: COLORS.UI.BACKGROUND.LIGHT_GRAY,
                  color: COLORS.UI.TEXT.SECONDARY,
                }}
              >
                Must Login to Upload Files
              </div>
            )}
          </div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src="/icons/login.svg"
                alt="User"
                style={{
                  width: '24px',
                  height: '24px',
                  filter: 'invert(0.4)'  // Makes the icon gray to match the username color
                }}
              />
              <span style={{ color: COLORS.UI.TEXT.SECONDARY }}>{username}</span>
              <button
                onClick={handleLogoutClick}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'white',
                  border: `1px solid ${COLORS.UI.BORDER.DEFAULT}`,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: COLORS.UI.TEXT.PRIMARY
                }}
              >
                登出
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLoginDialog(true)}
              style={{
                padding: '8px 16px',
                backgroundColor: 'white',
                border: `1px solid ${COLORS.UI.BORDER.DEFAULT}`,
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '14px',
                color: COLORS.UI.TEXT.PRIMARY,
                transition: 'all 0.2s'
              }}
            >
              登入
            </button>
          )}
        </div>
      </div>

      <LogoutConfirmDialog
        show={showLogoutDialog}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};

export default NavBar;
