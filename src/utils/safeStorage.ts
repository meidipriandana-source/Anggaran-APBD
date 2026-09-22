/**
 * Safe localStorage wrapper that handles iframe sandboxing,
 * disabled third-party cookies, and quota errors without crashing.
 */
export const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && 'localStorage' in window) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      console.warn(`safeStorage: unable to read key "${key}":`, e);
    }
    return null;
  },

  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined' && 'localStorage' in window) {
        window.localStorage.setItem(key, value);
      }
    } catch (e) {
      console.warn(`safeStorage: unable to set key "${key}":`, e);
    }
  },

  removeItem: (key: string): void => {
    try {
      if (typeof window !== 'undefined' && 'localStorage' in window) {
        window.localStorage.removeItem(key);
      }
    } catch (e) {
      console.warn(`safeStorage: unable to remove key "${key}":`, e);
    }
  }
};
