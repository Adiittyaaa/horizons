// lib/crawler.ts
import puppeteer from 'puppeteer-core';
import type { CrawlData } from '@/types';

/**
 * Crawl a website and collect basic performance/content metrics.
 * @param url Target URL (must include protocol)
 * @returns CrawlData object with extracted fields
 */
export async function crawlWebsite(url: string): Promise<CrawlData> {
  const startTime = Date.now();
  let browser;
  try {
    let options = {};
    if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
      const sparticuzChromium = require('@sparticuz/chromium');
      options = {
        args: sparticuzChromium.args,
        defaultViewport: sparticuzChromium.defaultViewport,
        executablePath: await sparticuzChromium.executablePath(),
        headless: sparticuzChromium.headless,
      };
    } else {
      const localChromium = require('chromium');
      const exePath = process.env.CHROME_EXECUTABLE_PATH || localChromium.path;
      options = {
        executablePath: exePath,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true,
      };
    }

    browser = await puppeteer.launch(options);
  } catch (err) {
    console.error('[Crawler] Failed to launch browser:', err);
    throw new Error('Unable to start headless browser');
  }

  const page = await browser.newPage();
  let brokenLinksCount = 0;
  page.on('requestfailed', () => {
    brokenLinksCount++;
  });

  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  } catch (error: any) {
    await browser.close();
    if (error.name === 'TimeoutError') {
      console.error('[Crawler] Timeout loading page:', url);
      throw new Error('Website took too long to load (>30s)');
    }
    console.error('[Crawler] Failed to load page:', error);
    throw new Error(`Failed to load website: ${error.message}`);
  }

  const loadTime = Date.now() - startTime;

  const data = await page.evaluate(() => {
    const title = document.title || '';
    const descriptionMeta = document.querySelector('meta[name="description"]');
    const description = descriptionMeta ? descriptionMeta.getAttribute('content') || '' : '';
    const bodyText = document.body ? document.body.innerText.slice(0, 10000) : '';
    const links = Array.from(document.querySelectorAll('a'))
      .map(a => (a as HTMLAnchorElement).href)
      .filter(href => href.startsWith('http'));
    const forms = document.querySelectorAll('form').length;
    const images = document.querySelectorAll('img').length;
    return { title, description, content: bodyText, links, forms, images };
  });

  await browser.close();

  return {
    url,
    title: data.title,
    description: data.description,
    content: data.content,
    links: data.links,
    forms: data.forms,
    images: data.images,
    loadTime,
    hasSSL: url.startsWith('https://'),
    hasBrokenLinks: brokenLinksCount > 0,
    brokenLinksCount,
  };
}
