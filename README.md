# Ethical-Hacking-Projects-01-Advanced-Phising-Simulator-With-Geolocation-Tracking
# Google Accounts Phishing Simulation

**Disclaimer**:  
⚠ **Proyek ini hanya untuk tujuan edukasi dan kesadaran keamanan semata** ⚠  
⚠ **Penggunaan tidak sah untuk tujuan jahat dilarang keras** ⚠

## 📌 Overview

Simulasi halaman login Google dengan kemampuan pelacakan canggih untuk mendemonstrasikan teknik phishing modern. Sistem ini mengumpulkan:

- Username dan password
- Data lokasi presisi (latitude/longitude)
- Waktu akses
- Data lokasi berbasis IP
- Informasi perangkat

## 🔧 Cara Kerja

### 📍 Alur Kerja Sistem
1. **Korban** mengakses halaman login palsu
2. Sistem meminta **izin lokasi** (terlihat legit)
3. Saat korban memasukkan credential:
   - Validasi form dilakukan client-side
   - Sistem mencoba mendapatkan lokasi dengan 3 metode:
     1. **GPS presisi** (jika diizinkan)
     2. **Estimasi berbasis IP**
     3. **Perkiraan zona waktu**
4. Data dikirim ke Google Sheets via Apps Script
5. Korban diarahkan ke halaman Google asli

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

## 📜 License
Proyek ini hanya untuk tujuan edukasi. Penggunaan di luar tujuan edukasi menjadi tanggung jawab pengguna.
