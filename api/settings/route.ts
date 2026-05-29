import { NextResponse } from 'next/server';

// Mock settings data - in a real app this would be persisted in a DB or user profile
let settings = {
  theme: 'light', // or 'dark'
};

export async function GET() {
  return NextResponse.json({ success: true, settings });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.theme) {
      settings.theme = body.theme;
    }
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
}
