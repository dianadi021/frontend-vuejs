<script setup lang="ts">
import { ref, computed } from 'vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel, Switch } from '@headlessui/vue'
import {
  Sparkles,
  Palette,
  Bell,
  Table,
  Sliders,
  Zap,
  Calendar,
  ShieldCheck,
  Check,
  AlertCircle,
  Copy,
  CheckCircle2,
  Moon,
  Sun,
  Globe,
  Wifi,
  WifiOff,
  Send,
  Loader2,
} from '@lucide/vue'
import { useClipboard, useDark, useToggle, useWindowSize, useOnline } from '@vueuse/core'
import { AgGridVue } from 'ag-grid-vue3'
import { ModuleRegistry, AllCommunityModule, type ColDef } from 'ag-grid-community'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper/modules'
import { z } from 'zod'

import useNotify from '@/composables/useNotify'
import useDate from '@/composables/useDate'
import { useLocaleStore } from '@/stores/locale'
import { cn } from '@/utils/cn'
import { csrLoader } from '@/composables/wrapper'

// AG Grid CSS & Module Registration
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

// Swiper CSS
import 'swiper/css'
import 'swiper/css/pagination'

ModuleRegistry.registerModules([AllCommunityModule])

// --- 1. Notification Helpers ---
const { toast, alert, loading, confirm } = useNotify()
const lastConfirmResult = ref<string | null>(null)

const triggerSuccessAlert = () =>
  alert.success('Berhasil!', 'Operasi berhasil dieksekusi dengan aman.')
const triggerErrorAlert = () => alert.error('Gagal!', 'Terjadi kesalahan saat memproses data.')
const triggerWarningAlert = () =>
  alert.warning('Perhatian!', 'Pastikan parameter telah sesuai sebelum lanjut.')
const triggerInfoAlert = () => alert.info('Informasi', 'Ini adalah dialog notifikasi informasi.')
const triggerToastAlert = () => alert.toast('Pesan tersimpan ke draft!', 'success', 2500)

const triggerConfirmDialog = async () => {
  const isConfirmed = await confirm(
    'Konfirmasi Tindakan',
    'Apakah Anda yakin ingin memproses aksi ini?',
    'Ya, Lanjutkan',
    'Batal',
  )
  lastConfirmResult.value = isConfirmed ? 'Dikonfirmasi (True)' : 'Dibatalkan (False)'
}

const triggerLoadingModal = () => {
  loading.show('Menghubungkan ke server backend...')
  setTimeout(() => {
    loading.hide()
    toast.success('Koneksi berhasil diselesaikan!')
  }, 1800)
}

// --- 2. VueUse Composables ---
const textToCopy = ref('https://github.com/wannacry021/skuad-template')
const { copy, copied } = useClipboard({ source: textToCopy })
const isDark = useDark()
const toggleDark = useToggle(isDark)
const { width, height } = useWindowSize()
const isOnline = useOnline()

// --- 3. Date & Pinia Locale ---
const { getCurrDateTimeNow, formatRelativeTime } = useDate()
const localeStore = useLocaleStore()
const samplePastDate = ref(new Date(Date.now() - 1000 * 60 * 45).toISOString()) // 45 minutes ago

// --- 4. Headless UI Switch Demo ---
const switchEnabled = ref(true)

// --- 5. AG Grid Demo Setup ---
interface UserRow {
  id: number
  name: string
  email: string
  role: string
  status: 'Active' | 'Pending' | 'Inactive'
  joined: string
}

const gridColumns = ref<ColDef<UserRow>[]>([
  { field: 'id', headerName: 'ID', width: 80, sortable: true },
  { field: 'name', headerName: 'Nama Lengkap', flex: 1, sortable: true, filter: true },
  { field: 'email', headerName: 'Email', flex: 1, sortable: true, filter: true },
  { field: 'role', headerName: 'Role', width: 140, sortable: true },
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
    cellRenderer: (params: { value: string }) => {
      const colorClass =
        params.value === 'Active'
          ? 'bg-success/20 text-success'
          : params.value === 'Pending'
            ? 'bg-warning/20 text-warning'
            : 'bg-danger/20 text-danger'
      return `<span class="px-2 py-0.5 rounded text-xs font-semibold ${colorClass}">${params.value}</span>`
    },
  },
  { field: 'joined', headerName: 'Bergabung', width: 140 },
])

