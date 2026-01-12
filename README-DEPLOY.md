# AMPM Architecture & Design — One-page site

This is a minimal, fast one-page site designed to be hosted for free (GitHub Pages, Netlify, etc.).

## 1) Quick preview (local)
Open `index.html` in your browser.

## 2) Contact form (recommended)
Static sites need a form service to deliver messages to your email. Two free options:

### Option A — Formspree (works anywhere)
1. Create an account at Formspree and add your email.
2. Create a new form, then copy the endpoint URL (looks like: https://formspree.io/f/xxxxx).
3. In `index.html`, replace:

   action="https://formspree.io/f/REPLACE_ME"

   with your real endpoint.

### Option B — Netlify Forms (if you host on Netlify)
1. Deploy to Netlify.
2. Add `netlify` attribute to the `<form>` tag and remove the Formspree action.
3. Netlify will capture submissions in your Netlify dashboard.

## 3) Free hosting (suggested)
### GitHub Pages (free)
- Create a repo named `ampm-arch.com`
- Upload the files
- Settings → Pages → Deploy from branch → main / root

### Custom domain
Point your domain DNS to the host you pick (Cloudflare recommended for DNS).

## Notes
- If Formspree is not configured, the site will automatically fall back to opening a mailto link
  to `austin@ampm-arch.com` so inquiries still work.
