import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function CVRedirect() {
  const router = useRouter()
  
  useEffect(() => {
    // In production, this would redirect to cv.overx.ai
    // In development, redirect to localhost:3002
    const cvUrl = process.env.NODE_ENV === 'production' 
      ? 'https://cv.overx.ai' 
      : 'http://localhost:3002'
    
    window.location.href = cvUrl
  }, [])
  
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Redirecting...</title>
      </Head>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1>Redirecting to CV...</h1>
          <p>If you're not redirected, <a href="http://localhost:3002">click here</a></p>
        </div>
      </div>
    </>
  )
}