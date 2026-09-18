import {
  useSwal,
  useLoading,
  showSuccess,
  showError,
  showWarning,
  showInfo,
  showConfirm,
  showToast,
} from '@/utils/notification'
import { useToast as toastr } from 'vue-toastification'

export function useNotify() {
  const toast = toastr()
  const loading = useLoading()

  return {
    // Original methods
    useSwal,
    useLoading,
    toastr,

    // Friendly modern aliases
    toast,
    loading,
    confirm: showConfirm,
    alert: {
      success: showSuccess,
      error: showError,
      warning: showWarning,
      info: showInfo,
      toast: showToast,
    },
  }
}

export default useNotify
