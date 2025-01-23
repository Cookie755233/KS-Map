import Papa from 'papaparse';
import JSZip from 'jszip';
import { DOMParser } from '@xmldom/xmldom';

export const handleCsvUpload = (content, setCsvHeaders, setCsvData, setMappingConfig, setShowImportDialog) => {
  try {
    Papa.parse(content, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data && results.data.length > 0) {
          const headers = Object.keys(results.data[0]);
          setCsvHeaders(headers);
          setCsvData(results.data);

          // Auto-match columns
          const autoConfig = {
            hasHeader: true,
            collection: 'pending_data',
            latitudeColumn: headers.find(h => /^(lat|緯度)/i.test(h)) || '',
            longitudeColumn: headers.find(h => /^(lon|lng|經度)/i.test(h)) || '',
            parcelColumn: headers.find(h => /^(parcel|地號)/i.test(h)) || '',
            designerColumn: headers.find(h => /^(designer|設計人)/i.test(h)) || '',
            constructorColumn: headers.find(h => /^(constructor|建設公司)/i.test(h)) || '',
            landUseZoneColumn: headers.find(h => /^(landUseZone|土地使用分區)/i.test(h)) || '',
            aboveGroundFloorsColumn: headers.find(h => /^(aboveGroundFloors|地上層數)/i.test(h)) || '',
            undergroundFloorsColumn: headers.find(h => /^(undergroundFloors|地下層數)/i.test(h)) || '',
            universalBathroomColumn: headers.find(h => /^(universalBathroom|通用化浴廁)/i.test(h)) || '',
            universalCommonRoomColumn: headers.find(h => /^(universalCommonRoom|通用化交誼廳)/i.test(h)) || '',
            universalElevatorColumn: headers.find(h => /^(universalElevator|通用化昇降機)/i.test(h)) || '',
            landscapeBalconyColumn: headers.find(h => /^(landscapeBalcony|景觀陽臺)/i.test(h)) || '',
            rainwaterCollectionColumn: headers.find(h => /^(rainwaterCollection|雨水貯集)/i.test(h)) || '',
            frontGreenEnergyColumn: headers.find(h => /^(frontGreenEnergy|屋前綠能設施)/i.test(h)) || '',
            backGreenEnergyColumn: headers.find(h => /^(backGreenEnergy|屋後綠能設施)/i.test(h)) || '',
            solarPowerColumn: headers.find(h => /^(solarPower|太陽光電)/i.test(h)) || ''
          };
          setMappingConfig(autoConfig);
          setShowImportDialog(true);
        }
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        alert('Error parsing CSV file');
      }
    });
  } catch (error) {
    console.error('Error handling CSV upload:', error);
    alert('Error handling CSV file');
  }
};

