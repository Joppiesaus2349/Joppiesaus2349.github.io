# Energy Videos — static site scaffold

This small scaffold provides a lightweight static website to display videos about energy. It's designed to be hosted on GitHub Pages (or any static host).

Files and folders
- `index.html` — home page
- `videos.html` — videos listing and player
- `assets/css/styles.css` — site styles
- `assets/js/main.js` — JavaScript to load `data/videos.json` and play videos
- `data/videos.json` — video metadata
- `assets/videos/` — put local video files here
- `assets/images/` — thumbnails and placeholders

How to add a video
- You can reference YouTube videos: add an entry with `type: "youtube"` and `id` equal to the YouTube video ID or full URL.
- Or add local files: put the file in `assets/videos/` and add an entry with `type: "local"` and `src` pointing to the file path.

Example (in `data/videos.json`):
```
{
  "type": "youtube",
  "id": "dQw4w9WgXcQ",
  "title": "What is Energy?",
  "description": "Short explainer"
}
```

Run locally
- Because this fetches `data/videos.json`, you should serve the folder with a static server. Examples:

Windows PowerShell (simple Python server):
```powershell
python -m http.server 8000
```

Then open http://localhost:8000 in your browser.

Deploy to GitHub Pages
- Push the repository to GitHub and enable GitHub Pages on the `main` branch (or `gh-pages`), then your site will be available at `https://<username>.github.io/<repo>/` or at your user site if named `<username>.github.io`.
