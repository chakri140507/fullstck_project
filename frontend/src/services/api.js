const BASE_URL = '/api';

const api = {
  fetch: async (endpoint, options = {}) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API Error');
    }
    return response.json();
  },

  get: (endpoint) => api.fetch(endpoint, { method: 'GET' }),
  post: (endpoint, body) => api.fetch(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body) => api.fetch(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (endpoint) => api.fetch(endpoint, { method: 'DELETE' }),
};

export default api;
