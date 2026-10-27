
# 🛒 BazarDor — বাজার দর

### Your Everyday Market Price Guide

Explore essential grocery and food prices in one place, including rice, lentils, vegetables, fish, and meat.

BazarDor is a web application designed to make everyday market price information easier to explore through a clean, responsive interface.

**🌐 Live Demo:** https://as-7-bazardor.vercel.app

**💻 Repository:** https://github.com/fahmidulparvezt-pixel/As-7-Bazardor

## Technologies
Next.js (App Router) · TypeScript · Tailwind CSS · DaisyUI · BetterAuth · MongoDB · react-hot-toast

## Key Features
1. লাইভ প্রাইস টিকার (infinite marquee) ও বাংলা তারিখ সহ নেভবার
2. আজ দাম বাড়া/কমা Top 6 পণ্য এবং সব পণ্যের responsive grid
3. ক্যাটাগরি পেজে সর্টিং (ডিফল্ট / কম→বেশি / বেশি→কম), skeleton loading ও empty state
4. BetterAuth দিয়ে Email/Password, Google ও GitHub লগইন; protected product detail page
5. বাজারভিত্তিক দাম (min / max / avg) এবং প্রোফাইল আপডেট ফিচার

## Run locally
```bash
npm install
cp .env.example .env.local   # fill values
npm run dev
```
