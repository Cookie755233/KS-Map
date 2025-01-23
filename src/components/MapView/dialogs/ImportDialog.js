import React from 'react';
import { importDialogStyles } from '../styles';
import { COLORS } from '../styles/colors';

const ImportDialog = ({
  show,
  onClose,
  onConfirm,
  mappingConfig,
  setMappingConfig,
  csvData,
  csvHeaders
}) => {
  if (!show) return null;

  const handleColumnSelect = (field, value) => {
    setMappingConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const columnConfigs = [
    { field: 'latitudeColumn', label: '緯度', color: COLORS.UI.IMPORT.LATITUDE, required: true },
    { field: 'longitudeColumn', label: '經度', color: COLORS.UI.IMPORT.LONGITUDE, required: true },
    { field: 'parcelColumn', label: '地號', color: COLORS.UI.IMPORT.PARCEL },
    { field: 'designerColumn', label: '設計人', color: COLORS.UI.IMPORT.DESIGNER },
    { field: 'constructorColumn', label: '建設公司', color: COLORS.UI.IMPORT.CONSTRUCTOR },
    { field: 'landUseZoneColumn', label: '土地使用分區', color: COLORS.UI.IMPORT.LAND_USE },
    { field: 'aboveGroundFloorsColumn', label: '地上層數', color: COLORS.UI.IMPORT.FLOORS_ABOVE },
    { field: 'undergroundFloorsColumn', label: '地下層數', color: COLORS.UI.IMPORT.FLOORS_UNDER },
    { field: 'universalBathroomColumn', label: '通用化浴廁 (m²)', color: COLORS.UI.IMPORT.BATHROOM },
    { field: 'universalCommonRoomColumn', label: '通用化交誼廳 (m²)', color: COLORS.UI.IMPORT.COMMON_ROOM },
    { field: 'universalElevatorColumn', label: '通用化昇降機 (m²)', color: COLORS.UI.IMPORT.ELEVATOR },
    { field: 'landscapeBalconyColumn', label: '景觀陽臺 (m²)', color: COLORS.UI.IMPORT.BALCONY },
    { field: 'rainwaterCollectionColumn', label: '雨水貯集 (m³)', color: COLORS.UI.IMPORT.RAINWATER },
    { field: 'frontGreenEnergyColumn', label: '屋前綠能設施 (m²)', color: COLORS.UI.IMPORT.FRONT_GREEN },
    { field: 'backGreenEnergyColumn', label: '屋後綠能設施 (m²)', color: COLORS.UI.IMPORT.BACK_GREEN },
    { field: 'solarPowerColumn', label: '太陽光電 (kW)', color: COLORS.UI.IMPORT.SOLAR }
  ];

  // Generate column options based on header setting
  const getColumnOptions = () => {
    if (mappingConfig.hasHeader) {
      return csvHeaders.map(header => (
        <option key={header} value={header}>{header}</option>
      ));
    } else {
      return csvHeaders.map((_, index) => (
        <option key={index} value={`Column ${index + 1}`}>Column {index + 1}</option>
      ));
    }
  };

  return (
    <div style={importDialogStyles.overlay}>
      <div style={importDialogStyles.container}>
        <h2 style={importDialogStyles.title}>Import Data Configuration</h2>

        <div style={importDialogStyles.infoBanner}>
          <span> ℹ️ {csvData?.length || 0} items ready to process</span>
        </div>

        <div style={importDialogStyles.mainContent}>
          {/* Left Section - Column Mapping */}
          <div style={importDialogStyles.leftSection}>
            <div style={importDialogStyles.headerCheckbox}>
              <label style={importDialogStyles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={mappingConfig.hasHeader}
                  onChange={(e) => {
                    handleColumnSelect('hasHeader', e.target.checked);
                    if (!e.target.checked) {
                      const resetConfig = { hasHeader: false };
                      setMappingConfig(resetConfig);
                    }
                  }}
                />
                My Data Contains Header Row
              </label>
            </div>

            <div style={importDialogStyles.columnList}>
              {columnConfigs.map(({ field, label, color, required }) => (
                <div key={field} style={importDialogStyles.columnItem(color)}>
                  <label style={importDialogStyles.columnLabel}>
                    {label}{required && <span style={importDialogStyles.requiredMark}>*</span>}
                  </label>
                  <select
                    value={mappingConfig[field] || ''}
                    onChange={(e) => handleColumnSelect(field, e.target.value)}
                    style={importDialogStyles.columnSelect(required, mappingConfig[field])}
                  >
                    <option value="">選擇欄位</option>
                    {getColumnOptions()}
                  </select>
                  {required && !mappingConfig[field] && (
                    <div style={importDialogStyles.errorMessage}>
                      This field is required
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Vertical Divider */}
          <div style={importDialogStyles.divider} />

          {/* Right Section - Preview */}
          <div style={importDialogStyles.rightSection}>
            <h3 style={importDialogStyles.previewTitle}>Table Preview</h3>
            <div style={importDialogStyles.previewTable}>
              <table style={importDialogStyles.table}>
                <thead>
                  <tr>
                    {csvHeaders.map((header, index) => {
                      const columnNumber = `Column ${index + 1}`;
                      const matchingConfig = columnConfigs.find(
                        config => {
                          if (mappingConfig.hasHeader) {
                            return mappingConfig[config.field] === header;
                          } else {
                            return mappingConfig[config.field] === columnNumber;
                          }
                        }
                      );

                      return (
                        <th key={header} style={importDialogStyles.tableHeader(matchingConfig?.color)}>
                          {!mappingConfig.hasHeader && (
                            <div style={importDialogStyles.columnNumber}>
                              Column {index + 1}
                            </div>
                          )}
                          {header}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {csvData?.slice(0, 5).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {csvHeaders.map((header, colIndex) => (
                        <td key={header} style={importDialogStyles.tableCell}>
                          {row[header]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div style={importDialogStyles.buttonContainer}>
          <button
            onClick={onClose}
            style={importDialogStyles.cancelButton}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={importDialogStyles.confirmButton}
          >
            Import
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportDialog; 