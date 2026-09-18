import Swal, { type SweetAlertOptions, type SweetAlertIcon } from 'sweetalert2'

export function showSwal(options: SweetAlertOptions = {}) {
  return Swal.fire(options)
}

export function showLoading(message: string = 'Loading, Mohon tunggu...') {
  if (!Swal.isLoading()) {
    showSwal({
      html: message,
      allowOutsideClick: false,
      showCancelButton: false,
      showCloseButton: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading()
      },
    })
  }
}

export function hideLoading() {
  if (Swal.isLoading()) {
    Swal.hideLoading()
    Swal.close()
  }
}

export function showSuccess(title: string, text: string = '', options: SweetAlertOptions = {}) {
  return Swal.fire({
    icon: 'success',
    title,
    text,
    confirmButtonColor: '#198754',
    ...options,
  })
}

export function showError(title: string, text: string = '', options: SweetAlertOptions = {}) {
  return Swal.fire({
    icon: 'error',
    title,
    text,
    confirmButtonColor: '#dc3545',
    ...options,
  })
}

export function showWarning(title: string, text: string = '', options: SweetAlertOptions = {}) {
  return Swal.fire({
    icon: 'warning',
    title,
    text,
    confirmButtonColor: '#ffc107',
    ...options,
  })
}

export function showInfo(title: string, text: string = '', options: SweetAlertOptions = {}) {
  return Swal.fire({
    icon: 'info',
    title,
    text,
    confirmButtonColor: '#0dcaf0',
    ...options,
  })
}

export async function showConfirm(
  title: string,
  text: string = '',
  confirmButtonText: string = 'Ya, Lanjutkan',
  cancelButtonText: string = 'Batal',
  options: SweetAlertOptions = {},
): Promise<boolean> {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#0d6efd',
    cancelButtonColor: '#6c757d',
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true,
    ...options,
  })

  return result.isConfirmed
}

export function showToast(title: string, icon: SweetAlertIcon = 'success', timer: number = 3000) {
  return Swal.fire({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer,
    timerProgressBar: true,
    icon,
    title,
  })
}

export default {
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
