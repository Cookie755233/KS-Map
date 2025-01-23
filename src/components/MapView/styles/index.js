import { COLORS } from './colors';

export const navbarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: COLORS.UI.BACKGROUND.WHITE,
  borderBottom: `1px solid ${COLORS.UI.BORDER.DEFAULT}`,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

export const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
};

export const modalStyle = {
  backgroundColor: 'white',
  padding: '24px',
  borderRadius: '8px',
  width: '1200px',
  maxWidth: '95%',
  maxHeight: '90vh',
  overflowY: 'auto'
};

export const modalContentStyle = {
  display: 'flex',
  gap: '24px',
  height: '600px'  // Fixed height for the content area
};

export const configSectionStyle = {
  width: '400px',
  flexShrink: 0,
  padding: '20px',
  backgroundColor: COLORS.UI.BACKGROUND.LIGHTER,
  borderRadius: '8px',
  border: `1px solid ${COLORS.UI.BORDER.DEFAULT}`
};

export const previewSectionStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: COLORS.UI.BACKGROUND.WHITE,
  borderRadius: '8px',
  border: `1px solid ${COLORS.UI.BORDER.DEFAULT}`,
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  overflow: 'hidden' // Important for containing the scroll
};

export const tableContainerStyle = {
  flex: 1,
  marginTop: '10px',
  overflowX: 'auto',
  overflowY: 'auto',
  border: `1px solid ${COLORS.UI.BORDER.DEFAULT}`,
  borderRadius: '4px'
};

export const modalButtonsStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '12px',
  marginTop: '24px',
  paddingTop: '16px',
  borderTop: `1px solid ${COLORS.UI.BORDER.LIGHT}`
};

export const selectStyle = {
  width: '100%',
  padding: '8px',
  borderRadius: '4px',
  border: `1px solid ${COLORS.UI.BORDER.DEFAULT}`,
  marginTop: '4px'
};

export const formGroupStyle = {
  marginBottom: '16px'
};

export const buttonStyle = {
  padding: '8px 16px',
  borderRadius: '4px',
  border: `1px solid ${COLORS.UI.BORDER.DEFAULT}`,
  backgroundColor: COLORS.UI.BACKGROUND.WHITE,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: COLORS.UI.BACKGROUND.LIGHTER
  }
};

export const navLeftStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px'
};

export const navRightStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px'
};

export const titleStyle = {
  margin: 0,
  fontSize: '24px',
  color: COLORS.UI.TEXT.PRIMARY
};

export const uploadContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
};

export const uploadButtonStyle = {
  padding: '8px 16px',
  backgroundColor: COLORS.UI.BACKGROUND.WHITE,
  border: `1px solid ${COLORS.UI.BORDER.DEFAULT}`,
  borderRadius: '4px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '14px',
  color: COLORS.UI.TEXT.PRIMARY,
  transition: 'all 0.2s'
};

export const helpButtonStyle = {
  width: '28px',
  height: '28px',
  borderRadius: '50%',
  border: `1px solid ${COLORS.UI.BORDER.DEFAULT}`,
  backgroundColor: COLORS.UI.BACKGROUND.WHITE,
  color: COLORS.UI.TEXT.SECONDARY,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: '14px'
};

export const LoginMessageStyle = {
  width: '210px',
  height: '28px',
  borderRadius: '8px', // Changed from 50% to 8px for a rounded rectangle
  border: `1px solid ${COLORS.UI.BORDER.DEFAULT}`,
  backgroundColor: COLORS.UI.BACKGROUND.WHITE,
  color: COLORS.UI.TEXT.SECONDARY,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: '14px'
};

// Map styles
export const mapContainerStyle = {
  width: '75%',
  border: `1px solid ${COLORS.UI.BORDER.DEFAULT}`,
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  height: '100%'
};

// Notification styles
export const notificationStyles = {
  banner: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '12px 20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    zIndex: 1002,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    maxWidth: '400px',
    animation: 'slideIn 0.3s ease-out'
  },
  success: {
    backgroundColor: COLORS.STATUS.SUCCESS,
    color: 'white',
    border: `1px solid ${COLORS.STATUS.SUCCESS}`
  },
  warning: {
    backgroundColor: COLORS.STATUS.WARNING,
    color: COLORS.UI.TEXT.BLACK,
    border: `1px solid ${COLORS.STATUS.WARNING}`
  }
};

