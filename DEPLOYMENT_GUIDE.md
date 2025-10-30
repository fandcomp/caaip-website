# 🚀 Deployment Guide - CAAIP Website ke Vercel

## 📋 Prerequisites

Sebelum deploy, pastikan Anda memiliki:
- ✅ Akun GitHub
- ✅ Akun Vercel
- ✅ Repository GitHub untuk project ini

---

## 🎯 Step-by-Step Deployment

### **Step 1: Setup GitHub Repository**

1. **Buat Repository Baru di GitHub**
   - Pergi ke [github.com/new](https://github.com/new)
   - Repository name: `caaip-website`
   - Description: `Website resmi CAAIP - Pusat Pendidikan dan Pelatihan Transportasi Udara`
   - Set to **Public** atau **Private**
   - ✅ Add a README file
   - Klik **Create repository**

2. **Push Code ke GitHub**
   ```bash
   # Add remote repository
   git remote add origin https://github.com/YOUR_USERNAME/caaip-website.git

   # Add all files
   git add .

   # Commit changes
   git commit -m "Initial commit: CAAIP website with admin panel"

   # Push to GitHub
   git push -u origin main
   ```

---

### **Step 2: Setup GitHub OAuth App (Production)**

1. **Buat OAuth App**
   - Pergi ke [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/developers)
   - Klik **"New OAuth App"**

2. **Isi Form OAuth App**:
   ```
   Application name: CAAIP Admin Panel
   Homepage URL: https://caaip-website.vercel.app
   Authorization callback URL: https://caaip-website.vercel.app/api/auth
   Description: Admin panel untuk website CAAIP
   ```

3. **Simpan Credentials**
   - **Client ID**: `YOUR_GITHUB_CLIENT_ID`
   - **Client Secret**: `YOUR_GITHUB_CLIENT_SECRET`

---

### **Step 3: Deploy ke Vercel**

1. **Connect Repository**
   - Pergi ke [vercel.com](https://vercel.com)
   - Klik **"New Project"**
   - Import repository: `YOUR_USERNAME/caaip-website`

2. **Konfigurasi Project**
   ```
   Framework Preset: Astro
   Root Directory: ./
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Environment Variables**
   Tambahkan variables berikut:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `GITHUB_CLIENT_ID` | `YOUR_GITHUB_CLIENT_ID` | Production |
   | `GITHUB_CLIENT_SECRET` | `YOUR_GITHUB_CLIENT_SECRET` | Production |
   | `GITHUB_REPO_OWNER` | `YOUR_USERNAME` | Production |
   | `GITHUB_REPO_NAME` | `caaip-website` | Production |

4. **Deploy**
   - Klik **"Deploy"**
   - Tunggu proses deployment selesai
   - Dapatkan URL production: `https://caaip-website.vercel.app`

---

### **Step 4: Update Configuration**

1. **Update Admin Config**
   Edit `admin/config.yml`:
   ```yaml
   backend:
     name: github
     repo: YOUR_USERNAME/caaip-website
     branch: main
     base_url: https://caaip-website.vercel.app
     auth_endpoint: /api/auth

   site_url: "https://caaip-website.vercel.app"
   display_url: "https://caaip-website.vercel.app"
   ```

2. **Commit & Push Changes**
   ```bash
   git add .
   git commit -m "Update config for production deployment"
   git push origin main
   ```

3. **Redeploy di Vercel**
   - Vercel akan otomatis redeploy saat ada push ke main branch
   - Atau manual redeploy di dashboard Vercel

---

### **Step 5: Setup Domain (Opsional)**

1. **Add Custom Domain**
   - Di Vercel dashboard, pilih project
   - Settings > Domains
   - Add domain: `caaip.ac.id` atau domain pilihan Anda

2. **Update DNS**
   - Point domain ke Vercel nameservers
   - Atau add CNAME record jika menggunakan subdomain

3. **Update Config dengan Domain Baru**
   ```yaml
   site_url: "https://caaip.ac.id"
   display_url: "https://caaip.ac.id"
   base_url: "https://caaip.ac.id"
   ```

---

### **Step 6: Testing Production**

1. **Test Website**
   - Kunjungi: `https://caaip-website.vercel.app`
   - Pastikan semua halaman berfungsi

2. **Test Admin Panel**
   - Kunjungi: `https://caaip-website.vercel.app/admin/`
   - Login dengan GitHub account
   - Test edit konten

3. **Test OAuth Flow**
   - Klik "Buka CMS Admin"
   - Pastikan redirect ke GitHub login berhasil
   - Pastikan kembali ke admin panel setelah login

---

## 🔧 Troubleshooting

### **Build Error di Vercel**
```
Error: Module not found: @octokit/auth-oauth-app
```
**Solusi**: Pastikan dependencies sudah terinstall
```bash
npm install @octokit/auth-oauth-app @octokit/rest
```

### **OAuth Authentication Failed**
```
Error: Authentication failed
```
**Solusi**:
- Periksa GITHUB_CLIENT_ID dan GITHUB_CLIENT_SECRET
- Pastikan Authorization callback URL benar
- Pastikan repository access permissions

### **Admin Panel Tidak Muncul**
```
404 Error di /admin/
```
**Solusi**:
- Pastikan `admin/config.yml` ada
- Periksa base_url di config
- Redeploy project

### **Konten Tidak Tersimpan**
```
Error: Repository not found
```
**Solusi**:
- Periksa repo name di config.yml
- Pastikan GitHub account punya akses ke repository
- Periksa branch name (main/master)

---

## 📊 Monitoring & Maintenance

### **Vercel Analytics**
- Pantau traffic dan performance
- Check error logs
- Monitor build status

### **GitHub Repository**
- Monitor commits dan changes
- Review pull requests
- Backup content otomatis

### **Regular Maintenance**
- Update dependencies bulanan
- Backup content penting
- Monitor admin access logs

---

## 🎉 Deployment Selesai!

Setelah semua steps selesai, website CAAIP akan live di:
**https://caaip-website.vercel.app**

Admin panel dapat diakses di:
**https://caaip-website.vercel.app/admin/**

**Next Steps**:
1. Test semua fitur admin panel
2. Populate konten awal
3. Setup monitoring
4. Train admin users

---

*Dokumen ini dibuat untuk deployment CAAIP Website v1.0*