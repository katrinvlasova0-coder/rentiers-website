export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID

export function isFbPixelEnabled(): boolean {
  return Boolean(FB_PIXEL_ID)
}

export const pageview = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView')
  }
}

export const event = (name: string, options?: object) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', name, options)
  }
}

export const customEvent = (name: string, options?: object) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', name, options)
  }
}

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void
    _fbq: unknown
  }
}
