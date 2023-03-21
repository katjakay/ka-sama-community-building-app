import { cache } from 'react';
import { sql } from './connect';

export type Attendance = {
  id: number;
  userId: number | null;
  eventId: number | null;
};

// Get attendance (for one user)
export const getAttendances = cache(async (userId: number) => {
  const attendances = await sql<Attendance[]>`
    SELECT * FROM attendances WHERE attendances.user_id = ${userId}
  `;
  return attendances;
});

export const getAttendanceByUserAndEvent = cache(
  async (userId: number, eventId: number) => {
    const attendances = await sql<
      { userId: number | null; eventId: number | null }[]
    >`
SELECT
user_id,
event_id
from
attendances
WHERE
user_id = ${userId} AND
event_id = ${eventId}
`;
    return attendances;
  },
);

// Create a new attendance
export const createAttendance = cache(
  async (userId: number, eventId: number) => {
    const [attendance] = await sql<Attendance[]>`
      INSERT INTO attendances
        (user_id, event_id)
      VALUES
        (${userId}, ${eventId})
      RETURNING
      id,
      user_id,
      event_id
    `;
    return attendance;
  },
);

// Delete an attendance by ID
export const deleteAttendanceById = cache(async (id: number) => {
  const [attendance] = await sql<Attendance[]>`
    DELETE FROM
    attendances
    WHERE
      id = ${id}
    RETURNING *
  `;
  return attendance;
});

export type AttendanceByUserIdAndEventId = {
  userId: number;
  eventId: number;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  eventImageUrl: string | null;
};

// displaying Attendance on user profile
export const getAttendanceByUserId = cache(async (userId: number) => {
  const attendancesOfUser = await sql<AttendanceByUserIdAndEventId[]>`
SELECT
users.id AS user_id,
events.id AS event_id,
events.title AS event_title,
events.date AS event_date,
events.location AS event_location,
events.image_url AS event_image_url
FROM
attendances
INNER JOIN
events ON attendances.event_id = events.id
INNER JOIN
users ON attendances.user_id = users.id
WHERE
attendances.user_id = ${userId}`;

  return attendancesOfUser;
});
