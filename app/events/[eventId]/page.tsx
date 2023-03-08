import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';
import FooterNav from '../../../components/FooterNav';
// import HeaderNav from '../../../components/HeaderNav';
import { getEventById } from '../../../database/events';
import { getUserBySessionToken } from '../../../database/users';
import AddEventToProfile from './AddEventToProfile';
import { eventNotFoundMetadata } from './not-found';

export const dynamic = 'force-dynamic';

type Props = {
  params: {
    eventId: string;
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
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  const user = token && (await getUserBySessionToken(token.value));
  if (!user) {
    return NextResponse.json({ error: 'session token is not valid' });
  }
  const oneEvent = await getEventById(parseInt(props.params.eventId));

  if (!oneEvent) {
    notFound();
  }

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
          <Image
            className="card w-100 bg-base-100 shadow-m"
            src={`/images/${oneEvent.id}.png`}
            alt={oneEvent.title}
            width="800"
            height="600"
          />
        </div>
        <p className="text-bold text-brown mb-2">WHAT TO EXPECT</p>
        <p>{oneEvent.description}</p>
      </div>
      <AddEventToProfile />
      <FooterNav />
    </main>
  );
}
