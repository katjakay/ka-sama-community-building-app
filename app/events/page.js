import Image from 'next/image';
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
    <main className="m-2">
      <h1 className="text-4xl mt-4">All events here</h1>
      <p className="text-4xl mb-6 mt-0 text-gray-500">Checkout the latest</p>
      <span>
        {events.map((event) => {
          return (
            <div key={`event-${event.id}`}>
              <h3 className="text-2xl mr-10">{event.title}</h3>
              <p className="text-sm">{event.date}</p>

              <Image
                src="/images/example.avif"
                alt={event.title}
                width="100"
                height="200"
              />
              {/* <p className="text-lg">{event.description}</p> */}
              <div className="flex flex-wrap justify-end">
                <button
                  href="/"
                  type="button"
                  className="text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
                >
                  Read more
                </button>
              </div>
            </div>
          );
        })}
      </span>
    </main>
  );
}
