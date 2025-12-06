'use client'

import { useState, useEffect } from 'react'
import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export default function SanityStudio() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div 
        suppressHydrationWarning 
        style={{ height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        Loading Studio...
      </div>
    )
  }

  return (
    <div suppressHydrationWarning>
      <NextStudio config={config} />
    </div>
  )
}