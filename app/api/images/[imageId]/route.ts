import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
// import { z } from 'zod';
import {
  deleteImageById,
  getImageById,
  Image,
} from '../../../../database/images';
import { getUserBySessionToken } from '../../../../database/users';

// const imageType = z.object({
//   imageUrl: z.string(),
//   caption: z.string(),
//   userId: z.number(),
// });

export type ImageResponseBodyGet =
  | {
      error: string;
    }
  | {
      image: Image;
    };

export type ImageResponseBodyDelete =
  | {
      error: string;
    }
  | {
      image: Image;
    };

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<ImageResponseBodyGet>> {
  const imageId = Number(params.imageId);

  if (!imageId) {
    return NextResponse.json(
      { error: 'Image id is not valid' },
      { status: 400 },
    );
  }

  const singleImage = await getImageById(imageId);

  if (!singleImage) {
    return NextResponse.json({ error: 'Image not found' }, { status: 400 });
  }

  return NextResponse.json({ image: singleImage });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<ImageResponseBodyDelete>> {
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