export const handleImportConfirm = (mappingConfig, csvData, setLocations) => {
  try {
    const newLocations = csvData.map(row => {
      // Get the actual column name or number from mapping config
      const latColumn = mappingConfig.latitudeColumn;
      const lngColumn = mappingConfig.longitudeColumn;

      // Extract values using the mapped column
      let latitude, longitude;

      if (mappingConfig.hasHeader) {
        latitude = row[latColumn];
        longitude = row[lngColumn];
      } else {
        // When no headers, the column values are stored under the first row's values
        const headers = Object.keys(row);
        latitude = row[headers[parseInt(latColumn.replace('Column ', '')) - 1]];
        longitude = row[headers[parseInt(lngColumn.replace('Column ', '')) - 1]];
      }

      if (!latitude || !longitude) {
        throw new Error('Missing latitude or longitude values');
      }

      return {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        parcel: mappingConfig.hasHeader
          ? (row[mappingConfig.parcelColumn] || '')
          : (row[Object.keys(row)[parseInt(mappingConfig.parcelColumn?.replace('Column ', '')) - 1]] || ''),
        designer: mappingConfig.hasHeader
          ? (row[mappingConfig.designerColumn] || '')
          : (row[Object.keys(row)[parseInt(mappingConfig.designerColumn?.replace('Column ', '')) - 1]] || ''),
        constructionCompany: mappingConfig.hasHeader
          ? (row[mappingConfig.constructorColumn] || '')
          : (row[Object.keys(row)[parseInt(mappingConfig.constructorColumn?.replace('Column ', '')) - 1]] || ''),
        landUseZone: mappingConfig.hasHeader
          ? (row[mappingConfig.landUseZoneColumn] || '')
          : (row[Object.keys(row)[parseInt(mappingConfig.landUseZoneColumn?.replace('Column ', '')) - 1]] || ''),
        aboveGroundFloors: mappingConfig.hasHeader
          ? (row[mappingConfig.aboveGroundFloorsColumn] || '')
          : (row[Object.keys(row)[parseInt(mappingConfig.aboveGroundFloorsColumn?.replace('Column ', '')) - 1]] || ''),
        undergroundFloors: mappingConfig.hasHeader
          ? (row[mappingConfig.undergroundFloorsColumn] || '')
          : (row[Object.keys(row)[parseInt(mappingConfig.undergroundFloorsColumn?.replace('Column ', '')) - 1]] || ''),
        universalBathroom: mappingConfig.hasHeader
          ? (row[mappingConfig.universalBathroomColumn] || '')
          : (row[Object.keys(row)[parseInt(mappingConfig.universalBathroomColumn?.replace('Column ', '')) - 1]] || ''),
        universalCommonRoom: mappingConfig.hasHeader
          ? (row[mappingConfig.universalCommonRoomColumn] || '')
          : (row[Object.keys(row)[parseInt(mappingConfig.universalCommonRoomColumn?.replace('Column ', '')) - 1]] || ''),
        universalElevator: mappingConfig.hasHeader
          ? (row[mappingConfig.universalElevatorColumn] || '')
          : (row[Object.keys(row)[parseInt(mappingConfig.universalElevatorColumn?.replace('Column ', '')) - 1]] || ''),
        landscapeBalcony: mappingConfig.hasHeader
          ? (row[mappingConfig.landscapeBalconyColumn] || '')
          : (row[Object.keys(row)[parseInt(mappingConfig.landscapeBalconyColumn?.replace('Column ', '')) - 1]] || ''),
        rainwaterCollection: mappingConfig.hasHeader
          ? (row[mappingConfig.rainwaterCollectionColumn] || '')
          : (row[Object.keys(row)[parseInt(mappingConfig.rainwaterCollectionColumn?.replace('Column ', '')) - 1]] || ''),
        frontGreenEnergy: mappingConfig.hasHeader
          ? (row[mappingConfig.frontGreenEnergyColumn] || '')
          : (row[Object.keys(row)[parseInt(mappingConfig.frontGreenEnergyColumn?.replace('Column ', '')) - 1]] || ''),
        backGreenEnergy: mappingConfig.hasHeader
          ? (row[mappingConfig.backGreenEnergyColumn] || '')
          : (row[Object.keys(row)[parseInt(mappingConfig.backGreenEnergyColumn?.replace('Column ', '')) - 1]] || ''),
        solarPower: mappingConfig.hasHeader
          ? (row[mappingConfig.solarPowerColumn] || '')
          : (row[Object.keys(row)[parseInt(mappingConfig.solarPowerColumn?.replace('Column ', '')) - 1]] || '')
      };
    });

    setLocations(prevLocations => [...prevLocations, ...newLocations]);
    return { success: true, message: `Successfully imported ${newLocations.length} locations` };
  } catch (error) {
    console.error('Error importing data:', error);
    return { success: false, message: error.message };
  }
};

