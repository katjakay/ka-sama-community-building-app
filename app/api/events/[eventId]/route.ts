import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  deleteEventById,
  Event,
  getEventById,
  updateEventById,
} from '../../../../database/events';

const eventSchema = z.object({
  title: z.string(),
  date: z.number(),
  location: z.string(),
  description: z.string(),
  userId: z.number(),
});

export type EventResponseBodyGet =
  | {
      error: string;
    }
  | {
      event: Event;
    };

export type EventResponseBodyPut =
  | {
      error: string;
    }
  | {
      event: Event;
    };

export type EventResponseBodyDelete =
  | {
      error: string;
    }
  | {
      event: Event;
    };

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<EventResponseBodyGet>> {
  const eventId = Number(params.eventId);

  if (!eventId) {
    return NextResponse.json(
      {
        error: 'Event id is not valid',
      },
      { status: 400 },
    );
  }

  const oneEvent = await getEventById(eventId);

  if (!oneEvent) {
    return NextResponse.json(
      {
        error: 'Event not found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ event: oneEvent });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<EventResponseBodyPut>> {
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
        error: 'Request body is missing one of the needed properties.',
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
    result.data.userId,
  );

  if (!newEvent) {
    return NextResponse.json(
      {
        error: 'Event not found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ event: newEvent });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<EventResponseBodyDelete>> {
  const eventId = Number(params.eventId);

  if (!eventId) {
    return NextResponse.json(
      {
        error: 'Event id is not valid',
      },
      { status: 400 },
    );
  }

  const oneEvent = await deleteEventById(eventId);

  if (!oneEvent) {
    return NextResponse.json(
      {
        error: 'Event not found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ event: oneEvent });
}
