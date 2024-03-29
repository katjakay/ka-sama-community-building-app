import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { deleteImageById, Image } from '../../../../database/images';
import { getUserBySessionToken } from '../../../../database/users';

export type ImageResponseBodyDelete =
  | {
      error: string;
    }
  | {
      image: Image;
    };

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
