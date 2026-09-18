import {
  showSwal,
  showLoading,
  hideLoading,
  showSuccess,
  showError,
  showWarning,
  showInfo,
  showConfirm,
  showToast,
} from '@/plugins/sweetalert'
import type { SweetAlertOptions } from 'sweetalert2'

export function useSwal(options: SweetAlertOptions = {}) {
  return showSwal(options)
}

export function useLoading() {
  function show(message?: string) {
    showLoading(message)
  }

  function hide() {
    hideLoading()
  }

  return { show, hide }
}

export {
  showSwal,
  showLoading,
  hideLoading,
  showSuccess,
  showError,
  showWarning,
  showInfo,
  showConfirm,
  showToast,
}

export default {
  useSwal,
  useLoading,
  showSwal,
  showLoading,
  hideLoading,
  showSuccess,
  showError,
  showWarning,
  showInfo,
  showConfirm,
  showToast,
}
