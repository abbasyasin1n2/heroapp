// LocalStorage utility functions for managing installed apps

const STORAGE_KEY = 'heroapp_installed_apps';

/**
 * Retrieves the array of installed app IDs from localStorage
 * @returns {Array<number>} Array of installed app IDs
 */
export const getStoredApps = () => {
  try {
    const storedApps = localStorage.getItem(STORAGE_KEY);
    return storedApps ? JSON.parse(storedApps) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

/**
 * Adds a new app ID to the localStorage array
 * @param {number} appId - The ID of the app to install
 * @returns {boolean} Success status
 */
export const saveApp = (appId) => {
  try {
    const storedApps = getStoredApps();
    
    // Check if app is already installed
    if (storedApps.includes(appId)) {
      return false;
    }
    
    // Add new app ID
    storedApps.push(appId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedApps));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

/**
 * Removes an app ID from the localStorage array
 * @param {number} appId - The ID of the app to uninstall
 * @returns {boolean} Success status
 */
export const removeApp = (appId) => {
  try {
    const storedApps = getStoredApps();
    const filteredApps = storedApps.filter(id => id !== appId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredApps));
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
};

