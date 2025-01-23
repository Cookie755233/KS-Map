import L from 'leaflet';

export const setupLeafletIcons = () => {
  // Fix Leaflet's default icon paths
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
  });
};

export const handleLocationClick = (location, index, setSelectedLocation, setSelectedRow, map = null, shouldMove = false) => {
  const lat = parseFloat(location.latitude);
  const lng = parseFloat(location.longitude);

  // Update selected states
  setSelectedLocation(location);
  setSelectedRow(index);

  // If map is provided and shouldMove is true, update the view
  if (map && shouldMove) {
    //lat + 0.001 for better view on mapinfo
    map.flyTo([lat + 0.001, lng], 18, {
      duration: 0.5,
      noMoveStart: true
    });

    // After movement completes, dispatch event
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('mapMoveComplete', {
        detail: { location }
      }));
    }, 600);
  }
};

export const getColumnOptions = (csvData, csvHeaders, hasHeader) => {
  if (!csvData || csvData.length === 0) return [];
  return hasHeader ? csvHeaders : csvData[0].map((_, index) => `Column ${index + 1}`);
}; 