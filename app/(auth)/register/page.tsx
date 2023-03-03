import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import RegisterForm from './RegisterForm';

export const metadata = {
  title: 'Register',
  description: 'Placeholder for Register page.',
  icons: {
    shortcut: '/icon.svg',
  },
};

type Props = { searchParams: { returnTo?: string | string[] } };

export default async function RegisterPage(props: Props) {
  // check if i have a valid session
  const sessionTokenCookie = cookies().get('sessionToken');
  console.log(sessionTokenCookie);

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // if yes redirect to home
  if (session) {
    redirect('/');
  }

  return (
    <main className="m-6 mt-10">
      <h3 className="text-brown">REGISTER</h3>
      <h1 className="text-4xl mb-6 mt-4">
        This is KA-SAMA! Filipino culture and more
      </h1>
      <RegisterForm returnTo={props.searchParams.returnTo} />
    </main>
  );
}
