# Horizons - AI Trust & Conversion Intelligence

Horizons analyzes websites using AI agents to detect trust issues, conversion leaks, and performance problems. It uses Puppeteer to crawl websites and OpenAI GPT-4o-mini to extract behavioral insights from different user personas.

## Setup & Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Rename `.env.example` to `.env` and fill in your keys:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   STRIPE_SECRET_KEY=your_stripe_secret_key_here
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3001](http://localhost:3001)** to view the application.

## Deploying to Vercel

1. Push your repository to GitHub.
2. Log into [Vercel](https://vercel.com/) and create a new project.
3. Import your GitHub repository.
4. **Environment Variables**: Add your `OPENAI_API_KEY` and `STRIPE_SECRET_KEY` in the Vercel dashboard during setup.
5. **Chromium Note for Vercel**: 
   Since Vercel environments have strict limits, we are using the `chromium` package locally. For Vercel Serverless Functions to successfully launch Puppeteer, Vercel requires `@sparticuz/chromium`. It is already defined in `package.json`. 
   If Vercel build fails to locate the Chromium executable, ensure that in `lib/crawler.ts` you configure `executablePath` appropriately based on the environment. Currently, it defaults to the `chromium` binary path or standard environment overrides.
6. Click **Deploy**.

## Tech Stack
- Next.js 14 (App Router)
- React & Tailwind CSS
- Puppeteer Core & Chromium (Web Scraping)
- OpenAI API (Agent Analysis)
- Stripe (Payments)
