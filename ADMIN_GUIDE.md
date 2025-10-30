# Panduan Admin CAAIP Website

## Selamat Datang di Admin Panel CAAIP

Website ini menggunakan **Decap CMS** sebagai sistem manajemen konten yang user-friendly untuk admin non-teknis.

## 🚀 Cara Mengakses Admin Panel

1. **Buka Admin Dashboard**: Kunjungi `/admin/` di website CAAIP
2. **Login dengan GitHub**: Klik tombol "Login with GitHub"
3. **Authorize Aplikasi**: Berikan akses ke repository GitHub
4. **Mulai Mengelola**: Anda akan diarahkan ke dashboard admin

## 📝 Mengelola Konten

### 1. Berita
- **Berita Internal**: Berita dari dalam institusi CAAIP
- **Berita Eksternal**: Berita dari luar institusi
- **Pengumuman**: Informasi penting untuk publik

**Cara menambah berita:**
1. Pilih "Berita" di menu sebelah kiri
2. Klik "New Berita"
3. Isi semua field yang diperlukan
4. Upload gambar cover (recommended)
5. Pilih kategori yang sesuai
6. Set status ke "draft" dulu, lalu "published" saat siap

### 2. Agenda & Event
**Field yang perlu diisi:**
- Judul Event
- Tanggal mulai dan selesai
- Lokasi
- Jenis event (Seminar, Workshop, dll.)
- Poster/gambar (optional)
- Pembicara (optional)
- Kapasitas peserta (optional)
- Link pendaftaran (jika ada)

### 3. Kabar Duka
**Field penting:**
- Nama lengkap
- Foto (optional)
- Jabatan/peran di CAAIP
- Tanggal wafat
- Informasi prosesi pemakaman
- Kontak keluarga untuk bela sungkawa

### 4. Data Alumni
**Informasi yang dibutuhkan:**
- Nama lengkap
- Angkatan (tahun)
- Program studi
- Jabatan dan organisasi saat ini
- Kontak (email/telepon)
- Foto (optional)
- Bio singkat

### 5. Halaman Statis
- **Tentang CAAIP**: Profil institusi
- **Agenda**: Halaman agenda umum
- **Kabar Duka**: Halaman kabar duka umum
- **Alumni**: Halaman alumni umum

## ⚙️ Pengaturan Website

### Pengaturan Umum
- Nama institusi
- Tagline
- Deskripsi website
- Logo utama dan logo Kemenhub
- Informasi kontak
- Bahasa default

### Media Sosial
- Link Facebook, Instagram, Twitter, YouTube, LinkedIn, TikTok

## 🖼️ Mengelola Media

### Upload Gambar
1. Pada form konten, klik field gambar
2. Pilih "Upload" atau drag & drop file
3. Tunggu proses upload selesai
4. Gambar akan tersimpan di `/images/`

### Rekomendasi Gambar
- **Cover Berita**: 1200x600px, format JPG/PNG
- **Foto Profil**: 400x400px, format JPG
- **Poster Event**: 800x1000px, format JPG/PNG
- **Logo**: 200x200px, format PNG dengan transparan

## 📋 Workflow Publishing

### 1. Draft → Review → Publish
```
Draft → Review → Publish
   ↓       ↓       ↓
Simpan  Periksa  Terbitkan
```

### 2. Checklist Sebelum Publish
- [ ] Judul jelas dan menarik
- [ ] Ringkasan singkat tapi informatif
- [ ] Gambar cover berkualitas
- [ ] Konten lengkap dan akurat
- [ ] Link dan referensi berfungsi
- [ ] Grammar dan ejaan sudah dicek

## 🔍 Preview & Testing

### Preview Konten
1. Saat mengedit, klik tombol "Preview"
2. Lihat bagaimana konten akan tampil
3. Pastikan layout dan gambar benar

### Testing Link
- Klik semua link internal
- Pastikan gambar ter-load
- Cek tampilan di desktop dan mobile

## 🆘 Troubleshooting

### Masalah Umum

**Gambar tidak muncul:**
- Pastikan file sudah ter-upload dengan benar
- Cek path gambar di field
- Gunakan format JPG/PNG

**Konten tidak tersimpan:**
- Pastikan koneksi internet stabil
- Coba refresh halaman dan login ulang
- Hubungi IT support jika berlanjut

**Admin panel tidak bisa diakses:**
- Pastikan punya akses GitHub repository
- Cek apakah repository masih aktif
- Hubungi administrator

## 📞 Dukungan

**Untuk bantuan teknis:**
- Email: it@caaip.ac.id
- Telepon: +62 22 1234567

**Panduan Lengkap:**
- Kunjungi `/admin/` untuk dashboard
- Baca dokumentasi Decap CMS di decapcms.org

---

*Dokumen ini akan diperbarui sesuai kebutuhan. Terakhir update: Oktober 2025*