export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    VERIFY: `${API_BASE_URL}/auth/verify`,
  },
  MOVIES: {
    BASE: `${API_BASE_URL}/movies`,
    BY_ID: (id) => `${API_BASE_URL}/movies/${id}`,
  },
};

export const FILE_CONSTRAINTS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
};

export const VALIDATION_RULES = {
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 128,
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
  },
  TITLE: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 100,
  },
  YEAR: {
    MIN: 1900,
    MAX: 2030,
  },
};
