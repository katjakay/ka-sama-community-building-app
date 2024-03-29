import { cache } from 'react';
import { sql } from './connect';

export type User = {
  id: number;
  username: string | null;
  location: string | null;
  description: string | null;
  passwordHash: string;
  imageUrl: string | null;
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
    const [user] = await sql<
      {
        id: number;
        username: string;
        location: string | null;
        description: string | null;
        passwordHash: string;
        imageUrl: string | null;
      }[]
    >`
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

export const getUserWithAllInfo = cache(async (username: string) => {
  const [user] = await sql<
    {
      id: number;
      username: string;
      location: string | null;
      description: string | null;
      imageUrl: string | null;
    }[]
  >`
    SELECT
      id,
      username,
      location,
      description,
      image_url
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
    imageUrl: string,
  ) => {
    const [user] = await sql<
      {
        id: number;
        username: string;
        location: string | null;
        description: string | null;
        imageUrl: string | null;
      }[]
    >`
      INSERT INTO users
        (username, password_hash, location, description, image_url)
      VALUES
        (${username}, ${passwordHash}, ${location}, ${description}, ${imageUrl})
      RETURNING
        id,
        username,
        location,
        description,
        image_url
    `;
    return user;
  },
);

export const getAllUsers = cache(async () => {
  const users = await sql<
    {
      id: number;
      username: string;
      location: string | null;
      description: string | null;
      passwordHash: string;
      imageUrl: string | null;
    }[]
  >`
  SELECT * FROM users
  `;

  return users;
});
