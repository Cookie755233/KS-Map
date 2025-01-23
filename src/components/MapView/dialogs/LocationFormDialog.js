import React, { useState, useEffect } from 'react';
import { locationFormStyles } from '../styles';

const LocationFormDialog = ({ show, onClose, onSubmit, coordinates = null }) => {
  const [formData, setFormData] = useState({
    parcelColumn: '',
    designerColumn: '',
    constructorColumn: '',
    landUseZoneColumn: '',
    aboveGroundFloorsColumn: '',
    undergroundFloorsColumn: '',
    solarPowerColumn: '',
    universalBathroomColumn: '',
    universalCommonRoomColumn: '',
    universalElevatorColumn: '',
    landscapeBalconyColumn: '',
    rainwaterCollectionColumn: '',
    frontGreenEnergyColumn: '',
    backGreenEnergyColumn: '',
    buildingHeightColumn: '',
    totalFloorAreaColumn: '',
    buildingCoverageColumn: '',
    floorAreaRatioColumn: '',
    constructionLicenseColumn: '',
    completionLicenseColumn: '',
    coordinatesColumn: ''
  });

  // Reset form data when dialog is closed
  useEffect(() => {
    if (!show) {
      setFormData({
        parcelColumn: '',
        designerColumn: '',
        constructorColumn: '',
        landUseZoneColumn: '',
        aboveGroundFloorsColumn: '',
        undergroundFloorsColumn: '',
        solarPowerColumn: '',
        universalBathroomColumn: '',
        universalCommonRoomColumn: '',
        universalElevatorColumn: '',
        landscapeBalconyColumn: '',
        rainwaterCollectionColumn: '',
        frontGreenEnergyColumn: '',
        backGreenEnergyColumn: '',
        buildingHeightColumn: '',
        totalFloorAreaColumn: '',
        buildingCoverageColumn: '',
        floorAreaRatioColumn: '',
        constructionLicenseColumn: '',
        completionLicenseColumn: '',
        coordinatesColumn: ''
      });
    }
  }, [show]);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);
    // Map the form data back to the expected format
    const mappedData = {
      parcel: formData.parcelColumn,
      designer: formData.designerColumn,
      constructor: formData.constructorColumn,
      landUseZone: formData.landUseZoneColumn,
      aboveGroundFloors: formData.aboveGroundFloorsColumn,
      undergroundFloors: formData.undergroundFloorsColumn,
      solarPower: formData.solarPowerColumn,
      universalBathroom: formData.universalBathroomColumn,
      universalCommonRoom: formData.universalCommonRoomColumn,
      universalElevator: formData.universalElevatorColumn,
      landscapeBalcony: formData.landscapeBalconyColumn,
      rainwaterCollection: formData.rainwaterCollectionColumn,
      frontGreenEnergy: formData.frontGreenEnergyColumn,
      backGreenEnergy: formData.backGreenEnergyColumn,
      buildingHeight: formData.buildingHeightColumn,
      totalFloorArea: formData.totalFloorAreaColumn,
      buildingCoverage: formData.buildingCoverageColumn,
      floorAreaRatio: formData.floorAreaRatioColumn,
      constructionLicense: formData.constructionLicenseColumn,
      completionLicense: formData.completionLicenseColumn,
      coordinates: formData.coordinatesColumn
    };
    console.log('Mapped data for submission:', mappedData);
    onSubmit(mappedData);
  };

  const handleChange = (field, value) => {
    console.log('Handling change:', field, value);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const fields = [
    { name: 'parcelColumn', label: '地號', type: 'text' },
    { name: 'designerColumn', label: '設計人', type: 'text' },
    { name: 'constructorColumn', label: '建設公司', type: 'text' },
    { name: 'landUseZoneColumn', label: '土地使用分區', type: 'text' },
    { name: 'aboveGroundFloorsColumn', label: '地上層數', type: 'number' },
    { name: 'undergroundFloorsColumn', label: '地下層數', type: 'number' },
    { name: 'solarPowerColumn', label: '太陽光電', type: 'number', unit: 'kW', step: '0.1' },
    { name: 'universalBathroomColumn', label: '通用化浴廁', type: 'number', unit: 'm²', step: '0.1' },
    { name: 'universalCommonRoomColumn', label: '通用化交誼廳', type: 'number', unit: 'm²', step: '0.1' },
    { name: 'universalElevatorColumn', label: '通用化昇降機', type: 'number', unit: 'm²', step: '0.1' },
    { name: 'landscapeBalconyColumn', label: '景觀陽臺', type: 'number', unit: 'm²', step: '0.1' },
    { name: 'rainwaterCollectionColumn', label: '雨水貯集', type: 'number', unit: 'm³', step: '0.1' },
    { name: 'frontGreenEnergyColumn', label: '屋前綠能設施', type: 'number', unit: 'm²', step: '0.1' },
    { name: 'backGreenEnergyColumn', label: '屋後綠能設施', type: 'number', unit: 'm²', step: '0.1' }
  ];

  return (
    <div
      style={locationFormStyles.overlay}
      onClick={(e) => {
        // Only close if clicking the overlay background
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        style={locationFormStyles.container}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={locationFormStyles.title}>
          Add Location
        </h2>

        {coordinates && (
          <div style={locationFormStyles.coordinates}>
            座標: {coordinates[0]}, {coordinates[1]}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={locationFormStyles.form}
        >
          <div style={locationFormStyles.section}>
            <h3 style={locationFormStyles.sectionTitle}>Basic Information</h3>
            <div style={locationFormStyles.sectionContent}>
              <div style={locationFormStyles.fieldGroup}>
                <label style={locationFormStyles.label}>地號:</label>
                <input
                  type="text"
                  value={formData.parcelColumn}
                  onChange={(e) => handleChange('parcelColumn', e.target.value)}
                  style={locationFormStyles.input}
                />
              </div>
              <div style={locationFormStyles.fieldGroup}>
                <label style={locationFormStyles.label}>設計人:</label>
                <input
                  type="text"
                  value={formData.designerColumn}
                  onChange={(e) => handleChange('designerColumn', e.target.value)}
                  style={locationFormStyles.input}
                />
              </div>
              <div style={locationFormStyles.fieldGroup}>
                <label style={locationFormStyles.label}>建設公司:</label>
                <input
                  type="text"
                  value={formData.constructorColumn}
                  onChange={(e) => handleChange('constructorColumn', e.target.value)}
                  style={locationFormStyles.input}
                />
              </div>
              <div style={locationFormStyles.fieldGroup}>
                <label style={locationFormStyles.label}>土地使用分區:</label>
                <input
                  type="text"
                  value={formData.landUseZoneColumn}
                  onChange={(e) => handleChange('landUseZoneColumn', e.target.value)}
                  style={locationFormStyles.input}
                />
              </div>
              <div style={locationFormStyles.fieldGroup}>
                <label style={locationFormStyles.label}>地上層數:</label>
                <input
                  type="number"
                  value={formData.aboveGroundFloorsColumn}
                  onChange={(e) => handleChange('aboveGroundFloorsColumn', e.target.value)}
                  style={locationFormStyles.input}
                />
              </div>
              <div style={locationFormStyles.fieldGroup}>
                <label style={locationFormStyles.label}>地下層數:</label>
                <input
                  type="number"
                  value={formData.undergroundFloorsColumn}
                  onChange={(e) => handleChange('undergroundFloorsColumn', e.target.value)}
                  style={locationFormStyles.input}
                />
              </div>
            </div>
          </div>

          <div style={locationFormStyles.section}>
            <h3 style={locationFormStyles.sectionTitle}>Kaohsiung House Design Highlights</h3>
            <div style={locationFormStyles.sectionContent}>
              <div style={locationFormStyles.fieldGroup}>
                <label style={locationFormStyles.label}>太陽光電 (kW):</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.solarPowerColumn}
                  onChange={(e) => handleChange('solarPowerColumn', e.target.value)}
                  style={locationFormStyles.input}
                />
              </div>
              <div style={locationFormStyles.fieldGroup}>
                <label style={locationFormStyles.label}>通用化浴廁 (m²):</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.universalBathroomColumn}
                  onChange={(e) => handleChange('universalBathroomColumn', e.target.value)}
                  style={locationFormStyles.input}
                />
              </div>
              <div style={locationFormStyles.fieldGroup}>
                <label style={locationFormStyles.label}>通用化交誼廳 (m²):</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.universalCommonRoomColumn}
                  onChange={(e) => handleChange('universalCommonRoomColumn', e.target.value)}
                  style={locationFormStyles.input}
                />
              </div>
              <div style={locationFormStyles.fieldGroup}>
                <label style={locationFormStyles.label}>通用化昇降機 (m²):</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.universalElevatorColumn}
                  onChange={(e) => handleChange('universalElevatorColumn', e.target.value)}
                  style={locationFormStyles.input}
                />
              </div>
              <div style={locationFormStyles.fieldGroup}>
                <label style={locationFormStyles.label}>景觀陽臺 (m²):</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.landscapeBalconyColumn}
                  onChange={(e) => handleChange('landscapeBalconyColumn', e.target.value)}
                  style={locationFormStyles.input}
                />
              </div>
              <div style={locationFormStyles.fieldGroup}>
                <label style={locationFormStyles.label}>雨水貯集 (m³):</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.rainwaterCollectionColumn}
                  onChange={(e) => handleChange('rainwaterCollectionColumn', e.target.value)}
                  style={locationFormStyles.input}
                />
              </div>
              <div style={locationFormStyles.fieldGroup}>
                <label style={locationFormStyles.label}>屋前綠能設施 (m²):</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.frontGreenEnergyColumn}
                  onChange={(e) => handleChange('frontGreenEnergyColumn', e.target.value)}
                  style={locationFormStyles.input}
                />
              </div>
              <div style={locationFormStyles.fieldGroup}>
                <label style={locationFormStyles.label}>屋後綠能設施 (m²):</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.backGreenEnergyColumn}
                  onChange={(e) => handleChange('backGreenEnergyColumn', e.target.value)}
                  style={locationFormStyles.input}
                />
              </div>
            </div>
          </div>

          <div style={locationFormStyles.buttonContainer}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              style={locationFormStyles.cancelButton}
            >
              取消
            </button>
            <button
              type="submit"
              style={locationFormStyles.submitButton}
            >
              新增
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LocationFormDialog; 