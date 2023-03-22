import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import AddAttendance from '../../../components/AddAttendance';
import FooterNav from '../../../components/FooterNav';
import { getAttendances } from '../../../database/attendances';
import { getEventById } from '../../../database/events';
import { getUserBySessionToken } from '../../../database/users';
import { events } from '../../../migrations/1678189022-insertIntoEvents.mjs';
import DeleteEvent from '../DeleteEvent';
import { eventNotFoundMetadata } from './not-found';

export const dynamic = 'force-dynamic';

type Props = {
  params: {
    userId: number;
    eventId: string;
    imageUrl: string;
  };
};

export async function generateMetadata(props: Props) {
  const oneEvent = await getEventById(parseInt(props.params.eventId));

  if (!oneEvent) {
    return eventNotFoundMetadata;
  }

  return {
    title: oneEvent.title,
    description: `This event is all about celebrating Filipino culture and heritage, and connecting with others who share similar backgrounds and interests. We'll be sharing stories, traditions, and experiences, as well as learning about different aspects of Filipino culture from our guest speakers. Don't miss out on this opportunity to connect with like-minded individuals and celebrate the rich diversity of Filipino culture with ${oneEvent.title} and many more.`,
    icons: {
      shortcut: '/icon.svg',
    },
  };
}

export default async function SingleEventPage(props: Props) {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  const user = token && (await getUserBySessionToken(token.value));

  const oneEvent = await getEventById(parseInt(props.params.eventId));

  if (!user) {
    return (
      NextResponse.json({ error: 'session token is not valid' }),
      redirect(`/login?returnTo=/events/${props.params.eventId}}`)
    );
  }

  if (!oneEvent) {
    notFound();
  }

  const attendances = await getAttendances(oneEvent.id);

  // checks if date is in the future
  // const eventDate = new Date(oneEvent.date);
  // const isUpcoming = eventDate > new Date();

  return (
    <main className="m-6 mt-10">
      <div>
        <h3 className="text-yellow">{oneEvent.title.toUpperCase()}</h3>
        {/* {isUpcoming ? ( */}
        <div className="badge badge-primary mt-5">UPCOMING</div>
        {/* ) : (
          <div className="badge badge-secondary mt-5">PASSED</div> */}
        {/* )}         */}
        <h1 className="text-4xl mt-3 mb-3">{oneEvent.title}</h1>
        <div>
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

          <div className="mt-2">
            <p>
              {oneEvent.date} / {oneEvent.time}
            </p>
          </div>
        </div>

        <div>
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
        </div>
        <DeleteEvent user={user} event={oneEvent} />
        <div className="mt-6">
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
        <div className="badge badge-primary badge-outline mt-8 mb-4">
          WHAT TO EXPECT{' '}
        </div>
        <p>{oneEvent.description}</p>
      </div>

      {/* camera icon */}

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
        <div className="object-bottom" key={`event-${oneEvent.id}/event-feed`}>
          <Link
            href={`/events/${oneEvent.id}/eventfeed`}
            className="btn border-transparent text-white bg-brown text-white font-regular text-sm rounded mt-2 min-w-full h-11"
          >
            VIEW EVENT PHOTOS
          </Link>
        </div>
        <AddAttendance
          user={user}
          oneEvent={oneEvent}
          attendances={attendances}
        />
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
