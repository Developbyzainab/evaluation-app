# CredentialsSignin Error - Debugging Guide

## What This Error Means
`CredentialsSignin` occurs when the credentials provider's `authorize` function returns `null` or fails to authenticate.

## Common Causes & Solutions

### 1. ❌ MongoDB is NOT running
```bash
# Check if MongoDB is running in another terminal
mongod

# Or if using MongoDB Atlas, verify connection string in .env.local
MONGODB_URI=mongodb://localhost:27017/skilleval
```

### 2. ❌ First Login vs Registration Confusion
- **First time?** The system automatically registers you with email/password
- Then use the same email/password to login
- If it fails, check browser console for detailed error logs

### 3. ❌ Empty or Invalid Credentials
- Email cannot be empty
- Password cannot be empty
- Email must be valid format

### 4. ❌ Database Connection Issues
Run this to test:
```bash
node scripts/test-connection.js
```

## What to Check

### Step 1: Browser Console
1. Open DevTools (F12)
2. Check Console tab for error logs
3. Look for messages like `[Auth] ...`
4. Note the exact error message

### Step 2: Check MongoDB
```bash
# Terminal 1: Start MongoDB
mongod

# Terminal 2: Check connection
node scripts/test-connection.js
```

### Step 3: Check Environment
Verify `.env.local` has:
```
MONGODB_URI=mongodb://localhost:27017/skilleval
NEXTAUTH_SECRET=your-super-secret-jwt-key-change-in-production
NEXTAUTH_URL=http://localhost:3000
```

### Step 4: App Logs
When starting `npm run dev`, check for errors like:
- "MONGODB_URI not defined"
- "Connection refused"
- Database errors

## Testing the Auth Flow

### Test 1: First-time Registration
1. Go to http://localhost:3000/auth/login
2. Enter email: `test@example.com`
3. Enter password: `password123`
4. Click Sign In (auto-registers if first time)

### Test 2: Login with Existing Account
1. Go to http://localhost:3000/auth/login
2. Use same email/password from Test 1
3. Should login successfully

### Test 3: Check Database
```bash
# In MongoDB shell
use skilleval
db.users.find()
```

## Error Messages & What They Mean

| Error | Cause | Fix |
|-------|-------|-----|
| `CredentialsSignin` | Auth failed | Check console logs, verify DB connection |
| `Invalid email or password` | Wrong credentials | Verify email/password are correct |
| `Email required` | Missing email field | Enter email |
| `Password required` | Missing password field | Enter password |
| Connection error | MongoDB down | Start: `mongod` |

## Debug Logs Location
When you try to login, check:
1. **Browser Console** (F12) → Look for `[Auth]` messages
2. **Terminal** where you ran `npm run dev` → Server-side errors

## Quick Checklist
- [ ] MongoDB is running (`mongod` in terminal)
- [ ] `.env.local` has all required variables
- [ ] Run `npm run dev` and open http://localhost:3000/auth/login
- [ ] Check browser console (F12) for errors
- [ ] Try registering with a new email/password first
