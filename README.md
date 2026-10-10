# Gentle Touch Barber – website

Static one-page site. No build step: upload the whole folder to any web host
(e.g. the shop's domain, Netlify, GitHub Pages) and `index.html` is the homepage.

## Structure
- `index.html` – page content
- `assets/css/style.css` – styles (colours and fonts set as variables at the top)
- `assets/js/main.js` – open/closed status (Vienna time), copy-number button, Google Map embed
- `assets/img/` – photos and favicon
- `assets/fonts/` – self-hosted fonts (no requests to Google Fonts)

## Before going live
- Add an Impressum page (required for Austrian business websites, § 5 ECG / § 25 MedienG).
- Add a privacy policy; mention the embedded Google Map.
- Confirm consent from the clients shown in the photos.
- Check the "Haircut + beard trim" price (€20, same as a haircut alone).

## Editing
- Prices: search `class="prices"` in `index.html`.
- Hours: the table in `index.html` and the times in `assets/js/main.js` (10:00 = 600, 19:00 = 1140 minutes).
