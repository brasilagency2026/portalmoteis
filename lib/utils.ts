import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const TARGET_ROUTE_SEGMENT_MAX = 65

function parseBase36ToBigInt(value: string) {
  let result = 0n
  const base = 36n

  for (const char of value.toLowerCase()) {
    const code = char.charCodeAt(0)
    let digit = -1

    if (code >= 48 && code <= 57) digit = code - 48
    if (code >= 97 && code <= 122) digit = code - 87

    if (digit < 0 || digit >= 36) return null
    result = result * base + BigInt(digit)
  }

  return result
}

function uuidToCompact(uuid: string) {
  if (!UUID_REGEX.test(uuid)) return uuid
  const hex = uuid.replace(/-/g, '').toLowerCase()
  const value = BigInt(`0x${hex}`)
  return value.toString(36)
}

function compactToUuid(value: string) {
  if (!/^[0-9a-z]+$/i.test(value)) return null

  const parsed = parseBase36ToBigInt(value)
  if (parsed === null) return null

  const hex = parsed.toString(16).padStart(32, '0')
  const uuid = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
  return UUID_REGEX.test(uuid) ? uuid : null
}

function extractAddressLocation(address?: string) {
  if (!address) return ''

  const raw = address.trim()
  if (!raw) return ''

  const partsByDash = raw.split('-').map((part) => part.trim()).filter(Boolean)
  const locationCandidate = partsByDash.length > 1 ? partsByDash[partsByDash.length - 1] : raw

  const partsByComma = locationCandidate.split(',').map((part) => part.trim()).filter(Boolean)
  const city = partsByComma[0] || ''
  const uf = partsByComma[1] || ''

  return [city, uf].filter(Boolean).join(' ')
}

function truncateSegment(segment: string, maxLength: number) {
  if (segment.length <= maxLength) return segment
  return segment.slice(0, maxLength).replace(/-+$/g, '')
}

export function buildMotelPath(name: string, id: string, address?: string) {
  const compactId = uuidToCompact(id)
  const maxSlugLength = Math.max(8, TARGET_ROUTE_SEGMENT_MAX - compactId.length - 1)

  let nameSlug = slugify(name) || 'motel'
  let locationSlug = slugify(extractAddressLocation(address))

  if (nameSlug.length > maxSlugLength) {
    nameSlug = truncateSegment(nameSlug, maxSlugLength)
    locationSlug = ''
  } else if (locationSlug) {
    const reserved = nameSlug.length + 1
    const remaining = maxSlugLength - reserved
    if (remaining <= 0) {
      locationSlug = ''
    } else {
      locationSlug = truncateSegment(locationSlug, remaining)
    }
  }

  const slug = locationSlug ? `${nameSlug}-${locationSlug}` : nameSlug
  return `/motel/${slug}-${compactId}`
}

export function extractMotelId(param: string) {
  const uuidMatch = param.match(/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
  if (uuidMatch) return uuidMatch[0]

  const token = param.includes('-') ? (param.split('-').pop() || param) : param
  const decodedUuid = compactToUuid(token)
  if (decodedUuid) return decodedUuid

  if (param.includes('-')) {
    return param.split('-').pop() || param
  }

  return param
}
