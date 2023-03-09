import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Attendance, createAttendance } from '../../../database/attendance';
import { getUserBySessionToken } from '../../../database/users';

const attendanceSchema = z.object({
  userId: z.number(),
  eventId: z.number(),
  attendanceTime: z.string(),
});

export type AttendancesResponseBodyGet =
  | {
      error: string;
    }
  | {
      attendance: Attendance[];
    };

export type AttendancesResponseBodyPost =
  | {
      error: string;
    }
  | {
      attendance: Attendance;
    };

// export async function GET(
//   request: NextRequest,
// ): Promise<NextResponse<AttendancesResponseBodyGet>> {
//   // this should be a public api method (unprotected)
//   const { searchParams } = new URL(request.url);

//   const limit = Number(searchParams.get('limit'));
//   const offset = Number(searchParams.get('offset'));

//   if (!limit || !offset) {
//     return NextResponse.json(
//       {
//         error: 'Limit and Offset need to be passed as params',
//       },
//       { status: 400 },
//     );
//   }

//   const attendances = await getAttendancesWithLimitAndOffset(limit, offset);

//   return NextResponse.json({ attendances: attendances });
// }

export async function POST(
  request: NextRequest,
): Promise<NextResponse<AttendancesResponseBodyPost>> {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'session token is not valid' });
  }

  const body = await request.json();
  const result = attendanceSchema.safeParse(body);

  if (!result.success) {
    console.log(result.error.issues);

    return NextResponse.json(
      {
        error:
          'Request body is missing one of the needed properties attendance info',
      },
      { status: 400 },
    );
  }

  const newAttendance = await createAttendance(
    result.data.userId,
    result.data.eventId,
    result.data.attendanceTime,
  );

  if (!newAttendance) {
    return NextResponse.json(
      { error: 'Attendance not captured!' },
      { status: 500 },
    );
  }
  return NextResponse.json({ attendance: newAttendance });
}
