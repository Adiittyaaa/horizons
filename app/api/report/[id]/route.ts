// app/api/report/[id]/route.ts
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const revalidate = 0;
import { getScan } from '@/lib/db';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const report = await getScan(params.id);
    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }
    return NextResponse.json({ report });
  } catch (e) {
    console.error('[Report] Lookup failed:', (e as Error)?.message);
    return NextResponse.json({ error: 'Report lookup failed' }, { status: 500 });
  }
}
