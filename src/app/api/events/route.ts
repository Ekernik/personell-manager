import {
  sqlGetAllEvents,
  sqlCreateDuty,
  sqlUpdateDuty,
  sqlCreateAppointment,
  sqlUpdateAppointment,
  sqlCreateTrip,
  sqlUpdateTrip,
  sqlCreateVacation,
  sqlUpdateVacation,
} from '@/app/utils/sqlCommands';
import openDb from '@/helpers/sqlite.js';
import { NextResponse } from 'next/server';

export async function GET(req: Request, res: Response) {
  const task = req.headers.get('task');

  if (!task)
    return NextResponse.json({ status: 403, message: 'Access Denied' });

  const db = await openDb();

  if (task === 'get_all') {
    const allEvents = await db.all(sqlGetAllEvents);
    return NextResponse.json({ data: allEvents, status: 200 });
  }
}

export async function PUT(req: Request, res: Response) {
  const task = req.headers.get('task');
  const data = req.headers.get('data');
  const date = req.headers.get('datum');

  if (!task || data === undefined || data === null || !date) {
    return NextResponse.json({ status: 403, message: 'Access Denied' });
  }

  const db = await openDb();

  if (task === 'create_duty') {
    console.log('Creating Duty');
    const allEvents = await db.all(sqlCreateDuty, data, date);
    return NextResponse.json({ data: allEvents, status: 201 });
  }

  if (task === 'update_duty') {
    console.log('Updating Duty');
    const allEvents = await db.all(sqlUpdateDuty, data, date);
    const events = await db.all('SELECT * FROM events WHERE date=?', date);
    console.log(events);
    return NextResponse.json({ data: allEvents, status: 201 });
  }

  if (task === 'create_appointment') {
    console.log('Creating Appointment');
    const allEvents = await db.all(
      sqlCreateAppointment,
      decodeURIComponent(data),
      date
    );
    return NextResponse.json({ data: allEvents, status: 201 });
  }

  if (task === 'update_appointment') {
    console.log('Updating Appointment');
    const allEvents = await db.all(
      sqlUpdateAppointment,
      decodeURIComponent(data),
      date
    );
    return NextResponse.json({ data: allEvents, status: 201 });
  }

  if (task === 'create_trip') {
    console.log('Creating Trip');
    const allEvents = await db.all(
      sqlCreateTrip,
      decodeURIComponent(data),
      date
    );
    return NextResponse.json({ data: allEvents, status: 201 });
  }

  if (task === 'update_trip') {
    console.log('Updating Trip');
    const allEvents = await db.all(
      sqlUpdateTrip,
      decodeURIComponent(data),
      date
    );
    return NextResponse.json({ data: allEvents, status: 201 });
  }

  if (task === 'create_vacation') {
    console.log('Creating Vacation');
    const allEvents = await db.all(
      sqlCreateVacation,
      decodeURIComponent(data),
      date
    );
    return NextResponse.json({ data: allEvents, status: 201 });
  }

  if (task === 'update_vacation') {
    console.log('Updating Vacation');
    const allEvents = await db.all(
      sqlUpdateVacation,
      decodeURIComponent(data),
      date
    );
    return NextResponse.json({ data: allEvents, status: 201 });
  }
}
