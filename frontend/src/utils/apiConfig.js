/**
 * API Configuration Utility
 * Handles API endpoint configuration and API key management
 */

// Determine if we're in development or production environment
const isDevelopment = import.meta.env.DEV || !import.meta.env.VITE_ENVIRONMENT;

// Base URL for API endpoints
export const API_BASE_URL = isDevelopment
  ? 'http://localhost:5050/api'
  : 'https://jobfit-backend.onrender.com/api';

// API Key Storage Keys
const API_KEY_STORAGE_KEY = 'jobfit_gemini_api_key';
const API_KEY_TIMESTAMP_KEY = 'jobfit_gemini_api_key_timestamp';

/**
 * Saves an API key to localStorage
 * @param {string} apiKey - The Gemini API key to save
 */
export const saveApiKey = (apiKey) => {
  if (!apiKey) return false;

  try {
    localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
    localStorage.setItem(API_KEY_TIMESTAMP_KEY, Date.now().toString());
    return true;
  } catch (error) {
    console.error('Error saving API key:', error);
    return false;
  }
};

/**
 * Retrieves the API key from localStorage
 * @returns {string|null} The stored API key or null if not found
 */
export const getApiKey = () => {
  try {
    return localStorage.getItem(API_KEY_STORAGE_KEY);
  } catch (error) {
    console.error('Error retrieving API key:', error);
    return null;
  }
};

/**
 * Validates an API key format
 * Currently checks if the key is a non-empty string that looks like a Gemini API key
 * @param {string} apiKey - The API key to validate
 * @returns {boolean} Whether the key passes basic validation
 */
export const validateApiKey = (apiKey) => {
  // Google issues Gemini keys with varying prefixes (e.g. "AIza…", "AQ…"),
  // so we only sanity-check shape here: a non-empty, whitespace-free token of
  // reasonable length. The real validity is confirmed by the API on use.
  if (!apiKey || typeof apiKey !== 'string') return false;
  const trimmed = apiKey.trim();
  return trimmed.length >= 20 && !/\s/.test(trimmed);
};

/**
 * Removes the stored API key
 * @returns {boolean} Whether the operation was successful
 */
export const clearApiKey = () => {
  try {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
    localStorage.removeItem(API_KEY_TIMESTAMP_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing API key:', error);
    return false;
  }
};

/**
 * Checks if a valid API key exists in localStorage
 * @returns {boolean} Whether a valid API key exists
 */
export const hasValidApiKey = () => {
  const apiKey = getApiKey();
  return validateApiKey(apiKey);
};

/**
 * Adds the API key to a request config object (for axios)
 * @param {Object} config - The axios request config
 * @returns {Object} The updated config with API key in headers
 */
export const addApiKeyToRequestConfig = (config = {}) => {
  const apiKey = getApiKey();

  if (!apiKey) {
    return config;
  }

  // Initialize headers if they don't exist
  const headers = config.headers || {};

  // Add API key to headers
  return {
    ...config,
    headers: {
      ...headers,
      'X-API-KEY': apiKey,
    },
  };
};

/**
 * Creates a full API URL for a specific endpoint
 * @param {string} endpoint - The API endpoint (without leading slash)
 * @returns {string} The complete API URL
 */
export const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};
