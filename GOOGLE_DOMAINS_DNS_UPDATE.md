# 🌐 Google Domains DNS Update Guide

## Current Problem
✅ Domain assigned to Vercel project
❌ DNS still pointing to Squarespace (198.49.23.145)
🎯 Need to change DNS to Vercel (76.76.21.21)

---

## Step-by-Step Instructions

### Step 1: Access Google Domains DNS

**Direct Link:**
https://domains.google.com/registrar/selfactualize.life/dns

Or navigate:
1. Go to https://domains.google.com/
2. Click on **selfactualize.life**
3. Click **"DNS"** in the left menu

---

### Step 2: Find "Custom resource records" Section

Look for a table that shows your current DNS records.

---

### Step 3: Update A Records

#### Current Configuration (SQUARESPACE - DELETE):
```
Type    Name    Data
A       @       198.49.23.145   ← DELETE THIS ROW
```

#### New Configuration (VERCEL - ADD):
```
Type    Name    Data            TTL
A       @       76.76.21.21     3600
A       www     76.76.21.98     3600
```

---

### Step 4: Exact Changes to Make

**Action 1: Delete Squarespace A Record**
- Find row with: `A @ 198.49.23.145`
- Click **"Delete"** or **trash icon**

**Action 2: Add Vercel Root Domain A Record**
- Click **"Add"** or **"Create new record"**
- Type: **A**
- Name: **@** (or leave blank)
- Data/IP: **76.76.21.21**
- TTL: **3600** (or leave default)
- Click **"Add"** or **"Save"**

**Action 3: Add Vercel www A Record**
- Click **"Add"** or **"Create new record"**
- Type: **A**
- Name: **www**
- Data/IP: **76.76.21.98**
- TTL: **3600** (or leave default)
- Click **"Add"** or **"Save"**

**Action 4: Save All Changes**
- Click **"Save"** or **"Apply changes"** at the bottom

---

### Step 5: Wait for DNS Propagation

**Timeline:**
- Fastest: 5-15 minutes
- Typical: 30 minutes - 2 hours
- Maximum: 24-48 hours

**Check Progress:**
Visit: https://www.whatsmydns.net/#A/selfactualize.life
- Should show: **76.76.21.21** (when ready)

---

## Verification (After DNS Update)

### Check DNS Command:
```bash
dig selfactualize.life +short
```
**Expected result:** `76.76.21.21`

### Visit Your Site:
https://selfactualize.life
**Expected:** Your new Vercel store with books!

---

## Troubleshooting

### If you can't find the DNS records section:
1. Make sure you're logged into the correct Google account
2. Check if domain is actually at Google Domains
3. Look for "DNS", "Name servers", or "Advanced DNS" sections

### If changes don't save:
1. Try refreshing the page
2. Clear browser cache
3. Try a different browser
4. Contact Google Domains support

### If site still shows Squarespace after 24 hours:
1. Verify DNS with: `dig selfactualize.life +short`
2. Clear browser cache completely
3. Try incognito/private mode
4. Try different device/network
5. Check Vercel dashboard for domain status

---

## After Migration is Complete

### 1. Test Your New Site
- Visit: https://selfactualize.life/books
- Test checkout with: 4242 4242 4242 4242
- Verify all pages work

### 2. SSL Certificate
- Vercel auto-generates SSL (takes 1-2 hours)
- Your site will have https:// automatically

### 3. Cancel Squarespace
Once you confirm the new site is live:
1. Go to: https://account.squarespace.com/
2. Find your site
3. Cancel subscription
4. **IMPORTANT:** Keep your Google Domains registration!

---

## DNS Records Comparison

| Record | Squarespace (OLD) | Vercel (NEW) |
|--------|-------------------|--------------|
| Root @ | 198.49.23.145 | 76.76.21.21 |
| www | CNAME to ext-sq.squarespace.com | A to 76.76.21.98 |

---

## Need Help?

**Vercel Domain Settings:**
https://vercel.com/brandons-projects-c4dfa14a/selfactualize/settings/domains

**Google Domains Support:**
https://support.google.com/domains/

**DNS Checker:**
https://www.whatsmydns.net/#A/selfactualize.life

---

**Once DNS updates, your store goes LIVE!** 🚀
