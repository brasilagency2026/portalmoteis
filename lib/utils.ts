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

export function buildMotelPath(name: string, id: string) {
  const slug = slugify(name)
  return `/motel/${slug}-${id}`
}

export function extractMotelId(param: string) {
  const uuidMatch = param.match(/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
  if (uuidMatch) return uuidMatch[0]

  if (param.includes('-')) {
    return param.split('-').pop() || param
  }

  return param
}
