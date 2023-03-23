import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  Attendance,
  deleteAttendanceById,
} from '../../../../database/attendances';
import { getUserBySessionToken } from '../../../../database/users';

export type AttendanceResponseBodyDelete =
  | {
      error: string;
    }
  | {
      attendance: Attendance;
    };

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<AttendanceResponseBodyDelete>> {
  // this is a protected Route Handler
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'session token is not valid' });
  }

  const attendanceId = Number(params.attendanceId);

  if (!attendanceId) {
    return NextResponse.json(
      {
        error: 'Attendance id is not valid',
      },
      { status: 400 },
    );
  }

  const oneAttendance = await deleteAttendanceById(attendanceId);

  if (!oneAttendance) {
    return NextResponse.json(
      {
        error: 'Image not found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ attendance: oneAttendance });
}
