import dayjs from '@/plugins/days'
import { useLocaleStore } from '@/stores/locale'

function getCurrentLocale(): 'id' | 'en' {
  try {
    return useLocaleStore().locale || 'id'
  } catch {
    return 'id'
  }
}

export function getCurrDateTimeNow(format: string = 'YYYY-MM-DD HH:mm:ss'): string {
  return dayjs().locale(getCurrentLocale()).format(format)
}

export function convertDateTime(
  stringtime: string | Date | number,
  format: string = 'YYYY-MM-DD HH:mm:ss',
): string {
  if (!stringtime) return 'Invalid date'
  const d = dayjs(stringtime)
  if (!d.isValid()) return 'Invalid date'
  return d.locale(getCurrentLocale()).format(format)
}

export function formatRelativeTime(stringtime: string | Date | number): string {
  if (!stringtime) return ''
  const d = dayjs(stringtime)
  if (!d.isValid()) return ''
  return d.locale(getCurrentLocale()).fromNow()
}

export function isDateBetween(
  target: string | Date | number,
  start: string | Date | number,
  end: string | Date | number,
): boolean {
  return dayjs(target).isBetween(dayjs(start), dayjs(end))
}

export default {
  getCurrDateTimeNow,
  convertDateTime,
  formatRelativeTime,
  isDateBetween,
}
