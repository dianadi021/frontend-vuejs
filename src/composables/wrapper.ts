import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import api, { extractValidationErrors, type ApiErrorResponse } from '@/services/api'
import { showLoading, hideLoading, showSwal } from '@/plugins/sweetalert'

export interface CsrLoaderOptions extends AxiosRequestConfig {
  loadingMessage?: string
  showErrorAlert?: boolean
}

/**
 * Universal CSR Loader for handling async HTTP requests with automatic loading indicators
 * and friendly error alerts (compatible with both Laravel 12 and standalone setups).
 */
export async function csrLoader<T = unknown>(
  url: string,
  timeoutOrOptions: number | CsrLoaderOptions = 15000,
): Promise<AxiosResponse<T>> {
  const options: CsrLoaderOptions =
    typeof timeoutOrOptions === 'number'
      ? { timeout: timeoutOrOptions }
      : { timeout: 15000, ...timeoutOrOptions }

  const loadingMsg = options.loadingMessage || 'Loading, Mohon tunggu...'
  const showAlert = options.showErrorAlert !== false

  try {
    showLoading(loadingMsg)
    return await api.get<T>(url, options)
  } catch (error) {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
        if (showAlert) {
          showSwal({
            title: 'Request Timeout',
            text: `Request ke ${url} timeout setelah ${options.timeout}ms`,
            icon: 'warning',
            confirmButtonColor: '#ffc107',
            timer: 3000,
          })
        }
      } else if (error.response?.status === 422 && showAlert) {
        const errors = extractValidationErrors(error)
        showSwal({
          title: 'Validasi Gagal',
          text:
            errors.join('\n') ||
            error.response.data?.message ||
            'Data yang dimasukkan tidak valid.',
          icon: 'error',
          confirmButtonColor: '#dc3545',
        })
      } else if (error.response?.status === 401 && showAlert) {
        showSwal({
          title: 'Sesi Berakhir',
          text: 'Silakan login kembali untuk melanjutkan.',
          icon: 'warning',
          confirmButtonColor: '#ffc107',
        })
      }
    }

    throw error
  } finally {
    hideLoading()
  }
}

export default csrLoader
