# ankitverma.dev

Personal portfolio site for Ankit Verma, focused on backend engineering, automation systems, internal platforms, and Power Platform solutions.

Live site:
`https://ankitverma1996.github.io/ankitverma.dev/`

## Overview

This is a static portfolio website built with plain HTML, CSS, and JavaScript.
It highlights:

- Backend engineering projects
- Power Platform solutions
- Architecture thinking and system design approach
- Resume and contact links
- A small portfolio assistant for common questions

## Main Sections

- Hero section with resume and LinkedIn links
- About and developer identity
- Technology stack
- Backend project highlights
- Power Platform project highlights
- Architecture section with visual diagram
- FAQ
- Contact section

## Tech Stack

- HTML
- CSS
- JavaScript
- `vis-network` for the architecture visualization
- GitHub Pages for hosting

## Local Preview

Because this is a static site, you can preview it with any simple local server.

Example with Python:

```bash
python -m http.server 8000
```

Then open:

`http://localhost:8000`

## Deployment

The repository includes a GitHub Pages workflow at:

`/.github/workflows/deploy-pages.yml`

It uses:

- `actions/configure-pages@v6`
- `actions/upload-pages-artifact@v4`
- `actions/deploy-pages@v5`

To use that workflow, set GitHub Pages source to `GitHub Actions` in the repository settings.

## Project Structure

```text
.
|-- .github/
|   `-- workflows/
|       `-- deploy-pages.yml
|-- index.html
|-- style.css
|-- script.js
|-- profile.jpeg
|-- resume.pdf
`-- README.md
```

## Notes

- The site is intentionally static and lightweight.
- External links open safely in a new tab where needed.
- The assistant is toggle-based and does not open by default.

