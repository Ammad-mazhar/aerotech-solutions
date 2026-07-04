# Aerotech Solution Inc — Backend Server

Express.js API that handles contact form submissions and service bookings.
Sends HTML email notifications via Gmail SMTP (Nodemailer).

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| POST | `/api/contact` | Contact form — notifies company + sends auto-reply |
| POST | `/api/book` | Service booking — notifies company + sends confirmation |

### POST `/api/contact` — required fields

```json
{
  "name": "John Smith",
  "email": "john@example.com",
  "phone": "555-0100",
  "subject": "Washer repair",
  "message": "My washer stopped spinning..."
}
```

`phone` is optional. All other fields are required.

---

## Local Setup

### 1. Install dependencies

```bash
cd server
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in:

| Variable | Description |
|----------|-------------|
| `EMAIL_USER` | Gmail address used to send emails (`aerotechsolutions@gmail.com`) |
| `EMAIL_PASS` | 16-character Gmail App Password (see below) |
| `COMPANY_EMAIL` | Inbox that receives notifications (defaults to `EMAIL_USER`) |
| `ALLOWED_ORIGIN` | Your frontend URL, e.g. `https://aerotechsolutioninc.com` |

#### Generating a Gmail App Password

1. Go to your Google Account → **Security**
2. Enable **2-Step Verification** (required)
3. Visit [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
4. Select **Mail** → **Other (custom name)** → name it "Aerotech Server"
5. Copy the 16-character password into `EMAIL_PASS`

### 3. Start the server

```bash
# Development (auto-restart on changes)
npm run dev

# Production
npm start
```

---

## Deploy to Railway

1. Push this `server/` folder to a GitHub repo (or use the full repo)
2. Go to [railway.app](https://railway.app) → **New Project → Deploy from GitHub**
3. Select the repo; set **Root Directory** to `server` if needed
4. Add environment variables under **Variables** (copy from `.env.example`)
5. Railway auto-detects Node.js and runs `npm start`
6. Copy the generated URL (e.g. `https://your-app.up.railway.app`)

## Deploy to Render

1. Go to [render.com](https://render.com) → **New → Web Service**
2. Connect your GitHub repo
3. Set **Root Directory** to `server`
4. **Build Command:** `npm install`
5. **Start Command:** `npm start`
6. Add environment variables under **Environment**
7. Copy the generated URL (e.g. `https://your-app.onrender.com`)

> **Free tier note:** Render spins down idle services after 15 minutes.
> The first request after inactivity may take ~30 seconds to respond.

---

## Connecting the Frontend

Update your contact form fetch URL to point at the deployed server:

```js
// src/components/ContactForm.jsx (or wherever your form lives)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

await fetch(`${API_URL}/api/contact`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, phone, subject, message }),
});
```

Add `VITE_API_URL=https://your-deployed-server.com` to your frontend `.env`.

---

## Security Features

- **Helmet** — sets secure HTTP headers
- **Rate limiting** — global 100 req/15 min; contact form capped at 5 req/15 min per IP
- **Input sanitization** — strips all HTML tags from form fields (sanitize-html)
- **Body size limit** — requests over 10 KB are rejected
- **CORS** — restricted to `ALLOWED_ORIGIN` in production
