# 📋 Ringkasan Setup & Arsitektur Template Frontend Vue.js TypeScript

Dokumen ini berisi rangkuman lengkap mengenai setup, review, refactoring, instalasi package, dan konfigurasi warna yang telah disiapkan untuk template **All-Around Front End Vue.js + TypeScript**.

Template ini dirancang fleksibel agar dapat digunakan sebagai:
1. **Standalone Vue.js TypeScript SPA** (berkomunikasi dengan RESTful API pihak ketiga atau backend apa pun).
2. **Frontend untuk Laravel 12** (mendukung Laravel Sanctum SPA Cookie Auth, CSRF token handling, dan format error validasi 422).

---

## 📦 1. Library Packages yang Ditambahkan

Seluruh library bawaan tetap dipertahankan tanpa ada yang dihapus. Ditambahkan package pendukung penting:

| Package | Jenis | Kegunaan |
| :--- | :--- | :--- |
| `@vueuse/core` | Dependency | Kumpulan ratusan composable reaktif Vue 3 (`useLocalStorage`, `useDark`, `onClickOutside`, `useTitle`, dll). |
| `pinia-plugin-persistedstate` | Dependency | Persistensi otomatis state Pinia ke `localStorage`/`sessionStorage` (berguna untuk auth token, user info, dan preferensi locale). |
| `@lucide/vue` & `lucide-vue-next` | Dependency | Icon pack SVG modern, ringan, tree-shakable, dan fully typed. |
| `clsx` & `tailwind-merge` | Dependency | Menggabungkan class Tailwind secara dinamis tanpa bentrok / overwrite style. |
| `nprogress` & `@types/nprogress` | Dep & DevDep | Indikator progress bar di bagian atas halaman saat navigasi route dan HTTP loading. |
| `js-cookie` & `@types/js-cookie` | Dep & DevDep | Helper manipulasi cookie, khususnya membaca token `XSRF-TOKEN` bawaan Laravel Sanctum. |
| `zod` | Dependency | Schema validation untuk form, request DTO, dan type-safe data parsing. |
| `ag-grid-community` & `ag-grid-vue3` | Dependency | Melengkapi dependensi AG Grid agar kompatibel penuh dengan Vue 3. |
| `@tailwindcss/forms` | DevDependency | Plugin Tailwind untuk reset form input, select, checkbox, dan radio agar rapi dan konsisten. |
| `@tailwindcss/typography` | DevDependency | Plugin Tailwind untuk styling konten rich-text / markdown (`prose`). |

---

## 🎨 2. Konfigurasi Warna Tailwind CSS (Format Bootstrap)

