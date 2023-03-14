import { cache } from 'react';
import { sql } from './connect';

export type Attendance = {
  id: number;
  userId: number;
  eventId: number;
};

// Get attendance (for one user)
export const getAttendance = cache(async (userId: number) => {
  const attendances = await sql<Attendance[]>`
    SELECT * FROM attendances WHERE attendances.user_id = ${userId}
  `;
  return attendances;
});

// Create a new attendance
export const createAttendance = cache(
  async (userId: number, eventId: number) => {
    const [attendance] = await sql<Attendance[]>`
      INSERT INTO attendances
        (user_id, event_id)
      VALUES
        (${userId}, ${eventId})
      RETURNING *
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
  id: any;
  userId: number;
  eventId: number;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
};

// displaying Attendance on user profile

export const getAttendanceByUserIdAndEventId = cache(async (userId: number) => {
  const attendancesOfUser = await sql<AttendanceByUserIdAndEventId[]>`
SELECT
users.id AS user_id,
events.id AS event_id,
events.title AS event_title,
events.date AS event_date,
events.location AS event_location
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
