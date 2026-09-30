import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const revalidate = 0;

const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;
const INTEGRATIONS_PATH = isServerless
  ? path.join('/tmp', 'integrations.json')
  : path.join(process.cwd(), 'data', 'integrations.json');

async function ensureDB() {
  try {
    await fs.access(INTEGRATIONS_PATH);
  } catch {
    await fs.mkdir(path.dirname(INTEGRATIONS_PATH), { recursive: true });
    await fs.writeFile(INTEGRATIONS_PATH, '{}');
  }
}

async function readAll() {
  await ensureDB();
  const raw = await fs.readFile(INTEGRATIONS_PATH, 'utf-8');
  return JSON.parse(raw);
}

async function writeAll(data: any) {
  await ensureDB();
  await fs.writeFile(INTEGRATIONS_PATH, JSON.stringify(data, null, 2));
}

// GET integration states & API key for a user
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

  try {
    const all = await readAll();
    const userIntegrations = all[email] || {};

    // Ensure API Key exists
    if (!userIntegrations.apiKey) {
      userIntegrations.apiKey = `hz_live_${crypto.randomBytes(16).toString('hex')}`;
      all[email] = userIntegrations;
      await writeAll(all);
    }

    return NextResponse.json(userIntegrations);
  } catch (error) {
    console.error('[Integrations GET]', error);
    return NextResponse.json({ error: 'Failed to read integrations' }, { status: 500 });
  }
}

// POST toggle integration, generate API key, or perform verified webhook test
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, integrationName, connected, webhookTestUrl, action } = body;

    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    const all = await readAll();
    if (!all[email]) all[email] = {};

    // Action to regenerate API Key
    if (action === 'generate_api_key') {
      const newKey = `hz_live_${crypto.randomBytes(16).toString('hex')}`;
      all[email].apiKey = newKey;
      await writeAll(all);
      return NextResponse.json({ success: true, apiKey: newKey, data: all[email] });
    }

    // Toggle specific integration connection
    if (integrationName) {
      all[email][integrationName] = {
        connected: connected ?? false,
        connectedAt: connected ? new Date().toISOString() : null,
        lastSync: connected ? 'Just now' : 'Never',
      };
    }

    // Webhook Test URL Execution & Real Verification
    if (webhookTestUrl !== undefined) {
      let trimmedUrl = webhookTestUrl.trim();
      if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
        trimmedUrl = `https://${trimmedUrl}`;
      }

      // Verify URL formatting
      let parsedUrl: URL;
      try {
        parsedUrl = new URL(trimmedUrl);
      } catch {
        return NextResponse.json(
          { error: 'Invalid URL format. Please include http:// or https://' },
          { status: 400 }
        );
      }

      const eventId = `evt_${crypto.randomBytes(8).toString('hex')}`;
      const timestamp = new Date().toISOString();
      const apiKey = all[email].apiKey || `hz_live_${crypto.randomBytes(16).toString('hex')}`;
      all[email].apiKey = apiKey;

      const samplePayload = {
        event: 'conversion_leak.detected',
        event_id: eventId,
        timestamp,
        site_id: 'site_nexus_01',
        url: 'https://example.com',
        horizons_score: 72,
        persona: 'skeptical-buyer',
        severity: 'high',
        leak_details: {
          category: 'trust',
          title: 'Missing Social Proof & Trust Badges',
          impact: '-8 points penalty',
          recommendation: 'Add customer testimonials and security badges above the fold'
        },
        revenue_impact: {
          estimated_monthly_loss_pct: '7-12%'
        }
      };

      const payloadString = JSON.stringify(samplePayload);
      const signature = crypto
        .createHmac('sha256', apiKey)
        .update(payloadString)
        .digest('hex');

      let responseStatus = 'success';
      let statusCode = 200;
      let statusText = 'OK';
      let errorMessage = null;
      let responseTimeMs = 0;
      let isSimulated = false;

      const isPlaceholder =
        parsedUrl.hostname === 'your-domain.com' ||
        parsedUrl.hostname === 'example.com' ||
        (parsedUrl.hostname === 'localhost' && parsedUrl.port === '');

      const startTime = Date.now();

      if (!isPlaceholder) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 7000);

          const res = await fetch(parsedUrl.href, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'User-Agent': 'HorizonsAI-Webhook-Engine/1.0',
              'X-Horizons-Event': 'conversion_leak.detected',
              'X-Horizons-Delivery': eventId,
              'X-Horizons-Signature': `sha256=${signature}`,
            },
            body: payloadString,
            signal: controller.signal,
          });

          clearTimeout(timeoutId);
          responseTimeMs = Date.now() - startTime;
          statusCode = res.status;
          statusText = res.statusText || (res.ok ? 'OK' : 'Error');

          if (!res.ok) {
            responseStatus = 'failed';
            errorMessage = `Endpoint returned HTTP ${res.status} ${statusText}`;
          }
        } catch (fetchErr: any) {
          responseTimeMs = Date.now() - startTime;
          responseStatus = 'failed';
          statusCode = 0;
          statusText = 'Connection Error';
          if (fetchErr.name === 'AbortError') {
            errorMessage = 'Request timed out after 7000ms';
          } else {
            errorMessage = fetchErr.message || 'Failed to reach webhook target server';
          }
        }
      } else {
        // Simulated response for placeholder URLs
        responseTimeMs = 38;
        statusCode = 202;
        statusText = 'Accepted (Simulated)';
        isSimulated = true;
      }

      all[email].__webhookTest = {
        url: parsedUrl.href,
        lastTested: timestamp,
        status: responseStatus,
        statusCode,
        statusText,
        responseTimeMs,
        errorMessage,
        isSimulated,
        signature: `sha256=${signature}`,
        payload: samplePayload,
      };
    }

    await writeAll(all);
    return NextResponse.json({ success: true, data: all[email] });
  } catch (error: any) {
    console.error('[Integrations POST]', error);
    return NextResponse.json({ error: error.message || 'Failed to update' }, { status: 500 });
  }
}

