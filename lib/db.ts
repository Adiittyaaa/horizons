// lib/db.ts
import fs from 'fs/promises';
import path from 'path';
import type { ScanReport } from '@/types';

const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;
const DB_PATH = isServerless
  ? path.join('/tmp', 'scans.json')
  : path.join(process.cwd(), 'data', 'scans.json');

/** Ensure the data directory and JSON file exist */
export async function ensureDB(): Promise<void> {
  try {
    await fs.access(DB_PATH);
  } catch {
    // Create directory if needed
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    // Initialise empty JSON object
    await fs.writeFile(DB_PATH, '{}');
  }
}

/** Save a ScanReport to the JSON database */
export async function saveScan(report: ScanReport): Promise<void> {
  await ensureDB();
  const raw = await fs.readFile(DB_PATH, 'utf-8');
  const data = JSON.parse(raw) as Record<string, ScanReport>;
  data[report.id] = report;
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

/** Retrieve a ScanReport by its ID */
export async function getScan(id: string): Promise<ScanReport | null> {
  await ensureDB();
  const raw = await fs.readFile(DB_PATH, 'utf-8');
  const data = JSON.parse(raw) as Record<string, ScanReport>;
  return data[id] ?? null;
}

/** Mark a ScanReport as paid */
export async function markAsPaid(id: string): Promise<void> {
  await ensureDB();
  const raw = await fs.readFile(DB_PATH, 'utf-8');
  const data = JSON.parse(raw) as Record<string, ScanReport>;
  if (data[id]) {
    data[id].isPaid = true;
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  }
}
