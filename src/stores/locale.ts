import { defineStore } from 'pinia'

export type AppLocale = 'id' | 'en'

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    locale: 'id' as AppLocale,
  }),

  actions: {
    setLocale(locale: AppLocale) {
      this.locale = locale
    },
    toggleLocale() {
      this.locale = this.locale === 'id' ? 'en' : 'id'
    },
  },

  persist: true,
})
