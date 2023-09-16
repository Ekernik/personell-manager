export const sqlAllDoctors = 'SELECT * FROM doctors';

export const sqlFindUser = 'SELECT * FROM users WHERE username=?';

export const sqlUpdateLastSeen =
  'UPDATE users SET last_seen=CURRENT_TIMESTAMP WHERE username=?';

export const sqlGetAllEvents = 'SELECT * FROM events';

export const sqlCreateDuty = 'INSERT INTO events (duty, date) VALUES (?, ?)';

export const sqlUpdateDuty = 'UPDATE events SET duty=? WHERE date=?';

export const sqlCreateAppointment =
  'INSERT INTO events (appointments, date) VALUES (?, ?)';

export const sqlUpdateAppointment =
  'UPDATE events SET appointments=? WHERE date=?';

export const sqlCreateTrip = 'INSERT INTO events (trips, date) VALUES (?, ?)';

export const sqlUpdateTrip = 'UPDATE events SET trips=? WHERE date=?';

export const sqlCreateVacation =
  'INSERT INTO events (vacation, date) VALUES (?, ?)';

export const sqlUpdateVacation = 'UPDATE events SET vacation=? WHERE date=?';

export const sqlCleanup =
  'DELETE FROM events WHERE (duty IS NULL OR duty="" OR duty="null") AND (vacation="[]" OR vacation IS NULL) AND (appointments IS NULL OR appointments="") AND (trips="{}" OR trips IS NULL)';
