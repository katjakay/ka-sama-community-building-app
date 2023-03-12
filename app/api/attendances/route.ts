import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Attendance, createAttendance } from '../../../database/attendance';
import { getUserBySessionToken } from '../../../database/users';

const attendanceSchema = z.object({
  eventId: z.number(),
});

export type AttendancesResponseBodyPost =
  | { errors: { message: string }[] }
  | { attendance: Attendance };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<AttendancesResponseBodyPost>> {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({
      errors: [{ message: 'session token is not valid' }],
    });
  }

  const body = await request.json();
  const result = attendanceSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: [{ message: 'Request body is missing a needed property' }] },
      { status: 400 },
    );
  }

  const newAttendance = await createAttendance(result.data.eventId, user.id);

  if (!newAttendance) {
    return NextResponse.json(
      { errors: [{ message: 'Attendance not created!' }] },
      { status: 500 },
    );
  }
  return NextResponse.json({ attendance: newAttendance });
}
