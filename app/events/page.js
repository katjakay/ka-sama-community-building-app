import Image from 'next/image';
import Link from 'next/link';
import FooterNav from '../../components/FooterNav';
// import HeaderNav from '../../components/HeaderNav';
import { getEvents } from '../../database/events';

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
                <Image
                  className="h-auto min-w-min mb-4 rounded-lg"
                  src={`/images/${event.id}.png`}
                  alt={event.title}
                  width="500"
                  height="600"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title mr-24 text-3xl">{event.title}</h2>
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