const gridRows = ref<UserRow[]>([
  {
    id: 1,
    name: 'Dian Adi Nugroho',
    email: 'dian@skuad.id',
    role: 'Full Stack Dev',
    status: 'Active',
    joined: '2024-01-10',
  },
  {
    id: 2,
    name: 'Budi Santoso',
    email: 'budi@example.com',
    role: 'Frontend Engineer',
    status: 'Active',
    joined: '2024-02-15',
  },
  {
    id: 3,
    name: 'Siti Aminah',
    email: 'siti@example.com',
    role: 'UI/UX Designer',
    status: 'Pending',
    joined: '2024-03-01',
  },
  {
    id: 4,
    name: 'Rizky Pratama',
    email: 'rizky@example.com',
    role: 'Backend Dev (Laravel)',
    status: 'Active',
    joined: '2024-03-20',
  },
  {
    id: 5,
    name: 'Dewi Lestari',
    email: 'dewi@example.com',
    role: 'Quality Assurance',
    status: 'Inactive',
    joined: '2024-04-05',
  },
])

// --- 6. Swiper Setup ---
const swiperModules = [Pagination, Autoplay]
const slides = [
  {
    title: 'Vue 3 & TypeScript 6',
    desc: 'Pengembangan frontend modern dengan full strict typing, Composition API, dan reaktivitas instan.',
    badge: 'Core Engine',
    color: 'from-blue-600 to-indigo-600',
  },
  {
    title: 'Laravel 12 API Ready',
    desc: 'Integrasi lancar dengan Laravel Sanctum SPA Cookie Auth, auto CSRF token, dan auto validator extractor.',
    badge: 'Backend Integration',
    color: 'from-red-600 to-rose-600',
  },
  {
    title: 'Tailwind CSS + Bootstrap Colors',
    desc: 'Fleksibilitas utilitas Tailwind dengan palet warna terstandarisasi Bootstrap 5 lengkap.',
    badge: 'Styling',
    color: 'from-emerald-600 to-teal-600',
  },
  {
    title: 'Enterprise Ready Ecosystem',
    desc: 'AG Grid, Pinia PersistedState, Headless UI, Swiper, SweetAlert2, dan VueUse dalam 1 template.',
    badge: 'Ecosystem',
    color: 'from-amber-600 to-orange-600',
  },
]

// --- 7. Zod Form Validation Demo ---
const userSchema = z.object({
  fullName: z.string().min(3, 'Nama minimal 3 karakter'),
  emailAddress: z.string().email('Format email tidak valid'),
  age: z.number().min(18, 'Minimal umur 18 tahun'),
})

const formData = ref({
  fullName: '',
  emailAddress: '',
  age: 20,
})

const formErrors = ref<Record<string, string>>({})
const formSubmitted = ref(false)

const handleValidateForm = () => {
  formSubmitted.value = true
  formErrors.value = {}

  const result = userSchema.safeParse(formData.value)
  if (!result.success) {
    result.error.issues.forEach((err) => {
      const field = err.path[0] as string
      formErrors.value[field] = err.message
    })
    toast.error('Terdapat data formulir yang tidak valid!')
  } else {
    toast.success('Validasi Zod berhasil! Data siap dikirim.')
    alert.success('Formulir Valid!', JSON.stringify(result.data, null, 2))
  }
}

// --- 8. CSR Loader Demo ---
const isCallingApi = ref(false)
const testCsrLoader = async () => {
  isCallingApi.value = true
  try {
    toast.info('Menjalankan csrLoader...')
    // Simulasi request get
    await csrLoader('https://jsonplaceholder.typicode.com/posts/1', {
      loadingMessage: 'Mengambil data dari API publik...',
    })
    toast.success('Data berhasil di-load via csrLoader!')
  } catch (err: any) {
    toast.error('Request selesai atau dialihkan.')
  } finally {
    isCallingApi.value = false
  }
}

// Tabs metadata
const tabList = [
  { name: 'Palet Warna & UI', icon: Palette },
  { name: 'Notifikasi & Modal', icon: Bell },
  { name: 'AG Grid (Tabel)', icon: Table },
  { name: 'Swiper (Slider)', icon: Sliders },
  { name: 'VueUse & Device', icon: Zap },
  { name: 'Tanggal & Locale', icon: Calendar },
  { name: 'Zod & CSR Loader', icon: ShieldCheck },
]
</script>

