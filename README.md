# Live Stage — Concert & Love Songs Curation

An interactive website curating the best 4K live concert videos and love songs from Celine Dion, Shakira, Enrique Iglesias, and world music performers.

## Features

- **50+ curated videos** across 9 categories
- **YouTube embeds** — click any video card to watch in a modal
- **Sortable table** — by date, duration, title
- **Search** — filter by title, artist, or description
- **Category tabs** — Celine Dion, Shakira, Enrique Iglesias, Love Songs, African & Afrobeat, Latin & Cuban, Flamenco & Spanish
- **Shakira 4K Playlist** — embedded YouTube playlist (34 videos)
- **Best Love Songs** — Elvis Presley, Neil Diamond, Lobo, Bryan Adams, Whitney Houston, Eric Clapton, Lionel Richie, Luther Vandross & Mariah Carey, and Grammy winners

## How to Run

```bash
npx serve -l 3333
```

Then open http://localhost:3333

Or open `index.html` directly in a browser (some features may require a local server for CORS).

## Structure

- `index.html` — Page structure and sections
- `style.css` — Concert-stage dark theme with gold accent
- `data.js` — Video metadata (videoId, title, duration, date, views)
- `app.js` — Tabs, search, sort, modal, table logic

## Playlist

The Shakira Best 4K playlist is embedded from:
https://youtube.com/playlist?list=PLl1nGeQ1UIbw0lAfx8bVlPcF61i_jV5Ec
