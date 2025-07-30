// Debug helper for cross-domain sync issues
export function debugSyncStatus() {
  if (typeof window === 'undefined') return;
  
  console.group('🔍 Cross-Domain Sync Debug (Converter Site)');
  
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
  
  console.groupEnd();
}

// Export to window for manual debugging
if (typeof window !== 'undefined') {
  (window as any).debugSyncStatus = debugSyncStatus;
}