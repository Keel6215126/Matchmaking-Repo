# 🚀 Deploying the Matchmaking Server to Vercel

This guide will help you deploy the matchmaking server so public lobbies work!

## What You'll Deploy

The `vercel-server` folder contains a simple API that tracks public game lobbies. It's **completely free** to host on Vercel!

## Prerequisites

- A free Vercel account (sign up at https://vercel.com)
- The Vercel CLI (optional but recommended)

## Method 1: Deploy via Web (Easiest)

### Step 1: Create a GitHub Repository
1. Go to https://github.com and create a new repository
2. Upload the `vercel-server` folder contents to the repository

### Step 2: Connect to Vercel
1. Go to https://vercel.com and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect the configuration
5. Click "Deploy"

### Step 3: Get Your API URL
1. After deployment, you'll get a URL like: `https://your-project.vercel.app`
2. Your API will be at: `https://your-project.vercel.app/api/lobbies`

### Step 4: Update the Game
1. Open `game.js` in a text editor
2. Find line 11:
   ```javascript
   const MATCHMAKING_API = 'http://localhost:3000/api/lobbies';
   ```
3. Replace it with your Vercel URL:
   ```javascript
   const MATCHMAKING_API = 'https://your-project.vercel.app/api/lobbies';
   ```
4. Save the file

✅ **Done!** Public lobbies now work!

---

## Method 2: Deploy via CLI

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy
```bash
cd vercel-server
vercel --prod
```

### Step 4: Update game.js
Follow Step 4 from Method 1 above.

---

## What the Server Does

The matchmaking API provides three endpoints:

- **GET /api/lobbies** - Lists all public lobbies
- **POST /api/lobbies** - Creates/updates a lobby
- **DELETE /api/lobbies** - Removes a lobby

Lobbies automatically expire after 30 minutes of inactivity.

---

## Testing Locally (Optional)

Want to test before deploying?

### Step 1: Install Dependencies
```bash
cd vercel-server
npm install vercel -g
```

### Step 2: Run Local Dev Server
```bash
vercel dev
```

This starts the server at `http://localhost:3000`

### Step 3: Test the Game
Open `index.html` with the default `MATCHMAKING_API` URL (localhost:3000)

---

## Vercel Limits (Free Tier)

- ✅ **100 GB bandwidth/month** - More than enough!
- ✅ **Serverless functions** - Perfect for this API
- ✅ **Automatic HTTPS** - Secure by default
- ✅ **Custom domains** - Optional but free!

---

## Troubleshooting

### "Error loading games" message
- **Cause**: Can't connect to matchmaking API
- **Fix**: Make sure you updated the `MATCHMAKING_API` URL in game.js

### Lobbies disappear quickly
- **Cause**: Lobbies expire after 30 minutes
- **Fix**: This is intentional! Inactive games are cleaned up automatically

### CORS errors in console
- **Cause**: API configuration issue
- **Fix**: The API already has CORS enabled. Make sure you're using HTTPS (not HTTP) for your Vercel URL

---

## Alternative: Run Without a Server

Don't want to deploy to Vercel? No problem!

**Private lobbies still work without the server!**

Just:
1. Keep the default `MATCHMAKING_API` URL
2. Don't use "Browse Public Games" - only create/join private games
3. Share Game IDs with friends manually

The peer-to-peer game itself doesn't need any server!

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- This is a simple serverless function - very beginner friendly!

---

**Once deployed, your friends can browse and join public games from anywhere! 🌐**
