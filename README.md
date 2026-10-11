# 🛒 বাজার দর (BazarDor)

প্রয়োজনীয় পণ্যের দৈনিক বাজার দর এক নজরে — চাল, ডাল, সবজি, মাছ, মাংস ও আরও অনেক কিছু।

**Live:** _add link_ · **Repo:** _add link_

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
