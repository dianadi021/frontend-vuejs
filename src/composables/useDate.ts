import {
  getCurrDateTimeNow,
  convertDateTime,
  formatRelativeTime,
  isDateBetween,
} from '@/utils/date'

export function useDate() {
  return {
    getCurrDateTimeNow,
    convertDateTime,
    formatRelativeTime,
    isDateBetween,
    // Modern aliases
    now: getCurrDateTimeNow,
    format: convertDateTime,
    fromNow: formatRelativeTime,
  }
}

export default useDate
