'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { isFbPixelEnabled, pageview } from '@/lib/fbpixel'

export default function FacebookPixelTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isFirstLoad = useRef(true)

  useEffect(() => {
    if (!isFbPixelEnabled()) return
    // Initial PageView is fired by the base pixel script — skip duplicate.
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return
    }
    pageview()
  }, [pathname, searchParams])

  return null
}
