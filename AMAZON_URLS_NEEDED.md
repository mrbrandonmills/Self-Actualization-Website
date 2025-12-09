# 🛒 Amazon URLs Needed for Your Books

## ✅ What We Did

All books now link directly to Amazon with multiple format options (Kindle, Paperback, Hardcover).

The new book store is:
- ✅ **Fast** - No 3D/museum features, just clean beautiful pages
- ✅ **Simple** - Each book shows format options with one click to Amazon
- ✅ **Beautiful** - Liquid glass theme with gorgeous hover effects
- ✅ **Mobile-Friendly** - Responsive grid layout

## 📝 Amazon URLs You Need to Add

Go to `src/data/books.ts` and replace the placeholder URLs with your real Amazon ASINs:

### Block A - Engineering Your Patterns

```typescript
formats: [
  {
    type: 'Kindle',
    price: 799, // $7.99
    amazonUrl: 'https://www.amazon.com/dp/BLOCK_A_KINDLE_ASIN'  // ← Replace with your ASIN
  },
  {
    type: 'Paperback',
    price: 1499, // $14.99
    amazonUrl: 'https://www.amazon.com/dp/BLOCK_A_PAPERBACK_ASIN'  // ← Replace with your ASIN
  }
]
```

### Block B - The Laboratory of Judgment

```typescript
formats: [
  {
    type: 'Kindle',
    price: 999, // $9.99
    amazonUrl: 'https://www.amazon.com/dp/BLOCK_B_KINDLE_ASIN'  // ← Replace with your ASIN
  },
  {
    type: 'Paperback',
    price: 1699, // $16.99
    amazonUrl: 'https://www.amazon.com/dp/BLOCK_B_PAPERBACK_ASIN'  // ← Replace with your ASIN
  }
]
```

### Block C - The Laboratory of Living

```typescript
formats: [
  {
    type: 'Kindle',
    price: 999, // $9.99
    amazonUrl: 'https://www.amazon.com/dp/BLOCK_C_KINDLE_ASIN'  // ← Replace with your ASIN
  },
  {
    type: 'Paperback',
    price: 1699, // $16.99
    amazonUrl: 'https://www.amazon.com/dp/BLOCK_C_PAPERBACK_ASIN'  // ← Replace with your ASIN
  }
]
```

### Trilogy - Complete Collection (3 formats!)

```typescript
formats: [
  {
    type: 'Kindle',
    price: 2499, // $24.99
    amazonUrl: 'https://www.amazon.com/dp/TRILOGY_KINDLE_ASIN'  // ← Replace with your ASIN
  },
  {
    type: 'Paperback',
    price: 4999, // $49.99
    amazonUrl: 'https://www.amazon.com/dp/TRILOGY_PAPERBACK_ASIN'  // ← Replace with your ASIN
  },
  {
    type: 'Hardcover',
    price: 6999, // $69.99
    amazonUrl: 'https://www.amazon.com/dp/TRILOGY_HARDCOVER_ASIN'  // ← Replace with your ASIN
  }
]
```

## 📸 Book Covers Status

- ✅ **Block A** - Has real cover (`/public/books/block-a/1.png`)
- ⚠️ **Block B** - Temporary placeholder (replace at `/public/books/block-b/cover.png`)
- ⚠️ **Block C** - Temporary placeholder (replace at `/public/books/block-c/cover.png`)
- ⚠️ **Trilogy** - Temporary placeholder (replace at `/public/books/trilogy/cover.png`)

## 🚀 Deployment Status

**Production URL:** https://selfactualize-ic7kvz6ju-brandons-projects-c4dfa14a.vercel.app

**Custom Domain:** https://selfactualize.life (DNS propagating)

## 📋 Next Steps

1. **Get your Amazon ASINs** for all book formats
2. **Update `src/data/books.ts`** with real Amazon URLs
3. **Replace book covers** for Blocks B, C, and Trilogy
4. **Redeploy:**
   ```bash
   npx vercel --prod
   ```

## 🎨 How the New Store Works

### Books Page (`/books`)
- Shows all 4 books in a clean grid
- Each book displays:
  - Cover image
  - Title and subtitle
  - Author (Jesse Doherty & Brandon Mills)
  - Description
  - Format buttons (Kindle, Paperback, Hardcover)
  - Price for each format
  - Direct links to Amazon with affiliate tracking

### Home Page
- Features your real books in the horizontal scroll section
- No more placeholder books!
- Each book links to Amazon
- Beautiful gradients and animations

## 💡 Affiliate Tracking

All Amazon links automatically include your affiliate tag:
```
?tag=selfactualize.life-20
```

This is configured in `src/data/books.ts:28`

## ✨ What Changed

### Removed:
- ❌ Stripe checkout (too complex for simple book sales)
- ❌ Shopping cart system
- ❌ Museum 3D features (made it slow)
- ❌ Complex 3D gallery navigation
- ❌ Placeholder books (The Infinite Garden, Echoes of Silence, etc.)

### Added:
- ✅ Multiple format support (Kindle, Paperback, Hardcover)
- ✅ Direct Amazon affiliate links
- ✅ Clean, fast book grid
- ✅ Beautiful hover effects
- ✅ Mobile-responsive design
- ✅ Your real book data on home page

---

**Ready to go live!** Just add your Amazon ASINs and book covers, then redeploy.
