const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

export const login = async (username, password) => {
  try {
    console.log('Attempting login to:', `${API_URL}/auth/login`);
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
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