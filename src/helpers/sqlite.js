const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

export default async function openDb() {
  return sqlite.open({
    filename: 'src/db/data.db',
    driver: sqlite3.Database,
  });
}
  