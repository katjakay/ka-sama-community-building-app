import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createEvent,
  getEventsWithLimitAndOffset,
} from '../../../database/events';
import { getUserBySessionToken } from '../../../database/users';

const eventSchema = z.object({
  title: z.string(),
  date: z.number(),
  location: z.string(),
  description: z.string(),
});

export async function GET(request: NextRequest) {
  // this should be a public api method (unprotected)
  const { searchParams } = new URL(request.url);

  const limit = Number(searchParams.get('limit'));
  const offset = Number(searchParams.get('offset'));

  if (!limit || !offset) {
    return NextResponse.json(
      {
        error: 'Limit and Offset need to be passed as params',
      },
      { status: 400 },
    );
  }

  const events = await getEventsWithLimitAndOffset(limit, offset);

  return NextResponse.json({ events: events });
}

export async function POST(request: NextRequest) {
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

  const body = await request.json();

  const result = eventSchema.safeParse(body);

  if (!result.success) {
    // Inside of result.error.issues you are going to have more granular information about what is failing allowing you to create more specific error massages
    // console.log(result.error.issues);

    return NextResponse.json(
      {
        error:
          'Request body is missing one of the needed properties firstName, type and accessory ',
      },
      { status: 400 },
    );
  }

  const newEvent = await createEvent(
    result.data.title,
    result.data.date,
    result.data.location,
    result.data.description,
  );

  return NextResponse.json({ event: newEvent });
}
