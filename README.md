# Ankit Verma — Portfolio Redirect Portal

> 📢 **NOTICE**: This repository serves as the official redirect portal for Ankit Verma's legacy static site. The portfolio and AI assistant backend have moved to dedicated GCP infrastructure at:
>
> **🌐 Live Site:** [https://portfolioankit.duckdns.org/](https://portfolioankit.duckdns.org/)

---

## 🚀 Automatic Redirection

Visitors landing on this site (via GitHub Pages or legacy URLs) are automatically redirected to `https://portfolioankit.duckdns.org/` via:
1. **Instant JavaScript Redirect** (`window.location.replace`)
2. **Meta Refresh Tag** (`<meta http-equiv="refresh">`)
3. **SEO Canonical Pointer** (`<link rel="canonical">`)

---

## 🛠 Repository Maintenance & Deployment

This repository continues to automatically deploy via GitHub Actions:
- Workflow file: `.github/workflows/deploy-pages.yml`
- Hosting: GitHub Pages

Any push to `main` instantly updates the redirection page on GitHub Pages.
