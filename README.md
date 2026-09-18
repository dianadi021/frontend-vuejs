<h1 align="center">
  🚀 Vue 3 + TypeScript All-Around Frontend Starter
</h1>

<p align="center">
  Template boilerplate modern, scalable, dan type-safe menggunakan <strong>Vue 3 (Composition API), TypeScript, Tailwind CSS, dan Vite</strong>.
  Dirancang fleksibel sebagai <strong>Standalone Vue 3 SPA</strong> maupun terintegrasi dengan backend <strong>Laravel 12 (Sanctum SPA / RESTful API)</strong>.
</p>

<p align="center">
  <a href="https://vuejs.org/"><img src="https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vuedotjs&logoColor=white" alt="Vue" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://vite.dev/"><img src="https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white" alt="Vite" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://pinia.vuejs.org/"><img src="https://img.shields.io/badge/Pinia-4.x-FFE57F?logo=pinia&logoColor=black" alt="Pinia" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License" /></a>
</p>

---

## ✨ Fitur Utama

- ⚡ **Vite 8 & Vue 3.5:** Build super cepat dengan HMR instan dan modular chunk splitting.
- 🛡️ **Full Type Safety:** TypeScript 6.0 dengan konfigurasi strict mode dan deklarasi environment typed.
- 🔗 **Dual-Purpose Backend Ready:**
  - **Standalone SPA:** Siap konsumsi REST API umum dengan interceptor Bearer token.
  - **Laravel 12 Ready:** Konfigurasi bawaan untuk Laravel Sanctum cookie authentication, auto CSRF cookie handling (`/sanctum/csrf-cookie`), penanganan status `419` CSRF expire, dan parser error validasi `422`.
- 🎨 **Tailwind CSS + Skema Warna Bootstrap:** Utilitas Tailwind dengan format palet Bootstrap 5 (`primary`, `secondary`, `secondary-black`, `secondary-white`, `warning`, `danger`, `info`, `success`, `light`, `dark`).
- 📊 **Enterprise Data Table:** Terintegrasi dengan **AG Grid Vue 3** (`ag-grid-community` & `ag-grid-vue3`) bertema Quartz modern.
- 📦 **State Management Persisten:** Pinia terintegrasi dengan `pinia-plugin-persistedstate` agar data state (seperti token atau bahasa/locale) tidak hilang saat refresh browser.
- 🔔 **Notifikasi Lengkap:** Kombinasi **SweetAlert2** (dialog konfirmasi, popup, loading modal) dan **Vue-Toastification** (toast ringan di sudut layar).
- 📅 **Manipulasi Waktu Lanjutan:** Day.js diperluas dengan plugin `relativeTime`, `localizedFormat`, `isBetween`, `utc`, dan `timezone` dengan proteksi locale multi-bahasa (ID/EN).
- 🧩 **Ekosistem Tambahan:** `@vueuse/core`, `@headlessui/vue`, `swiper`, `zod`, `nprogress`, dan `@lucide/vue`.
- 🌟 **Interactive Showcase Dashboard:** Halaman terintegrasi di route `/about` untuk mendemonstrasikan seluruh fitur dan library secara langsung.

---

## 🛠️ Tech Stack & Dependencies

