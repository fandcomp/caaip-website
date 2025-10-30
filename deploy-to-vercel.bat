@echo off
echo ========================================
echo    CAAIP Website - Vercel Deployment
echo ========================================
echo.

set /p GITHUB_USERNAME=Masukkan GitHub username Anda:
set /p REPO_NAME=Masukkan nama repository (default: caaip-website):
if "%REPO_NAME%"=="" set REPO_NAME=caaip-website

echo.
echo Repository akan dibuat: https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
echo.

echo Step 1: Push code ke GitHub...
git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git 2>nul
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Gagal push ke GitHub
    echo Pastikan:
    echo 1. Repository sudah dibuat di GitHub
    echo 2. Anda punya akses push ke repository
    echo 3. GitHub credentials sudah dikonfigurasi
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ Code berhasil di-push ke GitHub!
echo.
echo Step 2: Buka browser untuk setup Vercel...
echo.
echo Instruksi:
echo 1. Pergi ke: https://vercel.com
echo 2. Klik "New Project"
echo 3. Import repository: %GITHUB_USERNAME%/%REPO_NAME%
echo 4. Konfigurasi project (lihat DEPLOYMENT_GUIDE.md)
echo 5. Add environment variables
echo 6. Deploy!
echo.
echo Setelah deploy selesai, update admin/config.yml dengan URL production
echo.
echo 📖 Baca DEPLOYMENT_GUIDE.md untuk panduan lengkap
echo.
pause