# Setup Testing Admin Panel CAAIP

## 🚀 Quick Start untuk Testing

### 1. Build dan Jalankan Website
```bash
npm run build
npm run dev
```

### 2. Akses Admin Dashboard
Buka browser dan kunjungi: `http://localhost:4321/admin/`

### 3. Setup GitHub OAuth (Wajib untuk Testing Penuh)

#### Step 1: Buat GitHub OAuth App
1. Pergi ke [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/developers)
2. Klik "New OAuth App"
3. Isi form:
   - **Application name**: `CAAIP Admin (Testing)`
   - **Homepage URL**: `http://localhost:4321`
   - **Authorization callback URL**: `http://localhost:4321/api/auth`
   - **Description**: `Admin panel untuk website CAAIP`

#### Step 2: Dapatkan Credentials
- **Client ID**: Copy dari halaman OAuth app
- **Client Secret**: Generate dan copy

#### Step 3: Setup Environment Variables
Buat file `.env` di root project:
```env
GITHUB_CLIENT_ID=your_client_id_here
GITHUB_CLIENT_SECRET=your_client_secret_here
```

#### Step 4: Update Config Admin
Edit `admin/config.yml`:
```yaml
backend:
  name: github
  repo: YOUR_USERNAME/YOUR_REPO_NAME  # Ganti dengan repo Anda
  branch: main
  base_url: http://localhost:4321
  auth_endpoint: /api/auth
```

### 4. Testing Fitur Admin

#### ✅ Konten yang Sudah Ada untuk Testing:
- **Berita**: "Pelatihan Pilot Terbang CAAIP 2025"
- **Agenda**: "Seminar Keselamatan Penerbangan 2025"
- **Kabar Duka**: "Almarhum Prof. Dr. Ir. Budi Santoso"
- **Alumni**: "Ahmad Rahman (2015)"

#### 🧪 Cara Testing:

1. **Login ke Admin Panel**
   - Klik "Buka CMS Admin" di dashboard
   - Login dengan GitHub account Anda

2. **Test Berita**
   - Pilih "Berita" di menu kiri
   - Klik item yang sudah ada untuk edit
   - Coba ubah judul, isi, atau upload gambar baru
   - Klik "Save" untuk menyimpan sebagai draft
   - Klik "Publish" untuk publish

3. **Test Agenda**
   - Pilih "Agenda & Event"
   - Edit event yang sudah ada
   - Coba ubah tanggal, lokasi, atau detail

4. **Test Kabar Duka**
   - Pilih "Kabar Duka"
   - Edit berita duka yang ada
   - Coba tambah galeri foto

5. **Test Alumni**
   - Pilih "Alumni - Orang"
   - Edit data alumni yang ada
   - Coba ubah informasi karir

6. **Test Halaman Statis**
   - Pilih "Halaman Statis"
   - Edit halaman "Tentang CAAIP"
   - Coba ubah konten

7. **Test Pengaturan**
   - Pilih "Pengaturan Website"
   - Edit "Pengaturan Umum" atau "Media Sosial"

### 5. Preview Changes

Setelah mengubah konten:
1. Klik tombol "Preview" di admin panel
2. Atau buka website di tab baru: `http://localhost:4321`
3. Lihat perubahan yang sudah dibuat

### 6. Troubleshooting

#### Error: "Repository not found"
- Pastikan repo name di config.yml benar
- Pastikan Anda punya akses ke repository tersebut

#### Error: "Authentication failed"
- Periksa GITHUB_CLIENT_ID dan GITHUB_CLIENT_SECRET
- Pastikan OAuth app redirect URL benar

#### Error: "Branch not found"
- Pastikan branch "main" ada di repository
- Bisa ganti ke "master" jika menggunakan branch master

#### Konten tidak muncul di website
- Pastikan status konten adalah "published"
- Jalankan `npm run build` ulang
- Periksa console browser untuk error

### 7. Testing Checklist

- [ ] ✅ Bisa login ke admin panel
- [ ] ✅ Bisa melihat daftar konten
- [ ] ✅ Bisa edit konten yang sudah ada
- [ ] ✅ Bisa membuat konten baru
- [ ] ✅ Bisa upload gambar
- [ ] ✅ Bisa preview perubahan
- [ ] ✅ Konten muncul di website setelah publish
- [ ] ✅ Bisa edit pengaturan website
- [ ] ✅ Bisa edit media sosial

### 8. Next Steps untuk Production

Setelah testing berhasil:

1. **Deploy ke Vercel/Netlify**
2. **Setup domain production**
3. **Update config.yml dengan URL production**
4. **Setup OAuth app untuk production**
5. **Test lagi di environment production**

---

**Catatan**: Untuk testing penuh, pastikan Anda memiliki repository GitHub yang bisa digunakan untuk menyimpan konten website.