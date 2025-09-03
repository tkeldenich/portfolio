import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get the correct image path for both development and production (GitHub Pages)
 * In production with basePath '/portfolio', images need to be prefixed
 */
export function getImagePath(imagePath: string): string {
  const isProd = process.env.NODE_ENV === 'production'
  const basePath = isProd ? '/portfolio' : ''
  return `${basePath}${imagePath}`
}
