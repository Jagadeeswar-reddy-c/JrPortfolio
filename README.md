# 🖥️ Terminal Portfolio — Jagadeeswar Reddy Chennuru

> A retro-themed developer portfolio with classic CRT terminal aesthetics

**Live Demo:** [https://jagadeeswar-reddy-c.github.io/JrPortfolio/](https://jagadeeswar-reddy-c.github.io/JrPortfolio/)

---

## ✨ Features

- **�️ Terminal Theme**: Classic phosphor green CRT terminal aesthetic
- **👤 Profile Photo**: Circular profile image with green glowing border
- **⌨️ Terminal Windows**: All sections styled as terminal interfaces
- **🎯 Dynamic Content**: Fully data-driven via `profile.json`
- **🔍 Project Filtering**: Filter projects by technology tags
- **📱 Responsive Design**: Optimized for desktop and mobile
- **⚡ Loading Animation**: Terminal boot sequence
- **🎨 Animations**: Typing effects, cursor blink, CRT scan lines
- **♿ SEO Optimized**: Meta tags for social sharing

---

## 🚀 Quick Start

### Local Development

Opening `index.html` directly won't work due to browser CORS restrictions. Use a local web server:

**Python (Recommended):**
```bash
cd JrPortfolio
python3 -m http.server 8000
# Visit: http://localhost:8000
```

**Node.js:**
```bash
npx serve
```

### GitHub Pages Deployment

Already configured and live at:
```
https://jagadeeswar-reddy-c.github.io/JrPortfolio/
```

To update:
```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

Changes go live automatically in 1-2 minutes.

---

## 📝 Updating Content

All content is managed through **`profile.json`**. Simply edit this file to update:

- Personal information
- Skills and technologies
- Projects and links
- Work experience
- Education
- Publications

No code changes needed!

---

## 🎨 Customization

### Colors

Edit `assets/css/variables.css` to customize the terminal color scheme:

```css
--terminal-green: #33ff33;        /* Primary green */
--terminal-green-bright: #00ff00; /* Bright highlights */
--terminal-black: #000000;        /* Background */
```

### Profile Photo

Replace `images/photo_1_-removebg-preview.png` with your photo (transparent background recommended for best results).

### Fonts

The portfolio uses **JetBrains Mono** monospace font. Change in `variables.css`:

```css
--font-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
```

---

## � Project Structure

```
JrPortfolio/
├── index.html              # Main HTML structure
├── profile.json            # All content data
├── assets/
│   ├── css/
│   │   ├── variables.css   # Design tokens & colors
│   │   ├── animations.css  # Terminal animations
│   │   └── main.css        # Component styles
│   └── js/
│       ├── data-loader.js  # Fetch profile.json
│       ├── renderer.js     # Render content
│       └── interactions.js # Scroll, filters, etc.
└── images/
    └── photo_1_-removebg-preview.png
```

---

## 🛠️ Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Custom properties, animations
- **Vanilla JavaScript** — No frameworks, pure JS
- **Google Fonts** — JetBrains Mono
- **GitHub Pages** — Free hosting

---

## 💡 Design Philosophy

This portfolio recreates the aesthetic of vintage CRT terminals:

- **Phosphor Green** text on black background
- **Monospace font** for authentic terminal feel
- **Terminal windows** with title bars and controls
- **Command-line prompts** and syntax
- **CRT effects** like scan lines and glow

---

## 📸 Screenshots

### Desktop View
![Terminal Theme Hero](https://jagadeeswar-reddy-c.github.io/JrPortfolio/images/preview.png)

### Mobile View
Fully responsive with optimized layouts for all screen sizes.

---

## 🔧 Troubleshooting

### Colors appear blue/purple instead of green

**Solution:** Hard refresh to clear browser cache:
- **Windows/Linux:** `Ctrl + Shift + R`
- **Mac:** `Cmd + Shift + R`
- **Alternative:** Add `?v=` + timestamp to URL

### Profile.json not loading

**Cause:** CORS restrictions when using `file://` protocol

**Solution:** Use a local web server (see Quick Start section)

---

## 📄 License

Free to use for personal portfolios. Attribution appreciated!

---

## 👤 Author

**Jagadeeswar Reddy Chennuru**
- MSc Computer Science Student at Saarland University
- ML Engineer | Systems Builder
- [LinkedIn](https://www.linkedin.com/in/jagadeeswar-reddy-chennuru) • [GitHub](https://github.com/Jagadeeswar-reddy-c)

---

**Last Updated:** February 2026