import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  deleteEventById,
  getEventById,
  updateEventById,
} from '../../../../database/events';

const eventSchema = z.object({
  title: z.string(),
  date: z.number(),
  location: z.string(),
  description: z.string(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
) {
  const eventId = Number(params.eventId);

  if (!eventId) {
    return NextResponse.json(
      {
        error: 'Event id is not valid',
      },
      { status: 400 },
    );
  }

  const singleEvent = await getEventById(eventId);

  return NextResponse.json({ event: singleEvent });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
) {
  const eventId = Number(params.eventId);

  if (!eventId) {
    return NextResponse.json(
      {
        error: 'Event id is not valid',
      },
      { status: 400 },
    );
  }

  const singleEvent = await deleteEventById(eventId);

  return NextResponse.json({ event: singleEvent });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
) {
  const eventId = Number(params.eventId);

  if (!eventId) {
    return NextResponse.json(
      {
        error: 'Event id is not valid',
      },
      { status: 400 },
    );
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

  const newEvent = await updateEventById(
    eventId,
    result.data.title,
    result.data.date,
    result.data.location,
    result.data.description,
  );

  return NextResponse.json({ event: newEvent });
}
