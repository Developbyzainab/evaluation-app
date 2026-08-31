# NextAuth Configuration Error - Complete Fix Guide

## ❌ Problem: "Configuration" Error

This error appears when NextAuth cannot properly initialize due to missing environment setup or a stale development server.

## ✅ Step-by-Step Fix

### Step 1: Stop the Current App
In your terminal where `npm run dev` is running:
```
Press Ctrl + C
```

Wait for the server to fully stop (you should see the prompt return).

### Step 2: Verify MongoDB is Running
Open a **NEW terminal window** and start MongoDB:
```bash
mongod
```

You should see:
```
[initandlisten] Waiting for connections on port 27017
```

Leave this terminal open!

### Step 3: Verify Environment Variables
Your `.env.local` should have:
```
MONGODB_URI=mongodb://localhost:27017/skilleval
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=32e7c9d8a1f2b4c6e9a3d5f7h1j3k5m7n9p1q3r5s7t9u1v3w5x7y9z1a3b5c7
OPENAI_API_KEY=your_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

APPLE_CLIENT_ID=your_apple_client_id
APPLE_CLIENT_SECRET=your_apple_client_secret
APPLE_TEAM_ID=your_apple_team_id
APPLE_KEY_ID=your_apple_key_id
APPLE_PRIVATE_KEY=your_apple_private_key
```

### Step 4: Clear Node Cache
```bash
# Remove Next.js build cache
rm -r .next

# On Windows (PowerShell):
Remove-Item -Path .next -Recurse -Force
```

### Step 5: Restart the App
```bash
npm run dev
```

Wait for it to say:
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
```

### Step 6: Clear Browser Cache & Cookies
1. Press `F12` to open DevTools
2. Go to **Application** tab
3. Click **Storage** → **Clear site data**
4. Or: Use incognito/private window to avoid cached auth

### Step 7: Test Login
1. Go to: http://localhost:3000/auth/login
2. Email: `test@example.com`
3. Password: `password123`
4. Click **Sign In**

**First time?** System auto-registers you. Use same credentials next time.

## 🔍 If "Configuration" Error Still Appears

### Option A: Check Terminal for Real Error
Look at the terminal running `npm run dev` for detailed error messages like:
- `MONGODB_URI is not defined`
- `MongoDB connection failed`
- `NEXTAUTH_SECRET is missing`

### Option B: Test MongoDB Connection
```bash
node scripts/test-connection.js
```

Should output:
```
✅ MongoDB connection successful!
```

### Option C: Check Browser Console
1. Press `F12`
2. Go to **Console** tab
3. Look for errors starting with `[Auth]`
4. Copy the error and check the DEBUGGING.md file

## 🚀 Quick Checklist Before Testing

- [ ] Ctrl+C stopped the app
- [ ] `mongod` running in separate terminal
- [ ] `.env.local` has `NEXTAUTH_SECRET` (64+ chars)
- [ ] `.env.local` has `NEXTAUTH_URL=http://localhost:3000`
- [ ] `.next` folder was deleted
- [ ] `npm run dev` shows ready message
- [ ] Browser cache cleared
- [ ] Using http://localhost:3000 (not 127.0.0.1)

## ✨ If Everything Works

You should see:
1. Login page loads
2. Enter email/password
3. Click Sign In
4. Redirected to /test (or dashboard)

**Success!** 🎉
