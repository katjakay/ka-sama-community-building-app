import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import FooterNav from '../../components/FooterNav';
import { getEvents } from '../../database/events';
import { getUserBySessionToken } from '../../database/users';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'All events',
  description:
    'Your journey to wellness is just a few clicks away. Review your Pilates purchases and complete your transaction securely on our online store. Embrace a healthier, stronger you with our personalized classnames and equipment.',
  icons: {
    shortcut: '/icon.svg',
  },
};

export default async function EventsPage() {
  const events = await getEvents();
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  return (
    <main className="m-8 mt-10">
      {/* <HeaderNav /> */}
      <h3 className="text-yellow">EVENTS</h3>
      <h1 className="text-4xl mt-4">All events</h1>
      <p className="text-4xl mb-6 mt-0 text-gray-500">Checkout the latest</p>
      <span>
        {events.map((event) => {
          return (
            <div
              key={`event-${event.id}`}
              className="card card-compact w-auto bg-base-100 shadow-xl mt-2 mb-4"
            >
              <figure>
                {!!event.imageUrl && (
                  <Image
                    className="h-auto min-w-min mb-4 rounded-lg"
                    src={event.imageUrl}
                    alt="event photo"
                    width="500"
                    height="600"
                  />
                )}
              </figure>
              <div className="card-body">
                <h2 className="card-title mr-24 text-3xl">{event.title}</h2>
                <div className="badge badge-primary mt-2 ">UPCOMING</div>
                <p>{event.date}</p>
                <div className="card-actions justify-end">
                  <Link href={`/events/${event.id}`}>
                    <button className="btn btn-primary">Read more</button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </span>
      <FooterNav />
    </main>
  );
}
