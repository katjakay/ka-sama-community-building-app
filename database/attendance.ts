import { cache } from 'react';
import { sql } from './connect';

export type Attendance = {
  id: number;
  userId: number;
  eventId: number;
};

// Get all attendance (for one user)
export const getAttendance = cache(async (userId: number) => {
  const attendances = await sql<Attendance[]>`
    SELECT * FROM attendance WHERE attendance.user_id = ${userId}
  `;
  return attendances;
});

// Get a single attendance
export const getAttendanceById = cache(async (id: number) => {
  const [attendance] = await sql<Attendance[]>`
    SELECT
      *
    FROM
    attendance
    WHERE
      id = ${id}
  `;
  return attendance;
});

// Create a new attendance
export const createAttendance = cache(
  async (userId: number, eventId: number) => {
    const [attendance] = await sql<Attendance[]>`
      INSERT INTO attendance
        (userId, eventId)
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
      attendance
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
};

// displaying Attendance on user profile

export const getAttendanceByUserIdAndEventId = cache(async (userId: number) => {
  const attendanceOfUser = await sql<AttendanceByUserIdAndEventId[]>`
SELECT
users.id AS user_id,
events.id AS event_id,
events.title AS event_title,
events.date AS event_date,
events.location AS event_location
FROM
attendance
INNER JOIN
events ON attendance.event_id = events.id
INNER JOIN
users ON attendance.user_id = users.id
WHERE
attendance.user_id = ${userId}`;

  return attendanceOfUser;
});
