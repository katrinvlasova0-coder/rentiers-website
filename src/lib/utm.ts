const UTM_STORAGE_KEY = 'rentiers_utm'
const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'fbclid',
  'gclid',
] as const

export type UtmKey = (typeof UTM_KEYS)[number]
export type UtmParams = Partial<Record<UtmKey, string>>

function readStored(): UtmParams {
  if (typeof window === 'undefined') return {}
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as UtmParams
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function writeStored(params: UtmParams): void {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(params))
  } catch {
    // ignore quota / private mode
  }
}

function fromSearch(search: string): UtmParams {
  const query = new URLSearchParams(search.startsWith('?') ? search : `?${search}`)
  const next: UtmParams = {}
  for (const key of UTM_KEYS) {
    const value = query.get(key)?.trim()
    if (value) next[key] = value
  }
  return next
}

/** Capture UTMs from the current URL into sessionStorage (last-touch within the visit). */
export function captureUtms(search?: string): UtmParams {
  if (typeof window === 'undefined') return {}
  const fromUrl = fromSearch(search ?? window.location.search)
  if (Object.keys(fromUrl).length === 0) return readStored()

  const merged = { ...readStored(), ...fromUrl }
  writeStored(merged)
  return merged
}

export function getUtms(): UtmParams {
  if (typeof window === 'undefined') return {}
  // Prefer any UTMs still on the URL, then fall back to session.
  return captureUtms()
}

export function formatUtms(params: UtmParams = getUtms()): string {
  return UTM_KEYS.filter((key) => params[key])
    .map((key) => `${key}=${params[key]}`)
    .join('&')
}

export function hasUtms(params: UtmParams = getUtms()): boolean {
  return UTM_KEYS.some((key) => Boolean(params[key]))
}
