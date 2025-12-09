# 🌐 DNS Migration Checklist - Squarespace to Vercel

## Current Status
- ✅ Domain registered with: **Google Domains**
- ✅ Domain added to Vercel project: **selfactualize**
- ❌ DNS still pointing to: **Squarespace**
- 🎯 Target: **Vercel**

---

## DNS Records Needed

### Current (Squarespace):
```
A @ 198.49.23.145
CNAME www ext-sq.squarespace.com
```

### New (Vercel):
```
A @ 76.76.21.21
A www 76.76.21.98
```

---

## Step-by-Step Instructions

### 1. Login to Google Domains
- Go to: https://domains.google.com/
- Find: **selfactualize.life**
- Click: **"DNS"** or **"Manage"**

### 2. Update DNS Records

**Delete these records:**
- ❌ A record pointing to `198.49.23.145`
- ❌ CNAME record for www pointing to `ext-sq.squarespace.com`

**Add these records:**

#### Record 1 (Root domain):
```
Type: A
Host: @ (or leave blank)
Value: 76.76.21.21
TTL: 3600 (or Auto)
```

#### Record 2 (www subdomain):
```
Type: A
Host: www
Value: 76.76.21.98
TTL: 3600 (or Auto)
```

### 3. Save Changes

Click **"Save"** or **"Apply Changes"**

### 4. Wait for DNS Propagation

- **Typical time:** 5-30 minutes
- **Maximum:** 24-48 hours
- Check status: https://www.whatsmydns.net/#A/selfactualize.life

---

## Verification Commands

After updating DNS, run these to verify:

```bash
# Check root domain
dig selfactualize.life +short
# Should show: 76.76.21.21

# Check www subdomain
dig www.selfactualize.life +short
# Should show: 76.76.21.98
```

---

## After DNS Propagates

### Test Your Live Site
1. Visit: https://selfactualize.life
2. Should load your new Vercel site! 🎉

### SSL Certificate
- Vercel will automatically generate SSL (HTTPS)
- This happens within 1-2 hours after DNS is correct

### Cancel Squarespace
1. Once site is live on Vercel
2. Go to: https://account.squarespace.com/
3. Cancel your Squarespace subscription
4. Keep domain at Google Domains (don't cancel that!)

---

## Troubleshooting

### If domain doesn't load after 24 hours:

1. **Verify DNS records are correct:**
   ```bash
   dig selfactualize.life +short
   ```

2. **Check Vercel domain status:**
   - Go to: https://vercel.com/dashboard
   - Your project → Settings → Domains
   - Should show green checkmark ✅

3. **Force DNS refresh:**
   - Clear browser cache
   - Use incognito mode
   - Try different device/network

### If SSL certificate issues:

1. Wait 1-2 hours after DNS propagates
2. Vercel auto-generates SSL certificates
3. Check status in Vercel dashboard

---

## Alternative: Nameserver Method

If A records don't work, use nameservers instead:

1. In Google Domains → **"Nameservers"**
2. Select **"Use custom nameservers"**
3. Enter:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
4. Save (takes 24-48 hours to propagate)

---

## Quick Reference

| Setting | Current (Squarespace) | New (Vercel) |
|---------|----------------------|--------------|
| Root A | 198.49.23.145 | 76.76.21.21 |
| www A | Via CNAME | 76.76.21.98 |

---

**Once DNS updates, your store will be LIVE on selfactualize.life!** 🚀
