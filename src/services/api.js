const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export const fetchLocations = async (collection) => {
  try {
    console.log(`Fetching from ${API_URL}/locations/${collection}`);
    const response = await fetch(`${API_URL}/locations/${collection}`, {
      method: 'GET',
      credentials: 'include',
      headers: defaultHeaders,
      mode: 'cors'
    });
    if (!response.ok) throw new Error(`Failed to fetch locations from ${collection}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching locations from ${collection}:`, error);
    throw error;
  }
};

export const createLocation = async (location, collection) => {
  try {
    const response = await fetch(`${API_URL}/locations/${collection}`, {
      method: 'POST',
      credentials: 'include',
      headers: defaultHeaders,
      mode: 'cors',
      body: JSON.stringify(location),
    });
    if (!response.ok) throw new Error('Failed to create location');
    return await response.json();
  } catch (error) {
    console.error('Error creating location:', error);
    throw error;
  }
};

export const updateLocation = async (id, location, collection) => {
  try {
    const response = await fetch(`${API_URL}/locations/${collection}/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: defaultHeaders,
      mode: 'cors',
      body: JSON.stringify(location),
    });
    if (!response.ok) throw new Error('Failed to update location');
    return await response.json();
  } catch (error) {
    console.error('Error updating location:', error);
    throw error;
  }
};

export const deleteLocations = async (ids, collection) => {
  try {
    const response = await fetch(`${API_URL}/locations/${collection}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: defaultHeaders,
      mode: 'cors',
      body: JSON.stringify({ ids }),
    });
    if (!response.ok) throw new Error('Failed to delete locations');
    return await response.json();
  } catch (error) {
    console.error('Error deleting locations:', error);
    throw error;
  }
};

export const moveLocation = async (id, fromCollection, toCollection) => {
  try {
    const response = await fetch(`${API_URL}/locations/${fromCollection}/${id}/move/${toCollection}`, {
      method: 'POST',
      credentials: 'include',
      headers: defaultHeaders,
      mode: 'cors',
    });
    if (!response.ok) throw new Error('Failed to move location');
    return await response.json();
  } catch (error) {
    console.error('Error moving location:', error);
    throw error;
  }
}; 