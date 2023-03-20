import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createEvent, Event } from '../../../database/events';
import { getUserBySessionToken } from '../../../database/users';

const eventSchema = z.object({
  title: z.string(),
  date: z.string(),
  time: z.string(),
  location: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  userId: z.number(),
});

export type EventsResponseBodyGet =
  | {
      error: string;
    }
  | {
      event: Event[];
    };

export type EventsResponseBodyPost =
  | {
      error: string;
    }
  | {
      event: Event;
    };

// export async function GET(
//   request: NextRequest,
// ): Promise<NextResponse<EventsResponseBodyGet>> {
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

//   const events = await getEventsWithLimitAndOffset(limit, offset);

//   return NextResponse.json({ events: events });
// }

export async function POST(
  request: NextRequest,
): Promise<NextResponse<EventsResponseBodyPost>> {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'session token is not valid' });
  }

  const body = await request.json();
  const result = eventSchema.safeParse(body);

  if (!result.success) {
    console.log(result.error.issues);

    return NextResponse.json(
      {
        error:
          'Request body is missing one of the needed properties title, date, location, description & image url',
      },
      { status: 400 },
    );
  }

  const newEvent = await createEvent(
    result.data.title,
    result.data.date,
    result.data.time,
    result.data.location,
    result.data.description,
    result.data.imageUrl,
    result.data.userId,
  );

  if (!newEvent) {
    return NextResponse.json({ error: 'Event not created!' }, { status: 500 });
  }
  return NextResponse.json({ event: newEvent });
}
