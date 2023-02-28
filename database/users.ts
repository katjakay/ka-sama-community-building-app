import { cache } from 'react';
import { sql } from './connect';

type User = {
  id: number;
  username: string;
  passwordHash: string;
};

export const getUsernameWithPasswordHash = cache(async (username: string) => {
  const [user] = await sql<User[]>`
    SELECT
    *
    FROM
    users
    WHERE
    username = ${username}`;
  return user;
});

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<User[]>`
  SELECT
  *
  FROM
  users
  WHERE
  username = ${username}
`;
  return user;
});

export const createUser = cache(
  async (username: string, passwordHash: string) => {
    const [user] = await sql<{ id: number; username: string }[]>`
  INSERT INTO user (username, password_hash)
  VALUES
  (${username}, ${passwordHash})
  RETURNING
  id, username
  `;
    return user;
  },
);