// Custom Leaflet styles
export const customStyles = `
  html {
    zoom: 80%;
  }
  .leaflet-control-container .leaflet-top {
    z-index: 999 !important;
  }
  .leaflet-control-container .leaflet-bottom {
    z-index: 999 !important;
  }
  .leaflet-control-zoom {
    z-index: 999 !important;
  }
  .custom-marker {
    background: none;
    border: none;
  }
  .custom-marker svg {
    filter: drop-shadow(0 2px 2px rgba(0,0,0,0.3));
  }
`;

// Table Styles
export const tableStyles = {
  header: {
    padding: '12px 8px',
    textAlign: 'left',
    borderBottom: `1px solid ${COLORS.UI.BORDER.DEFAULT}`,
    position: 'sticky',
    top: 0,
    whiteSpace: 'nowrap',
    fontWeight: 'normal',
    color: COLORS.UI.TEXT.SECONDARY,
    maxWidth: '300px',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  cell: {
    padding: '8px',
    borderBottom: `1px solid ${COLORS.UI.BORDER.DEFAULT}`,
    whiteSpace: 'nowrap',
    maxWidth: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  row: {
    transition: 'all 0.2s ease'
  },
  container: {
    height: 'calc(115vh - 25px)',
    width: '470px',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${COLORS.UI.BORDER.DEFAULT}`,
    borderRadius: '8px',
    backgroundColor: COLORS.UI.BACKGROUND.WHITE,
    boxShadow: `0 2px 4px ${COLORS.UI.SHADOW.DEFAULT}`,
    overflow: 'hidden',
  },
  searchContainer: {
    marginBottom: '15px',
    flexShrink: 0
  },
  searchInputsWrapper: {
    display: 'flex',
    gap: '8px',
    marginBottom: '8px'
  },
  searchSelect: {
    padding: '8px',
    border: `1px solid ${COLORS.UI.BORDER.DEFAULT}`,
    borderRadius: '4px',
    width: '120px'
  },
  searchInput: {
    flex: 1,
    padding: '8px',
    border: `1px solid ${COLORS.UI.BORDER.DEFAULT}`,
    borderRadius: '4px'
  },
  contentContainer: {
    flex: 1,
    minHeight: 0,
    overflow: 'auto'
  },
  groupContainer: {
    marginBottom: '20px'
  },
  groupHeader: {
    padding: '10px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 2,
    borderBottom: `1px solid ${COLORS.UI.BORDER.DEFAULT}`,
    fontWeight: 'bold',
    borderRadius: '8px'
  },
  tableWrapper: {
    marginTop: '10px',
    maxWidth: '100%',
    overflowX: 'auto',
    border: `1px solid ${COLORS.UI.BORDER.LIGHT}`,
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    maxHeight: '370px',
    overflowY: 'auto'
  },
  groupContent: {
    transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out',
    opacity: 1,
    maxHeight: '1000px',
    overflow: 'hidden'
  },
  groupContentHidden: {
    opacity: 0,
    maxHeight: '0px',
    overflow: 'hidden'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  deleteButton: (disabled) => ({
    padding: '4px 8px',
    backgroundColor: disabled ? COLORS.UI.BORDER.DEFAULT : COLORS.UI.DANGER,
    color: COLORS.UI.TEXT.WHITE,
    border: 'none',
    borderRadius: '4px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: '12px'
  }),
  checkboxCell: {
    width: '40px',
    backgroundColor: COLORS.UI.BACKGROUND.WHITE,
  }
};

// MapPopup Styles
export const mapPopupStyles = {
  container: {
    minWidth: '400px',
    padding: '10px',
    position: 'relative'
  },
  closeButton: {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    width: '30px',
    height: '30px',
    backgroundColor: COLORS.UI.BACKGROUND.WHITE,
    border: `1px solid ${COLORS.UI.BORDER.DEFAULT}`,
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    color: COLORS.UI.TEXT.SECONDARY,
    boxShadow: `0 2px 4px ${COLORS.UI.SHADOW.DARK}`,
    zIndex: 1000
  },
  title: {
    margin: '0 0 15px 0',
    borderBottom: '2px solid #eee',
    paddingBottom: '10px',
    fontSize: '18px',
    whiteSpace: 'normal',
    overflow: 'break-all'
  },
  titleInput: {
    width: '100%',
    padding: '4px 8px',
    fontSize: '18px',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  coordinates: {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    color: COLORS.UI.TEXT.SECONDARY,
    fontSize: '12px',
    backgroundColor: COLORS.UI.BACKGROUND.LIGHT,
    padding: '4px 8px',
    borderRadius: '4px',
    zIndex: 1
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
    tableLayout: 'fixed'
  },
  tableCell: {
    padding: '5px 0',
    color: COLORS.UI.TEXT.SECONDARY
  },
  input: {
    width: '100%',
    padding: '4px',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  buttonContainer: {
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px'
  },
  buttonGroup: {
    display: 'flex',
    gap: '8px'
  },
  cancelButton: {
    padding: '6px 12px',
    backgroundColor: COLORS.UI.BACKGROUND.WHITE,
    color: COLORS.UI.TEXT.PRIMARY,
    border: `1px solid ${COLORS.UI.BORDER.DEFAULT}`,
    borderRadius: '4px',
    cursor: 'pointer'
  },
  saveButton: {
    padding: '6px 12px',
    backgroundColor: COLORS.MARKERS.REVIEWED,
    color: COLORS.UI.TEXT.WHITE,
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  approveButton: {
    padding: '6px 12px',
    backgroundColor: COLORS.MARKERS.REVIEWED,
    color: COLORS.UI.TEXT.WHITE,
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  editButton: {
    padding: '6px 12px',
    color: COLORS.UI.TEXT.WHITE,
    border: 'none',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)'
    }
  },
  deleteButton: {
    padding: '6px 12px',
    color: COLORS.UI.TEXT.WHITE,
    border: 'none',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)'
    }
  },
  approveButton: {
    padding: '6px 12px',
    backgroundColor: COLORS.MARKERS.REVIEWED,
    color: COLORS.UI.TEXT.WHITE,
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      backgroundColor: '#43a047',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)'
    }
  }
};

// Dialog Styles
export const dialogStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.UI.SHADOW.OVERLAY,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  container: {
    backgroundColor: COLORS.UI.BACKGROUND.WHITE,
    borderRadius: '8px',
    padding: '20px',
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  title: {
    margin: 0,
    color: COLORS.UI.TEXT.PRIMARY
  },
  message: {
    margin: 0,
    color: COLORS.UI.TEXT.SECONDARY
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    paddingTop: '10px',
    borderTop: `1px solid ${COLORS.UI.BORDER.LIGHT}`
  },
  cancelButton: {
    padding: '8px 16px',
    backgroundColor: COLORS.UI.BACKGROUND.WHITE,
    border: `1px solid ${COLORS.UI.BORDER.DEFAULT}`,
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  confirmButton: {
    padding: '8px 16px',
    backgroundColor: COLORS.UI.DANGER,
    color: COLORS.UI.TEXT.WHITE,
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  closeButton: {
    padding: '8px 16px',
    backgroundColor: COLORS.UI.BACKGROUND.WHITE,
    border: `1px solid ${COLORS.UI.BORDER.DEFAULT}`,
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

// Guide Dialog Styles
export const guideDialogStyles = {
  ...dialogStyles,
  container: {
    ...dialogStyles.container,
    width: '600px',
    maxHeight: '90vh'
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    fontSize: '14px',
    lineHeight: 1.6
  },
  section: {
    margin: '16px 0'
  },
  sectionTitle: {
    margin: '0 0 8px 0',
    color: COLORS.UI.TEXT.PRIMARY,
    fontSize: '16px'
  },
  list: {
    margin: '8px 0',
    paddingLeft: '20px'
  },
  listItem: {
    margin: '4px 0'
  }
};

// Login Dialog Styles
export const loginDialogStyles = {
  ...dialogStyles,
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  formGroup: {
    padding: '0 15px 0 0'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: COLORS.UI.TEXT.SECONDARY
  },
  input: {
    width: '100%',
    padding: '8px',
    border: `1px solid ${COLORS.UI.BORDER.DEFAULT}`,
    borderRadius: '4px',
    fontSize: '14px'
  },
  error: {
    padding: '10px',
    backgroundColor: COLORS.UI.BACKGROUND.ERROR_LIGHT,
    color: COLORS.UI.TEXT.ERROR,
    borderRadius: '4px'
  },
  submitButton: {
    padding: '8px 16px',
    backgroundColor: COLORS.UI.PRIMARY,
    color: COLORS.UI.TEXT.WHITE,
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  submitButtonDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed'
  }
};

// Import Dialog Styles
export const importDialogStyles = {
  ...dialogStyles,
  container: {
    ...dialogStyles.container,
    width: '90%',
    maxWidth: '1200px'
  },
  title: {
    margin: '0 0 20px 0',
    color: COLORS.UI.TEXT.PRIMARY
  },
  infoBanner: {
    backgroundColor: COLORS.UI.BACKGROUND.PRIMARY_LIGHT,
    padding: '10px 15px',
    borderRadius: '4px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '400px 1fr',
    gap: '20px',
    height: 'calc(100vh - 350px)',
    position: 'relative'
  },
  leftSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxHeight: '100%',
    overflow: 'hidden',
    backgroundColor: COLORS.UI.BACKGROUND.LIGHT_GRAY,
    padding: '15px',
    borderRadius: '8px'
  },
  headerCheckbox: {
    padding: '10px',
    backgroundColor: 'white',
    borderRadius: '4px',
    marginBottom: '5px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer'
  },
  columnList: {
    flex: 1,
    overflowY: 'auto',
    paddingRight: '10px'
  },
  columnItem: (color) => ({
    padding: '10px',
    backgroundColor: 'white',
    borderRadius: '4px',
    marginBottom: '10px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    borderLeft: `4px solid ${color}`
  }),
  columnLabel: {
    display: 'block',
    marginBottom: '5px',
    color: COLORS.UI.TEXT.SECONDARY
  },
  requiredMark: {
    color: COLORS.UI.TEXT.ERROR,
    marginLeft: '4px'
  },
  columnSelect: (required, hasValue) => ({
    width: '100%',
    padding: '8px',
    border: `1px solid ${required && !hasValue ? COLORS.UI.TEXT.ERROR : COLORS.UI.BORDER.DEFAULT}`,
    borderRadius: '4px',
    backgroundColor: 'white'
  }),
  errorMessage: {
    color: COLORS.UI.TEXT.ERROR,
    fontSize: '12px',
    marginTop: '4px'
  },
  divider: {
    position: 'absolute',
    left: '400px',
    top: 0,
    bottom: 0,
    width: '1px',
    backgroundColor: COLORS.UI.BORDER.DEFAULT,
    margin: '0 10px'
  },
  rightSection: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
    paddingLeft: '20px'
  },
  previewTitle: {
    margin: '0 0 10px 0',
    color: COLORS.UI.TEXT.SECONDARY
  },
  previewTable: {
    flex: 1,
    border: `1px solid ${COLORS.UI.BORDER.DEFAULT}`,
    borderRadius: '4px',
    overflow: 'auto',
    backgroundColor: 'white'
  },
  table: {
    width: 'max-content',
    borderCollapse: 'collapse',
    fontSize: '14px'
  },
  tableHeader: (color) => ({
    padding: '10px',
    textAlign: 'left',
    borderBottom: `1px solid ${COLORS.UI.BORDER.DEFAULT}`,
    position: 'sticky',
    top: 0,
    backgroundColor: color || COLORS.UI.BACKGROUND.LIGHT,
    minWidth: '150px',
    fontSize: '16px'
  }),
  columnNumber: {
    color: COLORS.UI.TEXT.SECONDARY,
    fontSize: '14px',
    marginBottom: '4px'
  },
  tableCell: {
    padding: '15px',
    borderBottom: `2px solid ${COLORS.UI.BORDER.LIGHT}`
  }
};

// Location Form Dialog Styles
export const locationFormStyles = {
  ...dialogStyles,
  container: {
    ...dialogStyles.container,
    width: '900px',
    height: 'auto',
    maxHeight: '90vh',
    padding: '20px',
    gap: '12px',
    overflow: 'hidden',
    boxShadow: `0 12px 24px ${COLORS.UI.SHADOW.DEFAULT}`,
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontSize: '20px',
    color: COLORS.UI.TEXT.PRIMARY,
    margin: 0,
    marginBottom: '12px',
    padding: '0 0 8px 0',
    borderBottom: `1px solid ${COLORS.UI.BORDER.LIGHT}`
  },
  coordinates: {
    padding: '6px 10px',
    backgroundColor: COLORS.UI.BACKGROUND.LIGHT,
    borderRadius: '4px',
    fontSize: '13px',
    color: COLORS.UI.TEXT.SECONDARY,
    display: 'block',
    marginBottom: '12px',
    boxShadow: `0 1px 3px ${COLORS.UI.SHADOW.DEFAULT}`
  },
  form: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  sectionTitle: {
    fontSize: '16px',
    padding: '6px 12px',
    backgroundColor: COLORS.UI.WARNING,
    color: COLORS.UI.TEXT.WHITE,
    borderRadius: '4px',
    margin: 0,
    display: 'inline-block',
    width: 'fit-content',
    boxShadow: `0 1px 3px ${COLORS.UI.SHADOW.DEFAULT}`,
    position: 'relative',
    zIndex: 1
  },
  sectionContent: {
    backgroundColor: COLORS.UI.BACKGROUND.WHITE,
    border: `1px solid ${COLORS.UI.BORDER.DEFAULT}`,
    borderRadius: '6px',
    padding: '16px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    marginTop: '-6px',
    boxShadow: `0 2px 4px ${COLORS.UI.SHADOW.DEFAULT}`,
    minHeight: '200px',
    maxHeight: '250px'
  },
  fieldGroup: {
    marginBottom: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  label: {
    display: 'block',
    marginBottom: '2px',
    color: COLORS.UI.TEXT.SECONDARY,
    fontSize: '15px'
  },
  input: {
    width: '90%',
    padding: '6px 8px',
    border: `1px solid ${COLORS.UI.BORDER.DEFAULT}`,
    borderRadius: '4px',
    fontSize: '14px',
    backgroundColor: COLORS.UI.BACKGROUND.WHITE,
    transition: 'all 0.2s ease',
    boxShadow: `0 1px 2px ${COLORS.UI.SHADOW.DEFAULT}`,
    '&:focus': {
      borderColor: COLORS.UI.PRIMARY,
      outline: 'none',
      boxShadow: `0 0 0 2px ${COLORS.UI.BACKGROUND.DARK}`
    }
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
    padding: '12px 0 0 0',
    borderTop: `1px solid ${COLORS.UI.BORDER.LIGHT}`,
    marginTop: '12px'
  },
  cancelButton: {
    padding: '8px 20px',
    backgroundColor: COLORS.UI.BACKGROUND.WHITE,
    border: `1px solid ${COLORS.UI.BORDER.DEFAULT}`,
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    color: COLORS.UI.TEXT.SECONDARY,
    transition: 'all 0.2s ease',
    boxShadow: `0 2px 4px ${COLORS.UI.SHADOW.DEFAULT}`,
    '&:hover': {
      backgroundColor: COLORS.UI.BACKGROUND.LIGHT,
      borderColor: COLORS.UI.BORDER.DEFAULT,
      boxShadow: `0 4px 6px ${COLORS.UI.SHADOW.DEFAULT}`
    }
  },
  submitButton: {
    padding: '8px 24px',
    backgroundColor: COLORS.UI.PRIMARY,
    color: COLORS.UI.TEXT.WHITE,
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(33, 150, 243, 0.3)',
    '&:hover': {
      backgroundColor: COLORS.UI.PRIMARY,
      boxShadow: '0 4px 6px rgba(33, 150, 243, 0.4)'
    }
  }
};

// ... other styles ... 