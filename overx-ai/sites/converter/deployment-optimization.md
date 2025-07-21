# Deployment Optimization Guide

## 1. Use Static Export (Recommended)

Convert to static HTML for instant serving:

```bash
# Update package.json
"scripts": {
  "build": "next build && next export",
  "start": "serve out -p 3003"
}
```

## 2. Enable CDN/Edge Caching

### Cloudflare (Recommended)
```
# Page Rules
*.overx.ai/*
- Cache Level: Cache Everything
- Edge Cache TTL: 2 hours
- Browser Cache TTL: 4 hours
```

### Vercel Edge Config
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "s-maxage=7200, stale-while-revalidate=3600"
        }
      ]
    }
  ]
}
```

## 3. Server Optimization

### PM2 Configuration (for VPS)
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'converter',
    script: 'node_modules/.bin/next',
    args: 'start -p 3003',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      NODE_OPTIONS: '--max-old-space-size=2048'
    },
    max_memory_restart: '1G',
    // Keep process warm
    min_uptime: '10s',
    max_restarts: 10,
    autorestart: true,
    cron_restart: '0 4 * * *'
  }]
}
```

### Nginx Optimizations
```nginx
# Add to nginx.conf

# Enable caching
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=nextjs_cache:10m max_size=1g inactive=2h use_temp_path=off;

server {
    # ... existing config ...
    
    # Keep connections alive
    keepalive_timeout 65;
    keepalive_requests 100;
    
    # Buffer optimizations
    client_body_buffer_size 128k;
    client_max_body_size 10m;
    client_header_buffer_size 1k;
    large_client_header_buffers 4 16k;
    
    # Timeouts
    send_timeout 60s;
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;
    
    # Cache static content aggressively
    location ~* \.(html|json)$ {
        proxy_pass http://localhost:3003;
        proxy_cache nextjs_cache;
        proxy_cache_valid 200 2h;
        proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
        proxy_cache_background_update on;
        proxy_cache_lock on;
        add_header X-Cache-Status $upstream_cache_status;
    }
    
    # Enable HTTP/2 Push
    location = / {
        proxy_pass http://localhost:3003;
        http2_push_preload on;
        add_header Link "</styles/globals.css>; rel=preload; as=style" always;
        add_header Link "</_next/static/chunks/main.js>; rel=preload; as=script" always;
    }
}

# Upstream keepalive
upstream nextjs_backend {
    server localhost:3003;
    keepalive 32;
}
```

## 4. Database/API Optimization

If the delay is from API calls:

### Add Redis Caching
```javascript
// redis-cache.js
const Redis = require('ioredis');
const redis = new Redis();

async function getCachedRates(base) {
  const cached = await redis.get(`rates:${base}`);
  if (cached) return JSON.parse(cached);
  
  const rates = await fetchRatesFromAPI(base);
  await redis.setex(`rates:${base}`, 7200, JSON.stringify(rates)); // 2 hour cache
  return rates;
}
```

## 5. Use Edge Functions

### Vercel Edge Functions
```javascript
// pages/api/rates/[base].js
export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const { base } = req.query;
  
  // Cached at edge for 2 hours
  return new Response(JSON.stringify(rates), {
    headers: {
      'content-type': 'application/json',
      'cache-control': 's-maxage=7200, stale-while-revalidate=3600',
    },
  });
}
```

## 6. Monitoring

Add performance monitoring:

```javascript
// pages/_app.tsx
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Log performance metrics
    if (typeof window !== 'undefined' && window.performance) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      const renderTime = perfData.domComplete - perfData.domLoading;
      
      console.log('Performance:', {
        pageLoadTime,
        connectTime,
        renderTime,
        ttfb: perfData.responseStart - perfData.navigationStart
      });
      
      // Send to analytics
      if (window.gtag) {
        window.gtag('event', 'page_timing', {
          page_load_time: pageLoadTime,
          server_response_time: connectTime
        });
      }
    }
  }, []);
  
  return <Component {...pageProps} />;
}
```

## Quick Wins

1. **Enable Cloudflare** - Free CDN with edge caching
2. **Use Static Generation** - `next export` for static HTML
3. **Warm Lambda/Container** - Use cron to prevent cold starts
4. **Preconnect to API** - Add to document head:
   ```html
   <link rel="preconnect" href="https://api.overx.ai">
   <link rel="dns-prefetch" href="https://api.overx.ai">
   ```