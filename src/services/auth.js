// Ensure API_URL ends with /api
const API_URL = process.env.REACT_APP_API_URL ?
  (process.env.REACT_APP_API_URL.endsWith('/api') ? process.env.REACT_APP_API_URL : `${process.env.REACT_APP_API_URL}/api`) :
  'http://localhost:5001/api';

export const login = async (username, password) => {
  try {
    const loginUrl = `${API_URL}/auth/login`;
    console.log('Attempting login to:', loginUrl);
    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',  // Add this for cookies
      body: JSON.stringify({ username, password }),
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Received non-JSON response:', await response.text());
      throw new Error('Server error: Invalid response format');
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || '登入失敗');
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    if (error.message === 'Failed to fetch') {
      throw new Error('無法連接到伺服器');
    }
    throw error;
  }
}; 