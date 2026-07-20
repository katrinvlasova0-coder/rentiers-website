'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { captureUtms } from '@/lib/utm'

/** Persist UTM / click IDs from the landing URL across SPA navigation. */
export default function UtmCapture() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const search = searchParams?.toString()
    captureUtms(search ? `?${search}` : '')
  }, [pathname, searchParams])

  return null
}
