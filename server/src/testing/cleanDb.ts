const util = require('util');
const exec = util.promisify(require('child_process').exec);
require('dotenv').config();

export function cleanDB (): Promise<any> {
  return exec(
    `DATABASE_URL=${process.env.DATABASE_URL} npx prisma migrate reset --skip-generate --skip-seed -f`
  );
}