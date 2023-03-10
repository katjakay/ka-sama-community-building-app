import { cache } from 'react';
import { sql } from './connect';

export type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  userId: number;
};

// Get all events
export const getEvents = cache(async () => {
  const events = await sql<Event[]>`
    SELECT * FROM events
  `;
  return events;
});

export const getEventsWithLimitAndOffset = cache(
  async (limit: number, offset: number) => {
    const events = await sql<Event[]>`
    SELECT * FROM events
    Limit ${limit}
    offset ${offset}
  `;

    return events;
  },
);

// Get a single event
export const getEventById = cache(async (id: number) => {
  const [event] = await sql<Event[]>`
    SELECT
      *
    FROM
    events
    WHERE
      id = ${id}
  `;
  return event;
});

// Create a new event
export const createEvent = cache(
  async (
    title: string,
    date: string,
    location: string,
    description: string,
    imageUrl: string,
    userId: number,
  ) => {
    const [event] = await sql<Event[]>`
      INSERT INTO events
        (title, date, location, description, image_url, user_id)
      VALUES
        (${title}, ${date}, ${location}, ${description}, ${imageUrl}, ${userId})
      RETURNING *
    `;
    return event;
  },
);

// Update an event by ID
export const updateEventById = cache(
  async (
    id: number,
    title: string,
    date: string,
    location: string,
    description: string,
    imageUrl: string,
    userId: number,
  ) => {
    const [event] = await sql<Event[]>`
      UPDATE
        events
      SET
      id = ${id},
      title = ${title},
      date = ${date},
      location = ${location},
        description = ${description},
        imageUrl={imageUrl},
        userId = ${userId}
      WHERE
        id = ${id}
      RETURNING *
    `;
    return event;
  },
);

// Delete an event by ID
export const deleteEventById = cache(async (id: number) => {
  const [event] = await sql<Event[]>`
    DELETE FROM
      events
    WHERE
      id = ${id}
    RETURNING *
  `;
  return event;
});
