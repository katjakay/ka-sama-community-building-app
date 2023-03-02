'use client';

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
        <label>
          Username
          <input
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </label>
        <label>
          Password
          <input
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>
        <button
          type="button"
          className="text-white bg-yellow text-white font-regular text-sm rounded mt-4 mb-4 min-w-full h-11"
        >
          Login
        </button>
      </form>
    </main>
  );
}
