@echo off
echo.
echo ==========================================
echo  TKT - Pushing to DEV (preview only)
echo ==========================================
echo.

cd /d "C:\Users\divcl\OneDrive\Desktop\KidsSongsSpotify\TKTWebsite"

git checkout dev
git add .

set /p MSG="Describe your change: "
git commit -m "%MSG%"
git push origin dev

echo.
echo ==========================================
echo  DONE! Preview will be live shortly at:
echo  https://dev--tinykindnesstunes.netlify.app
echo ==========================================
echo.
pause
