# Wheel Offset Calculator & JDM Wheels Archive

A modern, interactive web application for calculating wheel offset on three-piece wheels, combined with a comprehensive knowledge base of classic and discontinued JDM wheels.

## Features

### 🧮 Offset Calculator
- Step-by-step guided process for calculating wheel offset
- Real-time validation and error checking
- Detailed results with offset, backspacing, and centerline measurements
- Conversion between inches and millimeters
- Print-friendly results page

### 📚 JDM Wheels Archive
- Comprehensive database of classic and discontinued JDM wheels
- Detailed specifications including:
  - Release and discontinuation dates
  - Available sizes and bolt patterns
  - Offset ranges and face types
  - Historical context and legacy
  - Common vehicle fitments
  - Current market values and authenticity tips
- Searchable sidebar navigation
- Organized by manufacturer

### Included Manufacturers
- **Work Wheels** - VS-KF, VS-XX, Meister S1
- **Weds/Kranze** - Cerberus I, Cerberus II, Bazreia
- **SSR** - Professor SP1, SP3, Vienna Merisia
- **Rays Engineering** - Volk CE28N, GT-C
- **BBS** - LM, RS
- **Hotstuff** - Stich Gulf, Cross Speed

## 🚀 Deployment

### Automatic Deployment (Recommended)

This repository is set up for automatic deployment to GitHub Pages using GitHub Actions.

#### One-Time Setup:

1. **Create a GitHub repository:**
   ```bash
   # Go to github.com and create a new repository named "offset" (or any name)
   ```

2. **Add the remote:**
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/offset.git
   ```

3. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**

4. **Push your code:**
   ```bash
   ./deploy.sh
   ```

That's it! Every time you run `./deploy.sh`, your changes will be automatically deployed.

#### Quick Deploy Command:
```bash
./deploy.sh
```

This script will:
- ✅ Add all changes
- ✅ Commit with timestamp
- ✅ Push to GitHub
- ✅ Trigger automatic deployment via GitHub Actions

### Manual Deployment

If you prefer to deploy manually:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

GitHub Actions will automatically build and deploy your site.

## 📍 Accessing Your Site

After deployment, your site will be live at:
```
https://YOUR-USERNAME.github.io/REPO-NAME
```

For example: `https://brandon.github.io/offset`

## 🌐 Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the root directory:
   ```bash
   echo "your-domain.com" > CNAME
   ```

2. Configure your DNS provider:
   - Add an `A` record pointing to GitHub's IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Or add a `CNAME` record pointing to `YOUR-USERNAME.github.io`

3. In GitHub Settings → Pages, enter your custom domain

## 🛠️ Development

This is a pure static website using:
- HTML5
- Tailwind CSS (via CDN)
- Vanilla JavaScript

No build process required! Just edit the files and deploy.

### File Structure:
```
offset/
├── index.html              # Main calculator page
├── calculator.js           # Calculator logic
├── sidebar.js             # Sidebar navigation
├── wheels/                # Individual wheel detail pages
│   ├── weds-kranze-cerberus-i.html
│   ├── work-vs-kf.html
│   ├── work-vs-xx.html
│   └── hotstuff-stich-gulf.html
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions workflow
└── deploy.sh              # Deployment script
```

## 💾 Local Development

Simply open `index.html` in your browser:
```bash
open index.html
```

Or use a local server:
```bash
python3 -m http.server 8000
# Then visit: http://localhost:8000
```

## 📝 Adding New Wheels

To add a new wheel to the archive:

1. Create a new HTML file in the `wheels/` directory
2. Use an existing wheel page as a template
3. Update the sidebar navigation in all pages to include the new wheel
4. Run `./deploy.sh` to deploy

## 🎨 Design

- Modern glass-morphism UI
- Gradient text effects
- Smooth animations and transitions
- Fully responsive (mobile, tablet, desktop)
- Dark theme optimized for readability

## 📄 License

This project is open source and available for personal or commercial use.

## 🤝 Contributing

Feel free to add more wheels, manufacturers, or improve the calculator functionality!

---

Built with ❤️ for the JDM wheel community
