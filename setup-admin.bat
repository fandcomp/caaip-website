@echo off
echo ========================================
echo    CAAIP Admin Panel Setup Script
echo ========================================
echo.

echo Step 1: Installing dependencies...
npm install

echo.
echo Step 2: Building project...
npm run build

echo.
echo Step 3: Setup environment variables...
if not exist .env (
    echo Creating .env file from template...
    copy .env.example .env
    echo.
    echo IMPORTANT: Please edit .env file with your GitHub OAuth credentials!
    echo 1. Go to https://github.com/settings/developers
    echo 2. Create new OAuth App
    echo 3. Set Authorization callback URL to: http://localhost:4321/api/auth
    echo 4. Copy Client ID and Client Secret to .env file
    echo.
    notepad .env
)

echo.
echo Step 4: Starting development server...
echo.
echo ========================================
echo    SETUP COMPLETE!
echo ========================================
echo.
echo Your admin panel is ready for testing!
echo.
echo 1. Open browser to: http://localhost:4321/admin/
echo 2. Follow TESTING_GUIDE.md for detailed instructions
echo 3. Make sure you have GitHub OAuth setup
echo.
echo Press any key to start the server...
pause > nul

npm run dev