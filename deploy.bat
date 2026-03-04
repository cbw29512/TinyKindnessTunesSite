@echo off
echo.
echo ==========================================
echo  TKT - Deploying to LIVE (main)
echo ==========================================
echo.

cd /d "C:\Users\divcl\OneDrive\Desktop\KidsSongsSpotify\TKTWebsite"

git checkout main
git merge dev
git push origin main
git checkout dev

echo.
echo ==========================================
echo  LIVE in ~30 seconds:
echo  https://tinykindnesstunes.netlify.app
echo ==========================================
echo.
pause