### 🧠 Core & State Management
| Package | Versi | Deskripsi | Dokumentasi |
| :--- | :--- | :--- | :--- |
| `vue` | `^3.5.40` | Framework JavaScript utama dengan Composition API | [vuejs.org](https://vuejs.org/) |
| `vue-router` | `^5.2.0` | Router resmi dengan `NProgress` navigation guard & dynamic title | [router.vuejs.org](https://router.vuejs.org/) |
| `pinia` | `^4.0.2` | State store terpusat dan reaktif | [pinia.vuejs.org](https://pinia.vuejs.org/) |
| `pinia-plugin-persistedstate` | `^4.7.1` | Persistensi otomatis state Pinia ke `localStorage`/`sessionStorage` | [prazdevs.github.io](https://prazdevs.github.io/pinia-plugin-persistedstate/) |

### 🎨 UI, Komponen & Ikon
| Package | Versi | Deskripsi | Dokumentasi |
| :--- | :--- | :--- | :--- |
| `tailwindcss` | `^3.4.19` | Framework CSS utility-first dengan palet Bootstrap | [tailwindcss.com](https://tailwindcss.com/) |
| `@headlessui/vue` | `^1.7.23` | Komponen UI unstyled yang accessible (Tab, Switch, Modal) | [headlessui.com](https://headlessui.com/) |
| `ag-grid-vue3` & `ag-grid-community` | `^36.2.0` | Data Grid kelas enterprise untuk visualisasi tabel data kompleks | [ag-grid.com](https://www.ag-grid.com/vue-data-grid/) |
| `swiper` | `^14.0.6` | Slider / carousel modern dan touch-friendly | [swiperjs.com](https://swiperjs.com/) |
| `sweetalert2` | `^11.26.25` | Modal alert, konfirmasi interaktif, dan loading screen | [sweetalert2.github.io](https://sweetalert2.github.io/) |
| `vue-toastification` | `2.0.0-rc.5` | Notifikasi toast ringan dan reaktif | [npmjs.com/vue-toastification](https://www.npmjs.com/package/vue-toastification) |
| `@lucide/vue` | `^1.52.0` | Kumpulan icon SVG modern dan tree-shakeable | [lucide.dev](https://lucide.dev/) |
| `@tailwindcss/forms` | `^0.5.11` | Reset styling standar form input & select Tailwind | [github.com/tailwindlabs/tailwindcss-forms](https://github.com/tailwindlabs/tailwindcss-forms) |
| `@tailwindcss/typography` | `^0.5.20` | Plugin styling typography/markdown (`prose`) | [tailwindcss.com/docs/typography-plugin](https://tailwindcss.com/docs/typography-plugin) |

### 🛠️ Utilitas & Networking
| Package | Versi | Deskripsi | Dokumentasi |
| :--- | :--- | :--- | :--- |
| `axios` | `^1.20.0` | HTTP client terpusat dengan dukungan Laravel Sanctum & token auth | [axios-http.com](https://axios-http.com/) |
| `@vueuse/core` | `^15.0.0` | Koleksi composable reaktif (clipboard, dark mode, window size, dll) | [vueuse.org](https://vueuse.org/) |
| `dayjs` | `^1.11.21` | Utilitas manipulasi tanggal dan waktu multi-bahasa | [day.js.org](https://day.js.org/) |
| `zod` | `^4.6.5` | Validasi skema form dan tipe data DTO | [zod.dev](https://zod.dev/) |
| `nprogress` | `^0.2.0` | Progress bar visual saat navigasi route | [ricostacruz.com/nprogress](https://ricostacruz.com/nprogress/) |
| `js-cookie` | `^3.0.8` | Parser dan manipulasi cookie browser | [github.com/js-cookie/js-cookie](https://github.com/js-cookie/js-cookie) |
| `clsx` & `tailwind-merge` | `^2.1.1` | Penggabung class CSS dinamis tanpa konflik | [github.com/lukeed/clsx](https://github.com/lukeed/clsx) |

---

## 🎨 Palet Warna Tailwind (Format Bootstrap)

Tersedia di [`tailwind.config.js`](tailwind.config.js):

| Warna | Default Hex | Contoh Class | Keterangan |
| :--- | :--- | :--- | :--- |
| `primary` | `#0d6efd` | `bg-primary`, `text-primary`, `border-primary-600` | Bootstrap Primary Blue |
| `secondary` | `#6c757d` | `bg-secondary`, `text-secondary`, `bg-secondary-500` | Bootstrap Secondary Gray |
| `secondary-black` | `#1a1e21` | `bg-secondary-black`, `text-secondary-black` | Bootstrap Secondary Black (`secondary_black`) |
| `secondary-white` | `#f8f9fa` | `bg-secondary-white`, `text-secondary-white` | Bootstrap Secondary White (`secondary_white`) |
| `warning` | `#ffc107` | `bg-warning`, `text-warning`, `border-warning-400` | Bootstrap Warning Yellow |
| `danger` | `#dc3545` | `bg-danger`, `text-danger`, `bg-danger-600` | Bootstrap Danger Red |
| `info` | `#0dcaf0` | `bg-info`, `text-info`, `border-info` | Bootstrap Info Cyan |
| `success` | `#198754` | `bg-success`, `text-success`, `bg-success-700` | Bootstrap Success Green |
| `light` | `#f8f9fa` | `bg-light`, `text-light` | Bootstrap Light Gray |
| `dark` | `#212529` | `bg-dark`, `text-dark` | Bootstrap Dark |

---

## 📂 Struktur Direktori

```text
frontend-vuejs/
├── public/                 # Aset statis publik
├── src/
│   ├── assets/             # CSS global, icon SVG, vendor assets
│   │   └── scripts/css/    # main.css, base.css (Tailwind directives)
│   ├── components/         # Komponen UI Vue reusable
│   ├── composables/        # Custom Vue Composables
│   │   ├── useDate.ts      # Helper tanggal & waktu
│   │   ├── useNotify.ts    # Helper SweetAlert & Toast
│   │   └── wrapper.ts      # Universal csrLoader()
│   ├── plugins/            # Konfigurasi plugin eksternal
│   │   ├── days.ts         # Konfigurasi Day.js & plugins
│   │   └── sweetalert.ts   # Konfigurasi SweetAlert2 helpers
│   ├── router/             # Vue Router & NProgress navigation guards
│   ├── services/           # Service layer HTTP
│   │   └── api.ts          # Axios instance (Laravel 12 / Standalone API)
│   ├── stores/             # Pinia store modules
│   │   └── locale.ts       # Store bahasa ter-persisten (localStorage)
│   ├── types/              # Definisi interface TypeScript & pagination
│   │   └── index.ts        # ApiResponse, PaginatedResponse, User
│   ├── utils/              # Fungsi utilitas murni
│   │   ├── cn.ts           # Class merge (clsx + tailwind-merge)
│   │   ├── date.ts         # Format date helpers
│   │   └── notification.ts # Re-export helper notifikasi
│   ├── views/              # Halaman route utama
│   │   ├── HomeView.vue    # Halaman utama
│   │   └── AboutView.vue   # Interactive Showcase seluruh fitur
│   ├── App.vue             # Root layout & navbar
│   └── main.ts             # Inisialisasi aplikasi Vue, Pinia, Toast
├── .env.example            # Contoh konfigurasi environment
├── env.d.ts                # Deklarasi tipe variabel Vite
├── tailwind.config.js      # Konfigurasi Tailwind & warna Bootstrap
├── vite.config.ts          # Konfigurasi Vite, dev proxy & vendor chunk splitting
├── SUMMARY.md              # Dokumentasi ringkasan arsitektur detail
└── package.json            # Daftar dependencies & scripts
```

---

## ⚙️ Konfigurasi Environment

Salin file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Isi konfigurasi pada file `.env`:

```env
# Nama Aplikasi
VITE_APP_NAME="Vue TypeScript Starter"

# Endpoint API (Standalone atau Backend Laravel 12)
VITE_API_BASE_URL="http://localhost:8000/api"
VITE_API_TIMEOUT=15000

# Endpoint CSRF Laravel Sanctum
VITE_SANCTUM_CSRF_URL="http://localhost:8000/sanctum/csrf-cookie"
```

---

## 🚀 Panduan Menjalankan

### Prasyarat
* **Node.js:** `^22.18.0` atau `>=24.12.0`
* **Package Manager:** `pnpm` (disarankan), `npm`, atau `yarn`

### Instalasi Dependensi
```bash
pnpm install
```

### Menjalankan Server Development
```bash
pnpm dev
```
Akses aplikasi melalui browser di `http://localhost:5173`. Kunjungi menu **Showcase (`/about`)** untuk mencoba semua fitur secara langsung.

### Pengecekan Tipe TypeScript
```bash
pnpm type-check
```

### Build Produksi
```bash
pnpm build
```

### Preview Build Produksi
```bash
pnpm preview
```

### Format Kode
```bash
pnpm format
```

---

## 💡 Contoh Penggunaan Singkat

### 1. HTTP Request Siap Laravel 12 / Standalone
```typescript
import api, { getCsrfCookie, extractValidationErrors } from '@/services/api'

// Login Laravel Sanctum SPA
await getCsrfCookie()
await api.post('/login', { email: 'user@domain.com', password: 'secret' })

// Pemanggilan data umum
const response = await api.get('/user/profile')
```

### 2. Notifikasi & Modal
```typescript
import useNotify from '@/composables/useNotify'

const { toast, alert, confirm, loading } = useNotify()

// Toast
toast.success('Data berhasil disimpan!')

// SweetAlert Confirm
const ok = await confirm('Hapus Item?', 'Aksi ini tidak dapat dibatalkan.')
if (ok) {
  toast.info('Item dihapus')
}
```

### 3. Format Tanggal & Multi-bahasa
```typescript
import useDate from '@/composables/useDate'

const { now, fromNow } = useDate()

console.log(now('dddd, DD MMMM YYYY')) // Hari, Tanggal Bulan Tahun
console.log(fromNow('2024-01-01'))     // 2 tahun yang lalu
```

### 4. Dynamic Class dengan `cn()`
```typescript
import { cn } from '@/utils/cn'

const buttonClass = cn(
  'px-4 py-2 rounded-lg font-semibold transition',
  isActive ? 'bg-primary text-white' : 'bg-secondary text-gray-200'
)
```

---

## 📄 Lisensi

Proyek ini berada di bawah lisensi [MIT](LICENSE).
