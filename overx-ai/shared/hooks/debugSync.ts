// Debug helper for cross-domain sync issues
export function debugSyncStatus() {
  if (typeof window === 'undefined') return;
  
  console.group('🔍 Cross-Domain Sync Debug');
  
  // Current domain info
  console.log('📍 Current domain:', window.location.hostname);
  console.log('📍 Full URL:', window.location.href);
  
  // Check localStorage
  console.group('💾 LocalStorage');
  try {
    const themeStorage = localStorage.getItem('theme-storage');
    console.log('Theme storage:', themeStorage);
    if (themeStorage) {
      try {
        const parsed = JSON.parse(themeStorage);
        console.log('Parsed theme:', parsed);
      } catch (e) {
        console.error('Failed to parse theme storage:', e);
      }
    }
    
    // List all localStorage keys
    const keys = Object.keys(localStorage);
    console.log('All localStorage keys:', keys);
  } catch (e) {
    console.error('LocalStorage access error:', e);
  }
  console.groupEnd();
  
  // Check cookies
  console.group('🍪 Cookies');
  console.log('Raw cookie string:', document.cookie);
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    if (key) acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
  console.log('Parsed cookies:', cookies);
  console.log('overx-locale cookie:', cookies['overx-locale']);
  console.groupEnd();
  
  // Check if cookies are blocked
  console.group('🚫 Cookie/Storage Restrictions');
  try {
    // Test cookie setting
    document.cookie = 'test-cookie=test; path=/';
    const testCookie = document.cookie.includes('test-cookie=test');
    console.log('Can set cookies:', testCookie);
    if (testCookie) {
      // Clean up
      document.cookie = 'test-cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    
    // Test localStorage
    const testKey = 'test-storage-' + Date.now();
    localStorage.setItem(testKey, 'test');
    const canStore = localStorage.getItem(testKey) === 'test';
    console.log('Can use localStorage:', canStore);
    if (canStore) {
      localStorage.removeItem(testKey);
    }
  } catch (e) {
    console.error('Storage test failed:', e);
  }
  console.groupEnd();
  
  console.groupEnd();
}

// Auto-run on page load for debugging
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    // Only run if debug flag is set
    if (window.location.search.includes('debug=sync')) {
      debugSyncStatus();
    }
  });
  
  // Export to window for manual debugging
  (window as any).debugSyncStatus = debugSyncStatus;
}