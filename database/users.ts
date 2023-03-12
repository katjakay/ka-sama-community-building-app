import { cache } from 'react';
import { sql } from './connect';

type User = {
  id: number;
  username: string;
  location: string;
  description: string;
  passwordHash: string;
};

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<{ id: number; username: string }[]>`
    SELECT
      users.id,
      users.username
    FROM
      users
    INNER JOIN
      sessions ON (
        sessions.token = ${token} AND
        sessions.user_id = users.id AND
        sessions.expiry_timestamp > now()
      )
  `;
  return user;
});

export const getUserByUsernameWithPasswordHash = cache(
  async (username: string) => {
    const [user] = await sql<User[]>`
    SELECT
      *
    FROM
      users
    WHERE
      username = ${username}
  `;
    return user;
  },
);

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<{ id: number; username: string }[]>`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      username = ${username}
  `;
  return user;
});

export const createUser = cache(
  async (
    username: string,
    passwordHash: string,
    location: string,
    description: string,
  ) => {
    const [user] = await sql<Event[]>`
      INSERT INTO users
        (username, password_hash, location, description)
      VALUES
        (${username}, ${passwordHash}, ${location}, ${description})
      RETURNING
        id,
        username
    `;
    return user;
  },
);