File [`tailwind.config.js`](file:///home/wannacry021/Public/Project/Skuad/frontend-vuejs/tailwind.config.js) telah dikonfigurasi dengan palet standar Bootstrap beserta skala shade lengkap (50–900):

| Nama Warna | Nilai Default Hex | Contoh Class Tailwind | Keterangan |
| :--- | :--- | :--- | :--- |
| `primary` | `#0d6efd` | `bg-primary`, `text-primary`, `border-primary-600` | Bootstrap Primary Blue |
| `secondary` | `#6c757d` | `bg-secondary`, `text-secondary`, `bg-secondary-500` | Bootstrap Secondary Gray |
| `secondary-black` | `#1a1e21` | `bg-secondary-black`, `text-secondary-black` | Bootstrap Secondary Black (juga alias `secondary_black`) |
| `secondary-white` | `#f8f9fa` | `bg-secondary-white`, `text-secondary-white` | Bootstrap Secondary White (juga alias `secondary_white`) |
| `warning` | `#ffc107` | `bg-warning`, `text-warning`, `border-warning-400` | Bootstrap Warning Yellow |
| `danger` | `#dc3545` | `bg-danger`, `text-danger`, `bg-danger-600` | Bootstrap Danger Red |
| `info` | `#0dcaf0` | `bg-info`, `text-info`, `border-info` | Bootstrap Info Cyan |
| `success` | `#198754` | `bg-success`, `text-success`, `bg-success-700` | Bootstrap Success Green |
| `light` | `#f8f9fa` | `bg-light`, `text-light` | Bootstrap Light |
| `dark` | `#212529` | `bg-dark`, `text-dark` | Bootstrap Dark |

---

## 🛠️ 3. Rangkuman Refactor & File Baru

### A. HTTP & Integrasi Laravel 12 / Standalone
* **[`src/services/api.ts`](file:///home/wannacry021/Public/Project/Skuad/frontend-vuejs/src/services/api.ts)**:
  * Axios instance terpusat dengan `baseURL` dari `VITE_API_BASE_URL` (fallback `/api`).
  * `withCredentials: true` aktif untuk autentikasi cookie Laravel Sanctum.
  * Header standar: `X-Requested-With: 'XMLHttpRequest'` dan `Accept: 'application/json'`.
  * **Request Interceptor**: Otomatis menyematkan `Bearer <token>` (jika login token/standalone) dan `X-XSRF-TOKEN` cookie (jika Laravel Sanctum).
  * **Response Interceptor**: Penanganan status HTTP:
    * `401 Unauthorized` — Hapus token / reset sesi.
    * `419 CSRF Token Mismatch` — Peringatan sesi/CSRF Laravel kadaluarsa.
    * `422 Unprocessable Content` — Disediakan helper `extractValidationErrors()` untuk membaca pesan error validasi Laravel.
    * `403 Forbidden` & `500 Server Error`.
  * Fungsi `getCsrfCookie()` untuk memicu endpoint `/sanctum/csrf-cookie`.

* **[`src/composables/wrapper.ts`](file:///home/wannacry021/Public/Project/Skuad/frontend-vuejs/src/composables/wrapper.ts)**:
  * Refactor fungsi `csrLoader<T>()` dengan generic typing dan opsi parameter yang fleksibel.
  * Loading state dan alert terintegrasi otomatis.

### B. Notifikasi & Modal
* **[`src/plugins/sweetalert.ts`](file:///home/wannacry021/Public/Project/Skuad/frontend-vuejs/src/plugins/sweetalert.ts)** & **[`src/utils/notification.ts`](file:///home/wannacry021/Public/Project/Skuad/frontend-vuejs/src/utils/notification.ts)**:
  * Ditambahkan fungsi terstandarisasi: `showSuccess`, `showError`, `showWarning`, `showInfo`, `showConfirm`, dan `showToast`.
  * Warna tombol konfirmasi dan batal diselaraskan dengan palet Bootstrap (`#0d6efd`, `#6c757d`, `#dc3545`).
* **[`src/composables/useNotify.ts`](file:///home/wannacry021/Public/Project/Skuad/frontend-vuejs/src/composables/useNotify.ts)**:
  * Menyediakan alias ringkas: `{ toast, alert, loading, confirm }` dengan tetap menjaga fungsi lama `{ useSwal, useLoading, toastr }`.

### C. Manipulasi Tanggal & Waktu
* **[`src/plugins/days.ts`](file:///home/wannacry021/Public/Project/Skuad/frontend-vuejs/src/plugins/days.ts)** & **[`src/utils/date.ts`](file:///home/wannacry021/Public/Project/Skuad/frontend-vuejs/src/utils/date.ts)**:
  * Plugin Day.js diperluas: `relativeTime`, `localizedFormat`, `isBetween`, `isSameOrAfter`, `isSameOrBefore`, `customParseFormat`, `utc`, dan `timezone`.
  * Helper baru: `formatRelativeTime()` (misal: "3 jam yang lalu"), `isDateBetween()`, dan `getCurrentLocale()` dengan proteksi fallback aman.
* **[`src/composables/useDate.ts`](file:///home/wannacry021/Public/Project/Skuad/frontend-vuejs/src/composables/useDate.ts)**:
  * Menyediakan shortcut: `{ now, format, fromNow, isDateBetween }`.

### D. Router & Pinia Store
* **[`src/router/index.ts`](file:///home/wannacry021/Public/Project/Skuad/frontend-vuejs/src/router/index.ts)**:
  * Terpasang `NProgress` pada navigation guard (`beforeEach`, `afterEach`, `onError`).
  * Otomatis mengupdate judul tab browser (`document.title`) berdasarkan properti `meta.title`.
* **[`src/stores/locale.ts`](file:///home/wannacry021/Public/Project/Skuad/frontend-vuejs/src/stores/locale.ts)**:
  * Mengaktifkan `persist: true` agar pilihan bahasa user tetap tersimpan di storage browser.
  * Menambahkan action `toggleLocale()`.

### E. Utilities & Types
* **[`src/utils/cn.ts`](file:///home/wannacry021/Public/Project/Skuad/frontend-vuejs/src/utils/cn.ts)**:
  * Helper `cn(...inputs)` untuk dynamic styling Tailwind CSS.
* **[`src/types/index.ts`](file:///home/wannacry021/Public/Project/Skuad/frontend-vuejs/src/types/index.ts)**:
  * Menyediakan interface tipe umum: `ApiResponse<T>`, `PaginatedResponse<T>` (format Resource Pagination Laravel), `PaginationMeta`, `PaginationLinks`, dan `AppUser`.

### F. Environment & Build Setup
* **[`.env.example`](file:///home/wannacry021/Public/Project/Skuad/frontend-vuejs/.env.example)** & **[`env.d.ts`](file:///home/wannacry021/Public/Project/Skuad/frontend-vuejs/env.d.ts)**:
  * Pengaturan `VITE_APP_NAME`, `VITE_API_BASE_URL`, `VITE_API_TIMEOUT`, dan `VITE_SANCTUM_CSRF_URL` dengan deklarasi tipe TypeScript lengkap.
* **[`vite.config.ts`](file:///home/wannacry021/Public/Project/Skuad/frontend-vuejs/vite.config.ts)**:
  * Konfigurasi proxy server lokal untuk meneruskan `/api` dan `/sanctum` ke Laravel (`http://localhost:8000`).
  * Konfigurasi *manual chunks* untuk memisahkan `vendor-vue`, `vendor-fontawesome`, `vendor-ui`, dan `vendor-aggrid` sehingga ukuran bundle utama sangat kecil dan optimal.

### G. Perbaikan Masalah Bawaan
* **[`src/App.vue`](file:///home/wannacry021/Public/Project/Skuad/frontend-vuejs/src/App.vue)**: Menghapus panggilan modal `useLoading().show()` yang sebelumnya aktif terus-menerus tanpa tertutup saat aplikasi pertama kali dimuat.
* **[`index.html`](file:///home/wannacry021/Public/Project/Skuad/frontend-vuejs/index.html)**: Memperbaiki pemuatan script vendor Font Awesome dan menghapus link file CSS font yang hilang untuk menghilangkan semua warning saat bundling.

---

---

## 🌟 5. Showcase Interaktif di Route `/about`

Halaman [`src/views/AboutView.vue`](file:///home/wannacry021/Public/Project/Skuad/frontend-vuejs/src/views/AboutView.vue) telah disulap menjadi dashboard showcase interaktif terintegrasi menggunakan **Headless UI Tab Navigation**:

1. **Tab Palet Warna & UI**: Swatches warna Bootstrap Tailwind (`primary`, `secondary`, `secondary-black`, `secondary-white`, `warning`, `danger`, `info`, `success`, `light`, `dark`), buttons, badges, dan Headless UI `Switch`.
2. **Tab Notifikasi & Modal**: Trigger SweetAlert2 dialog (`success`, `error`, `warning`, `info`, `confirm modal`, `loading screen`, `toast`) dan notifikasi Vue-Toastification.
3. **Tab AG Grid (Tabel Enterprise)**: Tabel data interaktif berbasis `ag-grid-vue3` & `ag-grid-community` dengan custom status badge renderer, sorting, dan filtering.
4. **Tab Swiper (Slider)**: Carousel responsive modern dengan pagination dan autoplay otomatis.
5. **Tab VueUse & Utilities**: Live clipboard copy, live window size (`width × height`), live status koneksi internet (`useOnline`), dan toggle Dark Mode.
6. **Tab Tanggal & Locale**: Format tanggal live multi-bahasa dengan Day.js (`getCurrDateTimeNow`), relative time (`fromNow`), dan tombol pergantian bahasa tersimpan di Pinia PersistedState.
7. **Tab Zod & CSR Loader**: Form validasi interaktif dengan Zod Schema serta simulasi pemanggilan HTTP request dengan `csrLoader`.

---

## 🚀 6. Perintah yang Tersedia

```bash
# Menjalankan development server
pnpm dev

# Melakukan type-check TypeScript
pnpm type-check

# Melakukan build produksi
pnpm build

# Menjalankan preview hasil build
pnpm preview

# Format kode menggunakan Prettier
pnpm format
```

---

*Status build dan type-check saat ini:* **100% Passed (0 Error, 0 Warning)**.
