import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

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

// GET integration states for a user
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

  try {
    const all = await readAll();
    return NextResponse.json(all[email] || {});
  } catch (error) {
    console.error('[Integrations GET]', error);
    return NextResponse.json({ error: 'Failed to read integrations' }, { status: 500 });
  }
}

// POST toggle an integration connection
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, integrationName, connected, webhookTestUrl } = body;

    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    const all = await readAll();
    if (!all[email]) all[email] = {};

    if (integrationName) {
      all[email][integrationName] = {
        connected: connected ?? false,
        connectedAt: connected ? new Date().toISOString() : null,
        lastSync: connected ? 'Just now' : 'Never',
      };
    }

    if (webhookTestUrl !== undefined) {
      all[email].__webhookTest = {
        url: webhookTestUrl,
        lastTested: new Date().toISOString(),
        status: 'success',
        payload: {
          event: 'conversion_leak.detected',
          site_id: 'nexus-001',
          persona: 'skeptical-buyer',
          leak_score: 0.87,
          friction_points: ['trust_gap', 'cta_mismatch'],
          timestamp: new Date().toISOString(),
        },
      };
    }

    await writeAll(all);
    return NextResponse.json({ success: true, data: all[email] });
  } catch (error) {
    console.error('[Integrations POST]', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
