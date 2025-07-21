import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function APIsPage() {
  const router = useRouter()
  
  useEffect(() => {
    router.replace('/sources')
  }, [router])
  
  return null
}