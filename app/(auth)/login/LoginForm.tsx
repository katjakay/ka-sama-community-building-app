'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBody } from '../../api/(auth)/register/route';

export default function LoginForm(props: { returnTo?: string | string[] }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  return (
    <main>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
          });

          const data: RegisterResponseBody = await response.json();

          if ('errors' in data) {
            setErrors(data.errors);
            return;
          }

          if (
            props.returnTo &&
            !Array.isArray(props.returnTo) &&
            // This is checking that the return to is a valid path in your application and not going to a different domain
            /^\/[a-zA-Z0-9-?=/]*$/.test(props.returnTo)
          ) {
            router.push(props.returnTo);
            return;
          }

          router.replace(`/profile/${data.user.username}`);
          router.refresh();
        }}
      >
        {errors.map((error) => (
          <div key={`error-${error.message}`}>Error: {error.message}</div>
        ))}
        <div className="flex flex-wrap flex-col space-y-10">
          <div className="mt-16">
            <label>
              Username
              <input
                className="block w-full input input-bordered input-md w-full max-w-screen-md"
                value={username}
                onChange={(event) => setUsername(event.currentTarget.value)}
              />
            </label>
            <label>
              Password
              <input
                className="block w-full input input-bordered input-md w-full max-w-screen-md"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
            </label>
          </div>
          <div>
            <button className="text-white bg-yellow text-white font-regular uppercase text-md rounded mt-2 mb-1 min-w-full h-11">
              Login
            </button>
            <div className="flex flex-wrap justify-center">
              <Link
                className="link text-blue text-xs font-regular"
                href="/register"
              >
                <p> Register now</p>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
