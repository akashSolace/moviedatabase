// API Configuration from environment variables
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const API_PREFIX = process.env.REACT_APP_API_PREFIX || '';

// Construct the full API base URL with prefix
export const API_BASE_URL_WITH_PREFIX = `${API_BASE_URL}${API_PREFIX}`;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL_WITH_PREFIX}/auth/login`,
    REGISTER: `${API_BASE_URL_WITH_PREFIX}/auth/register`,
    VERIFY: `${API_BASE_URL_WITH_PREFIX}/auth/verify`,
  },
  MOVIES: {
    BASE: `${API_BASE_URL_WITH_PREFIX}/movies`,
    BY_ID: (id) => `${API_BASE_URL_WITH_PREFIX}/movies/${id}`,
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
