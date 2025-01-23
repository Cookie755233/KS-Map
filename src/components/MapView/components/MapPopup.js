import React, { useState, useRef } from 'react';
import { Popup, useMap } from 'react-leaflet';
import { COLORS } from '../styles/colors';
import { mapPopupStyles } from '../styles';
import DeleteConfirmDialog from '../dialogs/DeleteConfirmDialog';

const MapPopup = ({ location, index, editingPopup, editingData, setEditingData, handlePopupEdit, handlePopupSave, coordinates, isLoggedIn, isAdmin, onDeleteLocations, onApproveLocations }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const popupRef = useRef();
  const map = useMap();

  console.log('Rendering MapPopup for:', { location, index, editingPopup });

  const currentData = editingPopup === index ? editingData : location;
  console.log('Current popup data:', currentData);

  // Add debug logs
  // console.log('MapPopup Permissions:', {
  //   isLoggedIn,
  //   isAdmin,
  //   index,
  //   isReviewed: index.startsWith('reviewed-'),
  //   isSample: index.startsWith('sample-'),
  //   buttonDisabled: !isLoggedIn || index.startsWith('sample-') || (!isAdmin && index.startsWith('reviewed-'))
  // });

  const handleClose = () => {
    if (popupRef.current) {
      map.closePopup(popupRef.current);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();  // Prevent default behavior
    e.stopPropagation(); // Stop event propagation
    console.log('Edit button clicked');
    console.log('Location:', location);
    console.log('Index:', index);
    handlePopupEdit(location, index);
  };

  const handleSave = () => {
    console.log('Save button clicked');
    console.log('EditingData:', editingData);
    console.log('Index:', index);

    // Remove _id from the data being sent to update
    const { _id, ...updateData } = editingData;
    console.log('Update data being sent:', updateData);

    handlePopupSave(index, updateData);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    onDeleteLocations([index]);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <Popup
        ref={popupRef}
        maxWidth={800}
        onOpen={() => {
          console.log('Popup opened for:', index);
          console.log('Current permissions:', { isLoggedIn, isAdmin });
        }}
        closeButton={false}
      >
        <div style={mapPopupStyles.container}>
          <button
            onClick={handleClose}
            style={mapPopupStyles.closeButton}
          >
            ×
          </button>
          <h3 style={mapPopupStyles.title}>
            {editingPopup === index ? (
              <input
                type="text"
                value={editingData?.parcel || ''}
                style={mapPopupStyles.titleInput}
                onChange={(e) => {
                  console.log('Updating parcel value:', e.target.value);
                  setEditingData(prev => ({
                    ...prev,
                    parcel: e.target.value
                  }));
                }}
              />
            ) : currentData.parcel}
          </h3>
          {coordinates && (
            <div style={mapPopupStyles.coordinates}>
              座標: {coordinates[0].toFixed(6)}, {coordinates[1].toFixed(6)}
            </div>
          )}
          <table style={mapPopupStyles.table}>
            <colgroup>
              <col style={{ width: '180px' }} />
              <col style={{ width: 'auto' }} />
            </colgroup>
            <tbody>
              {editingPopup === index ? (
                <>
                  <tr>
                    <td style={mapPopupStyles.tableCell}>設計人:</td>
                    <td style={{ padding: '5px 0' }}>
                      <input
                        type="text"
                        value={editingData?.designer || ''}
                        style={mapPopupStyles.input}
                        onChange={(e) => {
                          setEditingData(prev => ({
                            ...prev,
                            designer: e.target.value
                          }));
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={mapPopupStyles.tableCell}>建設公司:</td>
                    <td style={{ padding: '5px 0' }}>
                      <input
                        type="text"
                        value={editingData?.constructionCompany || ''}
                        style={mapPopupStyles.input}
                        onChange={(e) => {
                          setEditingData(prev => ({
                            ...prev,
                            constructionCompany: e.target.value
                          }));
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={mapPopupStyles.tableCell}>土地使用分區:</td>
                    <td style={{ padding: '5px 0' }}>
                      <input
                        type="text"
                        value={editingData?.landUseZone || ''}
                        style={mapPopupStyles.input}
                        onChange={(e) => {
                          setEditingData(prev => ({
                            ...prev,
                            landUseZone: e.target.value
                          }));
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={mapPopupStyles.tableCell}>地上層數:</td>
                    <td style={{ padding: '5px 0' }}>
                      <input
                        type="number"
                        value={editingData?.aboveGroundFloors || ''}
                        style={mapPopupStyles.input}
                        onChange={(e) => {
                          setEditingData(prev => ({
                            ...prev,
                            aboveGroundFloors: e.target.value
                          }));
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={mapPopupStyles.tableCell}>地下層數:</td>
                    <td style={{ padding: '5px 0' }}>
                      <input
                        type="number"
                        value={editingData?.undergroundFloors || ''}
                        style={mapPopupStyles.input}
                        onChange={(e) => {
                          setEditingData(prev => ({
                            ...prev,
                            undergroundFloors: e.target.value
                          }));
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={mapPopupStyles.tableCell}>太陽光電 (kW):</td>
                    <td style={{ padding: '5px 0' }}>
                      <input
                        type="number"
                        step="0.1"
                        value={editingData?.solarPower || ''}
                        style={mapPopupStyles.input}
                        onChange={(e) => {
                          setEditingData(prev => ({
                            ...prev,
                            solarPower: e.target.value
                          }));
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={mapPopupStyles.tableCell}>通用化浴廁 (m²):</td>
                    <td style={{ padding: '5px 0' }}>
                      <input
                        type="number"
                        step="0.1"
                        value={editingData?.universalBathroom || ''}
                        style={mapPopupStyles.input}
                        onChange={(e) => {
                          setEditingData(prev => ({
                            ...prev,
                            universalBathroom: e.target.value
                          }));
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={mapPopupStyles.tableCell}>通用化交誼廳 (m²):</td>
                    <td style={{ padding: '5px 0' }}>
                      <input
                        type="number"
                        step="0.1"
                        value={editingData?.universalCommonRoom || ''}
                        style={mapPopupStyles.input}
                        onChange={(e) => {
                          setEditingData(prev => ({
                            ...prev,
                            universalCommonRoom: e.target.value
                          }));
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={mapPopupStyles.tableCell}>通用化昇降機 (m²):</td>
                    <td style={{ padding: '5px 0' }}>
                      <input
                        type="number"
                        step="0.1"
                        value={editingData?.universalElevator || ''}
                        style={mapPopupStyles.input}
                        onChange={(e) => {
                          setEditingData(prev => ({
                            ...prev,
                            universalElevator: e.target.value
                          }));
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={mapPopupStyles.tableCell}>景觀陽臺 (m²):</td>
                    <td style={{ padding: '5px 0' }}>
                      <input
                        type="number"
                        step="0.1"
                        value={editingData?.landscapeBalcony || ''}
                        style={mapPopupStyles.input}
                        onChange={(e) => {
                          setEditingData(prev => ({
                            ...prev,
                            landscapeBalcony: e.target.value
                          }));
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={mapPopupStyles.tableCell}>雨水貯集 (m³):</td>
                    <td style={{ padding: '5px 0' }}>
                      <input
                        type="number"
                        step="0.1"
                        value={editingData?.rainwaterCollection || ''}
                        style={mapPopupStyles.input}
                        onChange={(e) => {
                          setEditingData(prev => ({
                            ...prev,
                            rainwaterCollection: e.target.value
                          }));
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={mapPopupStyles.tableCell}>屋前綠能設施 (m²):</td>
                    <td style={{ padding: '5px 0' }}>
                      <input
                        type="number"
                        step="0.1"
                        value={editingData?.frontGreenEnergy || ''}
                        style={mapPopupStyles.input}
                        onChange={(e) => {
                          setEditingData(prev => ({
                            ...prev,
                            frontGreenEnergy: e.target.value
                          }));
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={mapPopupStyles.tableCell}>屋後綠能設施 (m²):</td>
                    <td style={{ padding: '5px 0' }}>
                      <input
                        type="number"
                        step="0.1"
                        value={editingData?.backGreenEnergy || ''}
                        style={mapPopupStyles.input}
                        onChange={(e) => {
                          setEditingData(prev => ({
                            ...prev,
                            backGreenEnergy: e.target.value
                          }));
                        }}
                      />
                    </td>
                  </tr>
                </>
              ) : (
                <>
                  <tr>
                    <td style={mapPopupStyles.tableCell}>設計人:</td>
                    <td style={{ padding: '5px 0' }}>{currentData.designer || '-'}</td>
                  </tr>
                  <tr>
                    <td style={mapPopupStyles.tableCell}>建設公司:</td>
                    <td style={{ padding: '5px 0' }}>{currentData.constructionCompany || '-'}</td>
                  </tr>
                  <tr>
                    <td style={mapPopupStyles.tableCell}>土地使用分區:</td>
                    <td style={{ padding: '5px 0' }}>{currentData.landUseZone || '-'}</td>
                  </tr>
                  <tr>
                    <td style={mapPopupStyles.tableCell}>地上層數:</td>
                    <td style={{ padding: '5px 0' }}>{currentData.aboveGroundFloors || '-'}</td>
                  </tr>
                  <tr>
                    <td style={mapPopupStyles.tableCell}>地下層數:</td>
                    <td style={{ padding: '5px 0' }}>{currentData.undergroundFloors || '-'}</td>
                  </tr>
                  <tr>
                    <td style={mapPopupStyles.tableCell}>太陽光電 (kW):</td>
                    <td style={{ padding: '5px 0' }}>{currentData.solarPower || '-'}</td>
                  </tr>
                  <tr>
                    <td style={mapPopupStyles.tableCell}>通用化浴廁 (m²):</td>
                    <td style={{ padding: '5px 0' }}>{currentData.universalBathroom || '-'}</td>
                  </tr>
                  <tr>
                    <td style={mapPopupStyles.tableCell}>通用化交誼廳 (m²):</td>
                    <td style={{ padding: '5px 0' }}>{currentData.universalCommonRoom || '-'}</td>
                  </tr>
                  <tr>
                    <td style={mapPopupStyles.tableCell}>通用化昇降機 (m²):</td>
                    <td style={{ padding: '5px 0' }}>{currentData.universalElevator || '-'}</td>
                  </tr>
                  <tr>
                    <td style={mapPopupStyles.tableCell}>景觀陽臺 (m²):</td>
                    <td style={{ padding: '5px 0' }}>{currentData.landscapeBalcony || '-'}</td>
                  </tr>
                  <tr>
                    <td style={mapPopupStyles.tableCell}>雨水貯集 (m³):</td>
                    <td style={{ padding: '5px 0' }}>{currentData.rainwaterCollection || '-'}</td>
                  </tr>
                  <tr>
                    <td style={mapPopupStyles.tableCell}>屋前綠能設施 (m²):</td>
                    <td style={{ padding: '5px 0' }}>{currentData.frontGreenEnergy || '-'}</td>
                  </tr>
                  <tr>
                    <td style={mapPopupStyles.tableCell}>屋後綠能設施 (m²):</td>
                    <td style={{ padding: '5px 0' }}>{currentData.backGreenEnergy || '-'}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
          <div style={mapPopupStyles.buttonContainer}>
            {editingPopup === index ? (
              <div style={mapPopupStyles.buttonGroup}>
                <button
                  onClick={() => {
                    setEditingData(null);
                    handlePopupEdit(location, null);
                  }}
                  style={mapPopupStyles.cancelButton}
                >
                  取消
                </button>
                <button
                  onClick={handleSave}
                  style={mapPopupStyles.saveButton}
                >
                  儲存
                </button>
              </div>
            ) : (
              <div style={mapPopupStyles.buttonGroup}>
                <button
                  onClick={handleEdit}
                  disabled={!isLoggedIn || index.startsWith('sample-') || (!isAdmin && index.startsWith('reviewed-'))}
                  style={{
                    ...mapPopupStyles.editButton,
                    backgroundColor: (!isLoggedIn || index.startsWith('sample-') || (!isAdmin && index.startsWith('reviewed-')))
                      ? COLORS.UI.BORDER.DEFAULT
                      : COLORS.UI.PRIMARY,
                    cursor: (!isLoggedIn || index.startsWith('sample-') || (!isAdmin && index.startsWith('reviewed-')))
                      ? 'not-allowed'
                      : 'pointer'
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  disabled={!isLoggedIn || index.startsWith('sample-') || (!isAdmin && index.startsWith('reviewed-'))}
                  style={{
                    ...mapPopupStyles.deleteButton,
                    backgroundColor: (!isLoggedIn || index.startsWith('sample-') || (!isAdmin && index.startsWith('reviewed-')))
                      ? COLORS.UI.BORDER.DEFAULT
                      : COLORS.UI.DANGER,
                    cursor: (!isLoggedIn || index.startsWith('sample-') || (!isAdmin && index.startsWith('reviewed-')))
                      ? 'not-allowed'
                      : 'pointer'
                  }}
                >
                  Delete
                </button>
                {isAdmin && index.startsWith('pending-') && (
                  <button
                    onClick={() => onApproveLocations([index])}
                    style={mapPopupStyles.approveButton}
                  >
                    Approve
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </Popup>
      <DeleteConfirmDialog
        show={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default MapPopup;