<template>
  <div class="py-4 space-y-8 max-w-6xl mx-auto">
    <!-- Header Showcase -->
    <div
      class="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 rounded-2xl border border-primary/20"
    >
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white mb-2"
          >
            <Sparkles class="w-3.5 h-3.5" />
            Template Showcase
          </div>
          <h1
            class="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white"
          >
            Fitur & Ekosistem Terpasang
          </h1>
          <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Halaman ini mendemonstrasikan secara interaktif seluruh package library yang telah
            dikonfigurasi pada template.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <!-- Dark Mode Toggle Button -->
          <button
            @click="toggleDark()"
            class="px-3.5 py-2 rounded-xl text-xs font-medium border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 flex items-center gap-2 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <Sun v-if="isDark" class="w-4 h-4 text-warning" />
            <Moon v-else class="w-4 h-4 text-gray-500" />
            <span>{{ isDark ? 'Mode Terang' : 'Mode Gelap' }}</span>
          </button>

          <!-- Locale Switcher Button -->
          <button
            @click="localeStore.toggleLocale()"
            class="px-3.5 py-2 rounded-xl text-xs font-medium border border-primary/30 bg-primary/10 text-primary flex items-center gap-2 shadow-sm hover:bg-primary/20 transition"
          >
            <Globe class="w-4 h-4" />
            <span
              >Locale: <strong>{{ localeStore.locale.toUpperCase() }}</strong></span
            >
          </button>
        </div>
      </div>
    </div>

    <!-- Tab Navigation with Headless UI -->
    <TabGroup>
      <TabList
        class="flex flex-wrap gap-2 p-1.5 bg-gray-100 dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-700"
      >
        <Tab v-for="tab in tabList" :key="tab.name" v-slot="{ selected }" as="template">
          <button
            :class="
              cn(
                'px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all flex items-center gap-2 outline-none',
                selected
                  ? 'bg-primary text-white shadow'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50',
              )
            "
          >
            <component :is="tab.icon" class="w-4 h-4" />
            <span>{{ tab.name }}</span>
          </button>
        </Tab>
      </TabList>

      <TabPanels class="mt-6">
        <!-- TAB 1: PALET WARNA TAILWIND & BOOTSTRAP UI -->
        <TabPanel class="space-y-6">
          <div
            class="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-6"
          >
            <div>
              <h2 class="text-lg font-bold text-gray-900 dark:text-white">
                Palet Warna Bootstrap untuk Tailwind CSS
              </h2>
              <p class="text-xs text-gray-500 mt-1">
                Dikonfigurasi di <code>tailwind.config.js</code> dengan warna standar Bootstrap 5
                dan variasi shade.
              </p>
            </div>

            <!-- Swatches Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
              <div class="p-3.5 rounded-xl bg-primary text-white shadow-sm">
                <span class="text-xs opacity-75 font-mono">primary</span>
                <p class="font-bold text-sm">#0d6efd</p>
                <span class="text-[10px] opacity-80">bg-primary</span>
              </div>
              <div class="p-3.5 rounded-xl bg-secondary text-white shadow-sm">
                <span class="text-xs opacity-75 font-mono">secondary</span>
                <p class="font-bold text-sm">#6c757d</p>
                <span class="text-[10px] opacity-80">bg-secondary</span>
              </div>
              <div
                class="p-3.5 rounded-xl bg-secondary-black text-white shadow-sm border border-gray-700"
              >
                <span class="text-xs opacity-75 font-mono">secondary-black</span>
                <p class="font-bold text-sm">#1a1e21</p>
                <span class="text-[10px] opacity-80">bg-secondary-black</span>
              </div>
              <div
                class="p-3.5 rounded-xl bg-secondary-white text-gray-800 shadow-sm border border-gray-300"
              >
                <span class="text-xs opacity-75 font-mono">secondary-white</span>
                <p class="font-bold text-sm">#f8f9fa</p>
                <span class="text-[10px] opacity-80">bg-secondary-white</span>
              </div>
              <div class="p-3.5 rounded-xl bg-warning text-gray-900 shadow-sm">
                <span class="text-xs opacity-75 font-mono">warning</span>
                <p class="font-bold text-sm">#ffc107</p>
                <span class="text-[10px] opacity-80">bg-warning</span>
              </div>
              <div class="p-3.5 rounded-xl bg-danger text-white shadow-sm">
                <span class="text-xs opacity-75 font-mono">danger</span>
                <p class="font-bold text-sm">#dc3545</p>
                <span class="text-[10px] opacity-80">bg-danger</span>
              </div>
              <div class="p-3.5 rounded-xl bg-info text-white shadow-sm">
                <span class="text-xs opacity-75 font-mono">info</span>
                <p class="font-bold text-sm">#0dcaf0</p>
                <span class="text-[10px] opacity-80">bg-info</span>
              </div>
              <div class="p-3.5 rounded-xl bg-success text-white shadow-sm">
                <span class="text-xs opacity-75 font-mono">success</span>
                <p class="font-bold text-sm">#198754</p>
                <span class="text-[10px] opacity-80">bg-success</span>
              </div>
              <div class="p-3.5 rounded-xl bg-light text-gray-800 shadow-sm border border-gray-300">
                <span class="text-xs opacity-75 font-mono">light</span>
                <p class="font-bold text-sm">#f8f9fa</p>
                <span class="text-[10px] opacity-80">bg-light</span>
              </div>
              <div class="p-3.5 rounded-xl bg-dark text-white shadow-sm">
                <span class="text-xs opacity-75 font-mono">dark</span>
                <p class="font-bold text-sm">#212529</p>
                <span class="text-[10px] opacity-80">bg-dark</span>
              </div>
            </div>

            <!-- UI Elements Showcase -->
            <div class="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
              <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Komponen Tombol (Buttons)
              </h3>
              <div class="flex flex-wrap gap-2.5">
                <button
                  class="px-4 py-2 rounded-lg bg-primary hover:bg-primary-600 text-white text-xs font-semibold shadow-sm transition"
                >
                  Primary Button
                </button>
                <button
                  class="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary-600 text-white text-xs font-semibold shadow-sm transition"
                >
                  Secondary Button
                </button>
                <button
                  class="px-4 py-2 rounded-lg bg-success hover:bg-success-600 text-white text-xs font-semibold shadow-sm transition"
                >
                  Success Button
                </button>
                <button
                  class="px-4 py-2 rounded-lg bg-danger hover:bg-danger-600 text-white text-xs font-semibold shadow-sm transition"
                >
                  Danger Button
                </button>
                <button
                  class="px-4 py-2 rounded-lg bg-warning hover:bg-warning-600 text-gray-900 text-xs font-semibold shadow-sm transition"
                >
                  Warning Button
                </button>
                <button
                  class="px-4 py-2 rounded-lg bg-info hover:bg-info-600 text-white text-xs font-semibold shadow-sm transition"
                >
                  Info Button
                </button>
                <button
                  class="px-4 py-2 rounded-lg bg-secondary-black hover:bg-black text-white text-xs font-semibold shadow-sm transition"
                >
                  Secondary Black
                </button>
              </div>

              <!-- Headless UI Switch Demo -->
              <div
                class="pt-4 flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl"
              >
                <div>
                  <h4 class="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Headless UI Switch Component
                  </h4>
                  <p class="text-xs text-gray-500">
                    Toggle switch yang dapat di-bind reaktif dengan styling Tailwind.
                  </p>
                </div>
                <Switch
                  v-model="switchEnabled"
                  :class="switchEnabled ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'"
                  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
                >
                  <span
                    :class="switchEnabled ? 'translate-x-6' : 'translate-x-1'"
                    class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  />
                </Switch>
              </div>
            </div>
          </div>
        </TabPanel>

        <!-- TAB 2: NOTIFIKASI & SWEETALERT -->
        <TabPanel class="space-y-6">
          <div
            class="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-6"
          >
            <div>
              <h2 class="text-lg font-bold text-gray-900 dark:text-white">
                SweetAlert2 & Vue-Toastification
              </h2>
              <p class="text-xs text-gray-500 mt-1">
                Notifikasi pop-up dialog dan toast responsif melalui <code>useNotify()</code>.
              </p>
            </div>

            <!-- SweetAlert Triggers -->
            <div class="space-y-3">
              <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">
                SweetAlert Dialog
              </h3>
              <div class="flex flex-wrap gap-2.5">
                <button
                  @click="triggerSuccessAlert"
                  class="px-4 py-2 rounded-lg bg-success text-white text-xs font-semibold shadow-sm hover:opacity-90 transition"
                >
                  Success Dialog
                </button>
                <button
                  @click="triggerErrorAlert"
                  class="px-4 py-2 rounded-lg bg-danger text-white text-xs font-semibold shadow-sm hover:opacity-90 transition"
                >
                  Error Dialog
                </button>
                <button
                  @click="triggerWarningAlert"
                  class="px-4 py-2 rounded-lg bg-warning text-gray-900 text-xs font-semibold shadow-sm hover:opacity-90 transition"
                >
                  Warning Dialog
                </button>
                <button
                  @click="triggerInfoAlert"
                  class="px-4 py-2 rounded-lg bg-info text-white text-xs font-semibold shadow-sm hover:opacity-90 transition"
                >
                  Info Dialog
                </button>
                <button
                  @click="triggerConfirmDialog"
                  class="px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold shadow-sm hover:opacity-90 transition"
                >
                  Confirm Modal
                </button>
                <button
                  @click="triggerLoadingModal"
                  class="px-4 py-2 rounded-lg bg-secondary-black text-white text-xs font-semibold shadow-sm hover:opacity-90 transition"
                >
                  Loading Screen
                </button>
                <button
                  @click="triggerToastAlert"
                  class="px-4 py-2 rounded-lg bg-secondary text-white text-xs font-semibold shadow-sm hover:opacity-90 transition"
                >
                  Swal Toast
                </button>
              </div>

              <div
                v-if="lastConfirmResult"
                class="p-3 bg-gray-50 dark:bg-gray-900/60 rounded-lg text-xs"
              >
                Hasil Konfirmasi Terakhir: <strong>{{ lastConfirmResult }}</strong>
              </div>
            </div>

            <!-- Vue-Toastification Triggers -->
            <div class="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
              <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Vue-Toastification (Toast Notifications)
              </h3>
              <div class="flex flex-wrap gap-2.5">
                <button
                  @click="toast.success('Toast: Berhasil disimpan!')"
                  class="px-3.5 py-1.5 rounded-lg border border-success text-success text-xs font-medium hover:bg-success hover:text-white transition"
                >
                  Toast Success
                </button>
                <button
                  @click="toast.error('Toast: Terjadi galat!')"
                  class="px-3.5 py-1.5 rounded-lg border border-danger text-danger text-xs font-medium hover:bg-danger hover:text-white transition"
                >
                  Toast Error
                </button>
                <button
                  @click="toast.info('Toast: Pemberitahuan sistem.')"
                  class="px-3.5 py-1.5 rounded-lg border border-info text-info text-xs font-medium hover:bg-info hover:text-white transition"
                >
                  Toast Info
                </button>
                <button
                  @click="toast.warning('Toast: Perhatian!')"
                  class="px-3.5 py-1.5 rounded-lg border border-warning text-warning text-xs font-medium hover:bg-warning hover:text-white transition"
                >
                  Toast Warning
                </button>
              </div>
            </div>
          </div>
        </TabPanel>

        <!-- TAB 3: AG GRID (DATA TABLE) -->
        <TabPanel class="space-y-6">
          <div
            class="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4"
          >
            <div>
              <h2 class="text-lg font-bold text-gray-900 dark:text-white">
                AG Grid Vue 3 (Enterprise Grid)
              </h2>
              <p class="text-xs text-gray-500 mt-1">
                Tabel interaktif dengan fitur sorting, filtering, dan kustom cell-renderer status.
              </p>
            </div>

            <!-- AG Grid Component Container -->
            <div
              class="ag-theme-quartz w-full"
              :class="{ 'ag-theme-quartz-dark': isDark }"
              style="height: 320px"
            >
              <AgGridVue
                style="width: 100%; height: 100%"
                :columnDefs="gridColumns"
                :rowData="gridRows"
                :pagination="true"
                :paginationPageSize="5"
                class="rounded-xl overflow-hidden"
              />
            </div>
          </div>
        </TabPanel>

        <!-- TAB 4: SWIPER (CAROUSEL) -->
        <TabPanel class="space-y-6">
          <div
            class="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4"
          >
            <div>
              <h2 class="text-lg font-bold text-gray-900 dark:text-white">
                Swiper Carousel Slider
              </h2>
              <p class="text-xs text-gray-500 mt-1">
                Slider modern dengan pagination dan animasi touch-friendly.
              </p>
            </div>

            <Swiper
              :modules="swiperModules"
              :pagination="{ clickable: true }"
              :autoplay="{ delay: 3500, disableOnInteraction: false }"
              :space-between="20"
              class="w-full pb-10"
            >
              <SwiperSlide v-for="(slide, idx) in slides" :key="idx">
                <div
                  :class="`p-8 rounded-2xl bg-gradient-to-br ${slide.color} text-white shadow-lg space-y-3 min-h-[180px] flex flex-col justify-center`"
                >
                  <span
                    class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 w-max"
                  >
                    {{ slide.badge }}
                  </span>
                  <h3 class="text-xl sm:text-2xl font-extrabold">{{ slide.title }}</h3>
                  <p class="text-sm text-white/90 max-w-xl">{{ slide.desc }}</p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </TabPanel>

        <!-- TAB 5: VUEUSE & UTILITIES -->
        <TabPanel class="space-y-6">
          <div
            class="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-6"
          >
            <div>
              <h2 class="text-lg font-bold text-gray-900 dark:text-white">
                @vueuse/core Composables
              </h2>
              <p class="text-xs text-gray-500 mt-1">
                Reaktifitas perangkat, clipboard, dan status jaringan secara otomatis.
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <!-- Clipboard Demo -->
              <div
                class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 space-y-3"
              >
                <div class="flex items-center gap-2 text-primary">
                  <Copy class="w-4 h-4" />
                  <h3 class="text-sm font-semibold">useClipboard()</h3>
                </div>
                <input
                  v-model="textToCopy"
                  class="w-full px-3 py-1.5 text-xs rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <button
                  @click="copy(textToCopy)"
                  class="w-full py-1.5 rounded-lg bg-primary hover:bg-primary-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <Check v-if="copied" class="w-3.5 h-3.5" />
                  <Copy v-else class="w-3.5 h-3.5" />
                  <span>{{ copied ? 'Berhasil Disalin!' : 'Salin ke Clipboard' }}</span>
                </button>
              </div>

              <!-- Window Size Demo -->
              <div
                class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 space-y-3"
              >
                <div class="flex items-center gap-2 text-success">
                  <Sliders class="w-4 h-4" />
                  <h3 class="text-sm font-semibold">useWindowSize()</h3>
                </div>
                <p class="text-xs text-gray-500">Mendeteksi dimensi layar aktif secara reaktif.</p>
                <div
                  class="p-2.5 rounded-lg bg-white dark:bg-gray-800 text-xs font-mono font-semibold text-center border border-gray-200 dark:border-gray-700"
                >
                  {{ width }}px × {{ height }}px
                </div>
              </div>

              <!-- Network Online Status -->
              <div
                class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 space-y-3"
              >
                <div
                  class="flex items-center gap-2"
                  :class="isOnline ? 'text-success' : 'text-danger'"
                >
                  <component :is="isOnline ? Wifi : WifiOff" class="w-4 h-4" />
                  <h3 class="text-sm font-semibold">useOnline()</h3>
                </div>
                <p class="text-xs text-gray-500">
                  Mendeteksi status konektivitas jaringan browser.
                </p>
                <div
                  :class="
                    cn(
                      'p-2 rounded-lg text-xs font-bold text-center flex items-center justify-center gap-2',
                      isOnline ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger',
                    )
                  "
                >
                  <span
                    class="w-2 h-2 rounded-full"
                    :class="isOnline ? 'bg-success animate-pulse' : 'bg-danger'"
                  />
                  <span>{{ isOnline ? 'Terhubung ke Internet' : 'Offline' }}</span>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        <!-- TAB 6: TANGGAL & LOCALE (DAYJS & PINIA) -->
        <TabPanel class="space-y-6">
          <div
            class="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-6"
          >
            <div>
              <h2 class="text-lg font-bold text-gray-900 dark:text-white">
                Day.js & Pinia Persisted Store
              </h2>
              <p class="text-xs text-gray-500 mt-1">
                Format tanggal multi-bahasa yang tersinkronisasi otomatis dengan pilihan bahasa di
                store.
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Current Time -->
              <div
                class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 space-y-2"
              >
                <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >Waktu Sekarang (Formatted)</span
                >
                <p class="text-base font-bold text-primary">
                  {{ getCurrDateTimeNow('dddd, DD MMMM YYYY - HH:mm:ss') }}
                </p>
                <p class="text-[11px] text-gray-500">
                  Format locale: <strong>{{ localeStore.locale }}</strong>
                </p>
              </div>

              <!-- Relative Time -->
              <div
                class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 space-y-2"
              >
                <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >Format Waktu Relatif (fromNow)</span
                >
                <p class="text-base font-bold text-success">
                  {{ formatRelativeTime(samplePastDate) }}
                </p>
                <p class="text-[11px] text-gray-500">Dihitung dari 45 menit yang lalu.</p>
              </div>
            </div>

            <div
              class="p-4 bg-primary/5 rounded-xl border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div>
                <h4 class="text-xs font-bold text-primary">Pinia PersistedState Test</h4>
                <p class="text-xs text-gray-600 dark:text-gray-300">
                  Pilihan locale saat ini disimpan di <code>localStorage</code> dan tetap ada saat
                  halaman di-refresh.
                </p>
              </div>
              <button
                @click="localeStore.toggleLocale()"
                class="px-3.5 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-600 transition"
              >
                Ganti Bahasa (Sekarang: {{ localeStore.locale.toUpperCase() }})
              </button>
            </div>
          </div>
        </TabPanel>

        <!-- TAB 7: ZOD VALIDATION & CSR LOADER -->
        <TabPanel class="space-y-6">
          <div
            class="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-6"
          >
            <div>
              <h2 class="text-lg font-bold text-gray-900 dark:text-white">
                Validasi Skema Zod & Universal CSR Loader
              </h2>
              <p class="text-xs text-gray-500 mt-1">
                Validasi tipe data otomatis pada form serta pengambilan data API dengan feedback
                loading.
              </p>
            </div>

            <!-- Form Validation -->
            <form @submit.prevent="handleValidateForm" class="space-y-4 max-w-lg">
              <div>
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"
                  >Nama Lengkap</label
                >
                <input
                  v-model="formData.fullName"
                  type="text"
                  placeholder="Contoh: Dian Nugroho"
                  class="w-full px-3.5 py-2 text-xs rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-1 focus:ring-primary focus:outline-none"
                />
                <span v-if="formErrors.fullName" class="text-[11px] text-danger mt-1 block">{{
                  formErrors.fullName
                }}</span>
              </div>

              <div>
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"
                  >Alamat Email</label
                >
                <input
                  v-model="formData.emailAddress"
                  type="text"
                  placeholder="Contoh: user@domain.com"
                  class="w-full px-3.5 py-2 text-xs rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-1 focus:ring-primary focus:outline-none"
                />
                <span v-if="formErrors.emailAddress" class="text-[11px] text-danger mt-1 block">{{
                  formErrors.emailAddress
                }}</span>
              </div>

              <div>
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"
                  >Umur (Tahun)</label
                >
                <input
                  v-model.number="formData.age"
                  type="number"
                  class="w-full px-3.5 py-2 text-xs rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-1 focus:ring-primary focus:outline-none"
                />
                <span v-if="formErrors.age" class="text-[11px] text-danger mt-1 block">{{
                  formErrors.age
                }}</span>
              </div>

              <div class="flex gap-3 pt-2">
                <button
                  type="submit"
                  class="px-4 py-2 rounded-lg bg-primary hover:bg-primary-600 text-white text-xs font-semibold transition"
                >
                  Uji Validasi Form (Zod)
                </button>
                <button
                  type="button"
                  @click="testCsrLoader"
                  :disabled="isCallingApi"
                  class="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary-600 text-white text-xs font-semibold transition flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Loader2 v-if="isCallingApi" class="w-3.5 h-3.5 animate-spin" />
                  <Send v-else class="w-3.5 h-3.5" />
                  <span>Uji csrLoader()</span>
                </button>
              </div>
            </form>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
