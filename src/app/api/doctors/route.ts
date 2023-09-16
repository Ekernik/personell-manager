import { sqlAllDoctors } from '@/app/utils/sqlCommands';
import openDb from '@/helpers/sqlite.js';

export async function GET(req: Request, res: Response) {
  const db = await openDb();
  const allDoctors = await db.all(sqlAllDoctors);
  return new Response(JSON.stringify(allDoctors));
}
