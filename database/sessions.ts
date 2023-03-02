import { cache } from 'react';
import { string } from 'zod';
import { sql } from './connect';

export const createSession = cache(async (token: string, userId: number) => {
    const [session] = await sql< id: number; token: string }[]>`
  INSERT INTO sessions
  (token, user_id)
VALUES
(${token}, ${userId})
RETURNING
id,
token
  `;

  await deleteExpiredSessions();
    return session;
  });

  // deletes expired sessions
  export const deleteExpiredSessions = cache(async () => {
await sql`

DELETE from
sessions
WHERE
expiry_timestamp < now()
`;
  });
