import { useState } from 'react';

export const useImportState = ({ username, onImportSuccess }) => {
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [notification, setNotification] = useState(null);
  const [mappingConfig, setMappingConfig] = useState({
    hasHeader: true,
    latitudeColumn: '',
    longitudeColumn: '',
    parcelColumn: '',
    designerColumn: '',
    constructorColumn: '',
    landUseZoneColumn: '',
    aboveGroundFloorsColumn: '',
    undergroundFloorsColumn: '',
    universalBathroomColumn: '',
    universalCommonRoomColumn: '',
    universalElevatorColumn: '',
    landscapeBalconyColumn: '',
    rainwaterCollectionColumn: '',
    frontGreenEnergyColumn: '',
    backGreenEnergyColumn: '',
    solarPowerColumn: ''
  });

  const handleImportConfirm = async () => {
    try {
      const newLocations = csvData.map(row => {
        const latColumn = mappingConfig.latitudeColumn;
        const lngColumn = mappingConfig.longitudeColumn;

        let latitude = row[latColumn];
        let longitude = row[lngColumn];

        if (!latitude || !longitude) {
          throw new Error('Missing latitude or longitude values');
        }

        return {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          parcel: row[mappingConfig.parcelColumn] || '',
          designer: row[mappingConfig.designerColumn] || '',
          constructionCompany: row[mappingConfig.constructorColumn] || '',
          landUseZone: row[mappingConfig.landUseZoneColumn] || '',
          aboveGroundFloors: row[mappingConfig.aboveGroundFloorsColumn] || '',
          undergroundFloors: row[mappingConfig.undergroundFloorsColumn] || '',
          universalBathroom: row[mappingConfig.universalBathroomColumn] || '',
          universalCommonRoom: row[mappingConfig.universalCommonRoomColumn] || '',
          universalElevator: row[mappingConfig.universalElevatorColumn] || '',
          landscapeBalcony: row[mappingConfig.landscapeBalconyColumn] || '',
          rainwaterCollection: row[mappingConfig.rainwaterCollectionColumn] || '',
          frontGreenEnergy: row[mappingConfig.frontGreenEnergyColumn] || '',
          backGreenEnergy: row[mappingConfig.backGreenEnergyColumn] || '',
          solarPower: row[mappingConfig.solarPowerColumn] || '',
          uploaded_by: username,
          collection: 'pending_data'
        };
      });

      console.log('Current username:', username);
      console.log('Request URL:', 'http://localhost:5001/api/locations/pending_data/batch');
      console.log('Request payload:', { locations: newLocations });

      const response = await fetch('http://localhost:5001/api/locations/pending_data/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ locations: newLocations }),
      });

      const responseText = await response.text();
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      console.log('Server response:', responseText);

      if (!response.ok) {
        throw new Error(`Failed to import locations: ${responseText}`);
      }

      setShowImportDialog(false);

      // Call the onImportSuccess callback to refresh data
      if (onImportSuccess) {
        onImportSuccess(newLocations.length);
      }

      return { success: true, locations: newLocations };
    } catch (error) {
      console.error('Error importing data:', error);
      setNotification({
        type: 'warning',
        message: error.message || 'Failed to import locations'
      });
      return { success: false, error: error.message };
    }
  };

  return {
    showImportDialog,
    setShowImportDialog,
    showGuide,
    setShowGuide,
    csvHeaders,
    setCsvHeaders,
    csvData,
    setCsvData,
    notification,
    setNotification,
    mappingConfig,
    setMappingConfig,
    handleImportConfirm
  };
}; 