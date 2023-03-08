import { NextRequest, NextResponse } from 'next/server';
import {
  deleteEventById,
  Event,
  getEventById,
} from '../../../../database/events';

export type EventResponseBodyGet =
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
