import { cache } from 'react';
import { sql } from './connect';

export type Attendance = {
  id: number;
  userId: number;
  eventId: number;
  attendance_time: string;
};

// Get all attendance
export const getAttendance = cache(async () => {
  const attendance = await sql<Attendance[]>`
    SELECT * FROM attendance
  `;
  return attendance;
});

export const getAttendanceWithLimitAndOffset = cache(
  async (limit: number, offset: number) => {
    const attendance = await sql<Attendance[]>`
    SELECT * FROM attendance
    Limit ${limit}
    offset ${offset}
  `;

    return attendance;
  },
);

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
  async (userId: number, eventId: number, attendanceTime: string) => {
    const [attendance] = await sql<Attendance[]>`
      INSERT INTO attendance
        (userId, eventId, attendanceTime)
      VALUES
        (${userId}, ${eventId}, ${attendanceTime})
      RETURNING *
    `;
    return attendance;
  },
);

// Update an attendance by ID
export const updateAttendanceById = cache(
  async (
    id: number,
    userId: number,
    eventId: number,
    attendanceTime: string,
  ) => {
    const [attendance] = await sql<Attendance[]>`
      UPDATE
        attendance
      SET
      id = ${id},
      userId = ${userId},
      eventId = ${eventId},
      attendance_time = ${attendanceTime}
      WHERE
        id = ${id}
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
