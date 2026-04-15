# ElleOhElle Media — Website

Portfolio, reel, and booking site for ElleOhElle Media.  
Built with vanilla HTML/CSS/JS + Azure Static Web Apps + Azure Functions.

---

## Project Structure

```
elleohelle-media/
├── index.html                          ← Main site (single page)
├── src/
│   ├── style.css                       ← All styles
│   └── main.js                         ← Nav, scroll reveal, form logic
├── api/
│   ├── booking.js                      ← Azure Function: handles form submissions
│   └── package.json
├── staticwebapp.config.json            ← Azure routing + headers config
├── .github/
│   └── workflows/
│       └── azure-static-web-apps.yml  ← CI/CD pipeline
└── .gitignore
```

---

## Quick Start (Local)

1. **Clone the repo** and open `index.html` in a browser — the static site works with no build step.

2. **To test the API locally**, install the [Azure Functions Core Tools](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local):
   ```bash
   npm install -g azure-functions-core-tools@4
   cd api && npm install
   func start
   ```

---

## Deploy to Azure Static Web Apps

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/elleohelle-media.git
git push -u origin main
```

### Step 2 — Create an Azure Static Web App

1. Go to [portal.azure.com](https://portal.azure.com)
2. **Create a resource** → search "Static Web App"
3. Fill in:
   - **Subscription**: your subscription
   - **Resource group**: create new → `elleohelle-rg`
   - **Name**: `elleohelle-media`
   - **Region**: East US 2 (or closest to you)
   - **Plan**: Free
   - **Deployment source**: GitHub
4. Sign into GitHub and select your repo + `main` branch
5. **Build details**:
   - App location: `/`
   - API location: `api`
   - Output location: *(leave blank)*
6. Click **Review + Create** → **Create**

Azure will automatically add the `AZURE_STATIC_WEB_APPS_API_TOKEN` secret to your GitHub repo and push the workflow file. Your site will be live within ~2 minutes at a URL like `https://happy-stone-123abc.azurestaticapps.net`.

### Step 3 — Add a Custom Domain (optional)

1. In Azure portal → your Static Web App → **Custom domains**
2. Add your domain (e.g. `elleohelle.media`) and follow DNS validation steps

---

## Enable Email Notifications for Booking Inquiries

To receive an email every time someone fills out the booking form:

1. Create a [SendGrid](https://sendgrid.com) account (free tier: 100 emails/day)
2. Verify your sender email address in SendGrid
3. Get your SendGrid API key
4. In Azure portal → your Static Web App → **Configuration** → add:
   - `SENDGRID_API_KEY` = your key
   - `TO_EMAIL` = your inbox (e.g. `elle@elleohelle.media`)
   - `FROM_EMAIL` = your verified SendGrid sender
5. In `api/booking.js`, uncomment the SendGrid block and add the package:
   ```bash
   cd api && npm install @sendgrid/mail
   ```
6. Push the change — it'll redeploy automatically.

---

## Updating Content

Everything is in `index.html`. The sections to update:

| Section | What to change |
|---|---|
| **Hero** | Title lines, eyebrow text |
| **Work grid** | Replace `.thumb-placeholder` divs with real `<img>` tags |
| **Films / Reel** | Replace the YouTube embed `src` with your actual video URL |
| **About** | Bio text, photo |
| **Services** | Descriptions and pricing |
| **Footer** | Social links (already pointing to your profiles) |

### Adding Real Photos

Replace any `<div class="thumb-placeholder">` with:
```html
<img src="path/to/your/photo.jpg" alt="Description" loading="lazy" />
```

For the about photo, replace `.about-photo-placeholder` with an `<img>` tag.

---

## YouTube Embed

Update the iframe `src` in the Films section to embed a specific video or playlist:

```html
<!-- Single video -->
src="https://www.youtube.com/embed/VIDEO_ID"

<!-- Channel playlist (all uploads) -->
src="https://www.youtube.com/embed?listType=user_uploads&list=elleohelle8490"
```

---

## Tech Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES2020+) — no framework, no bundler
- **Hosting**: Azure Static Web Apps (Free tier)
- **API**: Azure Functions v4 (Node.js 18+)
- **CI/CD**: GitHub Actions
- **Fonts**: Cormorant Garamond + Karla (Google Fonts)
- **Email** (optional): SendGrid

---

*Built for ElleOhElle Media.*
