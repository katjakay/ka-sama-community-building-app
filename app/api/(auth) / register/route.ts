import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getUserByUsername } from '../../../../database/users';

const userSchema = z.object({
  username: z.string(),
  password: z.string(),
});

type RegisterResponseBody =
  | { error: { message: string }[] }
  | { user: { username: string }[] };

export const POST = async (request: NextRequest) => {
  // 1. Validate the data
  const body = await request.json();

  const result = userSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: result.error.issues,
      },
      { status: 400 },
    );
  }

  // 2. check if string is empty
  if (!result.data.username || !result.data.password) {
    return NextResponse.json(
      { errors: [{ message: 'username or password is empty' }] },
      { status: 400 },
    );
  }

  // 3. check user
  const user = await getUserByUsername(result.data.username);

  if (user) {
    return NextResponse.json(
      { errors: [{ message: 'username already exists' }] },
      { status: 400 },
    );
  }

  // 4. hash the password
  const passwordHash = await bcrypt.hash(result.data.password, 12);

  // 5. create the user
  // 6. return the new username
};
