const CACHE_NAME = 'converter-v1'
const RUNTIME_CACHE = 'runtime-cache'

// URLs to cache on install
const urlsToCache = [
  '/en',
  '/es',
  '/ru',
  '/favicon.ico',
  '/locales/en/common.json',
  '/locales/es/common.json',
  '/locales/ru/common.json',
]

// Install event - cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        urlsToCache.map((url) => {
          return fetch(url, { redirect: 'follow' })
            .then((response) => {
              // Only cache successful responses
              if (response.ok) {
                return cache.put(url, response)
              }
              console.warn(`Failed to cache ${url}: Response not ok`)
            })
            .catch((error) => {
              console.warn(`Failed to cache ${url}:`, error)
              // Continue with other URLs even if one fails
            })
        })
      )
    })
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE)
          .map((cacheName) => caches.delete(cacheName))
      )
    })
  )
  self.clients.claim()
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return

  const { request } = event
  const url = new URL(request.url)
  
  // Skip chrome-extension and other non-http(s) URLs
  if (!url.protocol.startsWith('http')) return

  // Handle API requests with network-first strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request, { redirect: 'follow' })
        .then((response) => {
          // Cache successful responses
          if (response.status === 200) {
            const responseClone = response.clone()
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseClone)
            })
          }
          return response
        })
        .catch(() => {
          // Fallback to cache on network failure
          return caches.match(request)
        })
    )
    return
  }

  // Handle other requests with cache-first strategy
  event.respondWith(
    caches.match(request).then((response) => {
      if (response) {
        // Update cache in the background
        fetch(request, { redirect: 'follow' }).then((fetchResponse) => {
          if (fetchResponse.status === 200) {
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, fetchResponse)
            })
          }
        }).catch(() => {
          // Ignore background update errors
        })
        return response
      }

      // Fallback to network
      return fetch(request, { redirect: 'follow' }).then((fetchResponse) => {
        // Cache successful responses
        if (fetchResponse.status === 200) {
          const responseClone = fetchResponse.clone()
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseClone)
          })
        }
        return fetchResponse
      }).catch((error) => {
        console.error('Fetch failed:', error)
        // Return cached version if available
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse
          }
          throw error
        })
      })
    })
  )
})