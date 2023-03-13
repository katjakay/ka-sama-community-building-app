import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import DeleteEvent from '../../../components/DeleteEvent';
import FooterNav from '../../../components/FooterNav';
import { getAttendance } from '../../../database/attendance';
import { getEventById } from '../../../database/events';
import { getUserBySessionToken } from '../../../database/users';
import { eventNotFoundMetadata } from './not-found';

export const dynamic = 'force-dynamic';

type Props = {
  params: {
    userId: number;
    eventId: string;
    imageUrl: string;
    // attendance: Attendance[];
  };
};

export async function generateMetadata(props: Props) {
  const oneEvent = await getEventById(parseInt(props.params.eventId));

  if (!oneEvent) {
    return eventNotFoundMetadata;
  }

  return {
    title: oneEvent.title,
    description: `Our experienced instructors offer a variety of Pilates classes designed to help you achieve your goals, whether you're a beginner or an advanced practitioner. Choose from mat classes, equipment classes, or private sessions tailored to your specific needs. Shop ${oneEvent.title} and many more and start feeling stronger and more energized today`,
    icons: {
      shortcut: '/icon.svg',
    },
  };
}

export default async function SingleEventPage(props: Props) {
  const oneEvent = await getEventById(parseInt(props.params.eventId));
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  const user = token && (await getUserBySessionToken(token.value));
  if (!user) {
    return (
      NextResponse.json({ error: 'session token is not valid' }),
      redirect(`/login?returnTo=/events/${props.params.eventId}}`)
    );
  }

  if (!oneEvent) {
    notFound();
  }

  const attendances = await getAttendance(oneEvent.id);

  return (
    <main className="m-8 mt-10">
      {/* <HeaderNav /> */}
      <div>
        <h3 className="text-yellow">{oneEvent.title.toUpperCase()}</h3>
        <div className="badge badge-primary mt-5 ">UPCOMING</div>
        <h1 className="text-4xl mt-3 mb-3">{oneEvent.title}</h1>
        <div>
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="blue"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <p className="mt-2">{oneEvent.date}</p>
          </Link>
        </div>
        <div>
          <Link href="/create">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="blue"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            <p className="mt-2">{oneEvent.location}</p>
          </Link>
        </div>
        <div className="mt-6 mb-6">
          {!!oneEvent.imageUrl && (
            <Image
              className="card w-100 bg-base-100 shadow-m"
              src={oneEvent.imageUrl}
              alt={oneEvent.title}
              width="800"
              height="600"
            />
          )}
        </div>
        <p className="text-bold text-brown mb-2">WHAT TO EXPECT</p>
        <p>{oneEvent.description}</p>
      </div>
      {/* <div>
        {user && (
          <AddAttendance
            user={user}
            event={oneEvent.id}
            attendances={attendances}
          />
        )}{' '}
        </div> */}
      <div>{user && <DeleteEvent events={oneEvent} user={user} />}</div>
      <div className="mt-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="blue"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
          />
        </svg>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <FooterNav />
    </main>
  );
}
