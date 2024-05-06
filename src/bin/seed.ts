import 'reflect-metadata';
import 'module-alias/register';
import { initDB } from '@services/database';
import * as seeds from '../database/seeds';

initDB().then(async (connection) => {
  const entries = Object.entries(seeds);

  for (const [seeder, callback] of entries) {
    if (typeof callback !== 'function') {
      continue;
    }
    await callback(connection);
  }

  await connection.close();
});
