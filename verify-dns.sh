#!/bin/bash

echo "🔍 Checking DNS for selfactualize.life..."
echo ""

# Check root domain
echo "Root domain (@):"
ROOT_IP=$(dig selfactualize.life +short | head -1)
echo "Current IP: $ROOT_IP"
if [ "$ROOT_IP" = "76.76.21.21" ]; then
    echo "✅ ROOT DOMAIN CORRECT - Pointing to Vercel!"
else
    echo "❌ Still pointing to old IP (Squarespace: 198.49.23.145)"
    echo "   Expected: 76.76.21.21 (Vercel)"
fi

echo ""

# Check www subdomain
echo "WWW subdomain:"
WWW_IP=$(dig www.selfactualize.life +short | head -1)
echo "Current IP: $WWW_IP"
if [ "$WWW_IP" = "76.76.21.98" ]; then
    echo "✅ WWW CORRECT - Pointing to Vercel!"
else
    echo "❌ Still pointing to old IP"
    echo "   Expected: 76.76.21.98 (Vercel)"
fi

echo ""
echo "📊 DNS Propagation Status:"
echo "Visit: https://www.whatsmydns.net/#A/selfactualize.life"