export const handleKmlUpload = async (kmlContent, setCsvData, setCsvHeaders, setMappingConfig, setShowImportDialog) => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(kmlContent, 'text/xml');
    const placemarks = xmlDoc.getElementsByTagName('Placemark');
    const data = [];

    for (let i = 0; i < placemarks.length; i++) {
      const placemark = placemarks[i];
      const coordinates = placemark.getElementsByTagName('coordinates')[0]?.textContent || '';
      const [lng, lat] = coordinates.trim().split(',').map(Number);

      if (!isNaN(lat) && !isNaN(lng)) {
        const schemaData = placemark.getElementsByTagName('SchemaData')[0];
        const simpleDataFields = schemaData?.getElementsByTagName('SimpleData') || [];
        const row = {
          latitude: lat,
          longitude: lng
        };

        for (let j = 0; j < simpleDataFields.length; j++) {
          const field = simpleDataFields[j];
          const fieldName = field.getAttribute('name');
          const value = field.textContent || '';
          row[fieldName] = value;
        }
        data.push(row);
      }
    }

    if (data.length > 0) {
      const headers = ['latitude', 'longitude', ...Object.keys(data[0]).filter(k => !['latitude', 'longitude'].includes(k))];
      setCsvHeaders(headers);
      setCsvData(data);

      // Auto-match columns
      const autoConfig = {
        hasHeader: true,
        collection: 'pending_data',
        latitudeColumn: 'latitude',
        longitudeColumn: 'longitude',
        parcelColumn: headers.find(h => /^(parcel|地號)/i.test(h)) || '',
        designerColumn: headers.find(h => /^(designer|設計人)/i.test(h)) || '',
        constructorColumn: headers.find(h => /^(constructor|建設公司)/i.test(h)) || '',
        landUseZoneColumn: headers.find(h => /^(landUseZone|土地使用分區)/i.test(h)) || '',
        aboveGroundFloorsColumn: headers.find(h => /^(aboveGroundFloors|地上層數)/i.test(h)) || '',
        undergroundFloorsColumn: headers.find(h => /^(undergroundFloors|地下層數)/i.test(h)) || '',
        universalBathroomColumn: headers.find(h => /^(universalBathroom|通用化浴廁)/i.test(h)) || '',
        universalCommonRoomColumn: headers.find(h => /^(universalCommonRoom|通用化交誼廳)/i.test(h)) || '',
        universalElevatorColumn: headers.find(h => /^(universalElevator|通用化昇降機)/i.test(h)) || '',
        landscapeBalconyColumn: headers.find(h => /^(landscapeBalcony|景觀陽臺)/i.test(h)) || '',
        rainwaterCollectionColumn: headers.find(h => /^(rainwaterCollection|雨水貯集)/i.test(h)) || '',
        frontGreenEnergyColumn: headers.find(h => /^(frontGreenEnergy|屋前綠能設施)/i.test(h)) || '',
        backGreenEnergyColumn: headers.find(h => /^(backGreenEnergy|屋後綠能設施)/i.test(h)) || '',
        solarPowerColumn: headers.find(h => /^(solarPower|太陽光電)/i.test(h)) || ''
      };
      setMappingConfig(autoConfig);
      setShowImportDialog(true);
    }
  } catch (error) {
    console.error('Error parsing KML:', error);
    alert('Error parsing KML file');
  }
};

export const handleKmzUpload = async (file, handleKmlUpload, setCsvData, setCsvHeaders, setMappingConfig, setShowImportDialog) => {
  try {
    const zip = new JSZip();
    const zipContent = await zip.loadAsync(file);
    const kmlFile = Object.values(zipContent.files).find(file => file.name.endsWith('.kml'));

    if (kmlFile) {
      const kmlContent = await kmlFile.async('text');
      await handleKmlUpload(kmlContent, setCsvData, setCsvHeaders, setMappingConfig, setShowImportDialog);
    } else {
      alert('No KML file found in the KMZ archive');
    }
  } catch (error) {
    console.error('Error parsing KMZ:', error);
    alert('Error parsing KMZ file');
  }
};
