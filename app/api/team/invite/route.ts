import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const revalidate = 0;

const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;
const TEAM_PATH = isServerless
  ? path.join('/tmp', 'team.json')
  : path.join(process.cwd(), 'data', 'team.json');

async function ensureDB() {
  try {
    await fs.access(TEAM_PATH);
  } catch {
    await fs.mkdir(path.dirname(TEAM_PATH), { recursive: true });
    await fs.writeFile(TEAM_PATH, '{}');
  }
}

async function readAll() {
  await ensureDB();
  const raw = await fs.readFile(TEAM_PATH, 'utf-8');
  return JSON.parse(raw);
}

async function writeAll(data: any) {
  await ensureDB();
  await fs.writeFile(TEAM_PATH, JSON.stringify(data, null, 2));
}

// GET team members for a workspace owner
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

  try {
    const all = await readAll();
    return NextResponse.json(all[email] || { members: [] });
  } catch (error) {
    console.error('[Team GET]', error);
    return NextResponse.json({ error: 'Failed to read team' }, { status: 500 });
  }
}

// POST invite a new member
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ownerEmail, inviteEmail, inviteRole } = body;

    if (!ownerEmail || !inviteEmail) {
      return NextResponse.json({ error: 'Owner email and invite email required' }, { status: 400 });
    }

    if (!inviteEmail.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const all = await readAll();
    if (!all[ownerEmail]) all[ownerEmail] = { members: [] };

    const existing = all[ownerEmail].members.find((m: any) => m.email === inviteEmail);
    if (existing) {
      return NextResponse.json({ error: 'Member already invited or exists' }, { status: 409 });
    }

    const newMember = {
      email: inviteEmail,
      role: inviteRole || 'Viewer',
      status: 'Invited',
      invitedAt: new Date().toISOString(),
      avatar: inviteEmail.slice(0, 2).toUpperCase(),
    };

    all[ownerEmail].members.push(newMember);
    await writeAll(all);

    return NextResponse.json({ success: true, member: newMember });
  } catch (error) {
    console.error('[Team POST]', error);
    return NextResponse.json({ error: 'Failed to invite member' }, { status: 500 });
  }
}

// DELETE remove a member
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { ownerEmail, memberEmail } = body;

    if (!ownerEmail || !memberEmail) {
      return NextResponse.json({ error: 'Owner email and member email required' }, { status: 400 });
    }

    const all = await readAll();
    if (!all[ownerEmail]) return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });

    all[ownerEmail].members = (all[ownerEmail].members || []).filter(
      (m: any) => m.email !== memberEmail
    );

    await writeAll(all);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Team DELETE]', error);
    return NextResponse.json({ error: 'Failed to remove member' }, { status: 500 });
  }
}
