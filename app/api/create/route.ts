import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createEvent, Event } from '../../../database/events';
import { getUserBySessionToken } from '../../../database/users';

const eventType = z.object({
  title: z.string(),
  date: z.string(),
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
      events: Event[];
    };

export type EventsResponseBodyPost =
  | {
      error: string;
    }
  | {
      event: Event;
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<EventsResponseBodyPost>> {
  const body = await request.json();
  const result = eventType.safeParse(body);
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'session token is not valid' });
  }

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Please add title and review text',
      },
      { status: 400 },
    );
  }

  const newEvent = await createEvent(
    result.data.title,
    result.data.date,
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
