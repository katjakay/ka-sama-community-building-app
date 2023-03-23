import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import LoginForm from './LoginForm';

export const metadata = {
  title: 'Login',
  description: 'Placeholder for Login page.',
  icons: {
    shortcut: '/icon.svg',
  },
};

type Props = { searchParams: { returnTo?: string | string[] } };

export default async function LoginPage(props: Props) {
  // check if I  have valid session
  const sessionTokenCookie = cookies().get('sessionToken');

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  if (session) {
    redirect('/');
  }

  return (
    <main className="m-6 mt-10">
      <h3 className="text-yellow">LOGIN</h3>
      <h1 className="text-4xl mb-4 mt-4">
        Welcome back,
        <br /> <p className="text-beige">connect and create now</p>
      </h1>
      <span>
        <LoginForm returnTo={props.searchParams.returnTo} />
      </span>
    </main>
  );
}
