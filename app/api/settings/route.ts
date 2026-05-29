import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const revalidate = 0;

const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;
const SETTINGS_PATH = isServerless
  ? path.join('/tmp', 'settings.json')
  : path.join(process.cwd(), 'data', 'settings.json');

async function ensureSettingsDB() {
  try {
    await fs.access(SETTINGS_PATH);
  } catch {
    await fs.mkdir(path.dirname(SETTINGS_PATH), { recursive: true });
    await fs.writeFile(SETTINGS_PATH, '{}');
  }
}

async function readAllSettings() {
  await ensureSettingsDB();
  const raw = await fs.readFile(SETTINGS_PATH, 'utf-8');
  return JSON.parse(raw);
}

async function writeAllSettings(data: any) {
  await ensureSettingsDB();
  await fs.writeFile(SETTINGS_PATH, JSON.stringify(data, null, 2));
}

// GET settings for a specific user email
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
  }

  try {
    const allSettings = await readAllSettings();
    const userSettings = allSettings[email] || {
      name: '',
      company: '',
      openaiApiKey: '',
      webhookUrl: '',
      defaultUrl: '',
    };
    return NextResponse.json(userSettings);
  } catch (error) {
    console.error('[Settings GET] Error:', error);
    return NextResponse.json({ error: 'Failed to retrieve settings' }, { status: 500 });
  }
}

// POST update settings for a specific user email
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, company, openaiApiKey, webhookUrl, defaultUrl } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const allSettings = await readAllSettings();
    allSettings[email] = {
      name: name || '',
      company: company || '',
      openaiApiKey: openaiApiKey || '',
      webhookUrl: webhookUrl || '',
      defaultUrl: defaultUrl || '',
    };

    await writeAllSettings(allSettings);

    return NextResponse.json({ success: true, settings: allSettings[email] });
  } catch (error) {
    console.error('[Settings POST] Error:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
