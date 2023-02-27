import { cache } from 'react';
import { sql } from './connect';

type Event = {
  id: number;
  title: string;
  date: number;
  location: string;
  description: string | null;
};

// get all events
export const getEvents = cache(async () => {
  const events = await sql<Event[]>`
    SELECT * FROM events
  `;
  return events;
});

// get a single event
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

// create a new event
export const createEvent = cache(
  async (
    title: string,
    date: number,
    location: string,
    description: string,
  ) => {
    const [event] = await sql<Event[]>`
      INSERT INTO events
        (title, date, location, description)
      VALUES
        (${title}, ${date}, ${location}, ${description})
      RETURNING *
    `;
    return event;
  },
);

// update a event by ID
export const updateEventById = cache(
  async (
    id: number,
    title: string,
    date: number,
    location: string,
    description: string,
  ) => {
    const [event] = await sql<Event[]>`
      UPDATE
        events
      SET
      title = ${title},
      date = ${date},
      location = ${location},
        description = ${description}
      WHERE
        id = ${id}
      RETURNING *
    `;
    return event;
  },
);

// delete a event by ID
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
