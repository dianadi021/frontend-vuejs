/**
 * Standard API response interfaces (compatible with Laravel 12 API resources and Standalone SPAs)
 */

export interface ApiResponse<T = unknown> {
  data: T
  message?: string
  status?: string | number
  success?: boolean
}

export interface PaginationLinks {
  first?: string
  last?: string
  prev?: string | null
  next?: string | null
}

export interface PaginationMeta {
  current_page: number
  from: number | null
  last_page: number
  path?: string
  per_page: number
  to: number | null
  total: number
}

export interface PaginatedResponse<T = unknown> {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
  from: number | null
  to: number | null
  links?: PaginationLinks
  meta?: PaginationMeta
}

export interface AppUser {
  id: number | string
  name: string
  email: string
  avatar?: string
  email_verified_at?: string | null
  created_at?: string
  updated_at?: string
  [key: string]: unknown
}
