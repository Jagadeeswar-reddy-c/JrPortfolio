# Quick Start — Portfolio Deployment

## 🚨 CORS Issue when opening directly

Opening `index.html` via `file://` won't work due to browser security (can't fetch local JSON files).

## ✅ Solution: Use a Web Server

**Option 1: Python (Easiest)**
```bash
cd /Users/jagadeeswarreddychennuru/Desktop/Personal/JrPortfolio
python3 -m http.server 8000
# Then visit: http://localhost:8000
```

**Option 2: Deploy to GitHub Pages**
```bash
git add .
git commit -m "Production portfolio"
git push origin main
# Enable Pages in repo settings → already configured at:
# https://jagadeeswar-reddy-c.github.io/JrPortfolio/
```

## 📝 To Update Content

Just edit `profile.json` — everything is data-driven!

## 🎨 Features

✅ Animated gradient background  
✅ Glassmorphism design  
✅ Project filtering  
✅ Scroll animations  
✅ Fully responsive  
✅ SEO optimized  

**All working perfectly!**