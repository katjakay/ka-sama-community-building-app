import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Attendance, createAttendance } from '../../../database/attendances';
import { getUserBySessionToken } from '../../../database/users';

const attendanceSchema = z.object({
  userId: z.number(),
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

  // const existingAttendance = await getAttendanceByUserAndEvent(
  //   user.id,
  //   result.data.eventId,
  // );

  // if (existingAttendance) {
  //   return NextResponse.json(
  //     { errors: [{ message: 'Already saved to favorites!' }] },
  //     { status: 400 },
  //   );
  // }

  const newAttendance = await createAttendance(user.id, result.data.eventId);

  if (!newAttendance) {
    return NextResponse.json(
      { errors: [{ message: 'Attendance not created!' }] },
      { status: 500 },
    );
  }
  return NextResponse.json({ attendance: newAttendance });
}
