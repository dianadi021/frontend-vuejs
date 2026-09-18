import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios'
import Cookies from 'js-cookie'

export interface ApiErrorResponse {
  message?: string
  errors?: Record<string, string[]>
  [key: string]: unknown
}

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 15000,
  withCredentials: true, // Needed for Laravel Sanctum cookie authentication
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// Request interceptor: Attach Bearer token for Standalone / Token-based Auth
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token') || Cookies.get('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Auto-attach XSRF token for Laravel Sanctum if cookie exists
    const xsrfToken = Cookies.get('XSRF-TOKEN')
    if (xsrfToken && config.headers) {
      config.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken)
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// Response interceptor: Standardize responses and handle common Laravel / HTTP status codes
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error: AxiosError<ApiErrorResponse>) => {
    const status = error.response?.status

    switch (status) {
      case 401:
        // Unauthorized: token expired or unauthenticated
        localStorage.removeItem('token')
        Cookies.remove('token')
        break
      case 419:
        // CSRF Token Mismatch (Laravel Sanctum / Session expired)
        console.warn('CSRF token mismatch (419). Silakan refresh CSRF cookie atau login ulang.')
        break
      case 422:
        // Laravel Validation Errors
        break
      case 403:
        console.warn('Akses ditolak (403 Forbidden).')
        break
      case 500:
        console.error('Terjadi kesalahan pada server (500 Internal Server Error).')
        break
    }

    return Promise.reject(error)
  },
)

/**
 * Fetch CSRF cookie from Laravel Sanctum (essential when using Laravel 12 SPA auth)
 */
export async function getCsrfCookie(): Promise<void> {
  const csrfEndpoint =
    import.meta.env.VITE_SANCTUM_CSRF_URL ||
    (import.meta.env.VITE_API_BASE_URL
      ? `${import.meta.env.VITE_API_BASE_URL.replace(/\/api\/?$/, '')}/sanctum/csrf-cookie`
      : '/sanctum/csrf-cookie')

  await axios.get(csrfEndpoint, { withCredentials: true })
}

/**
 * Helper to extract validation error messages from Laravel 422 responses
 */
export function extractValidationErrors(error: unknown): string[] {
  if (axios.isAxiosError(error) && error.response?.data?.errors) {
    const errMap = error.response.data.errors as Record<string, string[]>
    return Object.values(errMap).flat()
  }
  return []
}

export default api
