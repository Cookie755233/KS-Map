const API_URL = 'http://localhost:5001/api';

export const fetchLocations = async (collection) => {
  try {
    console.log(`Fetching from ${API_URL}/locations/${collection}`);
    const response = await fetch(`${API_URL}/locations/${collection}`);
    console.log(`Response status for ${collection}:`, response.status);
    if (!response.ok) {
      throw new Error(`Failed to fetch locations from ${collection}`);
    }
    const data = await response.json();
    // console.log(`Raw response data for ${collection}:`, data);
    return data;
  } catch (error) {
    console.error(`Error fetching locations from ${collection}:`, error);
    throw error;
  }
};

export const createLocation = async (location, collection) => {
  try {
    const response = await fetch(`${API_URL}/locations/${collection}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(location),
    });
    if (!response.ok) {
      throw new Error('Failed to create location');
    }
    return response.json();
  } catch (error) {
    console.error('Error creating location:', error);
    throw error;
  }
};

export const updateLocation = async (id, location, collection) => {
  try {
    const response = await fetch(`${API_URL}/locations/${collection}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(location),
    });
    if (!response.ok) {
      throw new Error('Failed to update location');
    }
    return response.json();
  } catch (error) {
    console.error('Error updating location:', error);
    throw error;
  }
};

export const deleteLocations = async (ids, collection) => {
  try {
    const response = await fetch(`${API_URL}/locations/${collection}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids }),
    });
    if (!response.ok) {
      throw new Error('Failed to delete locations');
    }
    return response.json();
  } catch (error) {
    console.error('Error deleting locations:', error);
    throw error;
  }
};

export const moveLocation = async (id, fromCollection, toCollection) => {
  try {
    const response = await fetch(`${API_URL}/locations/${fromCollection}/${id}/move/${toCollection}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to move location');
    }
    return await response.json();
  } catch (error) {
    console.error('Error moving location:', error);
    throw error;
  }
}; 