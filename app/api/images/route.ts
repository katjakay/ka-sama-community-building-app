import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createImage, deleteImageById, Image } from '../../../database/images';
import { getUserBySessionToken } from '../../../database/users';

const imageSchema = z.object({
  userId: z.number(),
  eventId: z.number(),
  comment: z.string(),
  imageUrl: z.string(),
});

export type ImagesResponseBodyGet =
  | {
      error: string;
    }
  | {
      image: Image[];
    };

export type ImagesResponseBodyPost =
  | {
      error: string;
    }
  | {
      image: Image;
    };

export type ImagesResponseBodyDelete =
  | {
      error: string;
    }
  | {
      image: Image;
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ImagesResponseBodyPost>> {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'session token is not valid' });
  }

  const body = await request.json();
  const result = imageSchema.safeParse(body);

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

  const newImage = await createImage(
    result.data.userId,
    result.data.eventId,
    result.data.comment,
    result.data.imageUrl,
  );

  if (!newImage) {
    return NextResponse.json({ error: 'Image not created!' }, { status: 500 });
  }
  return NextResponse.json({ image: newImage });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<ImagesResponseBodyDelete>> {
  const imageId = Number(params.imageId);

  if (!imageId) {
    return NextResponse.json(
      {
        error: 'Image id is not valid',
      },
      { status: 400 },
    );
  }

  const oneImage = await deleteImageById(imageId);

  if (!oneImage) {
    return NextResponse.json(
      {
        error: 'Image not found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ image: oneImage });
}
