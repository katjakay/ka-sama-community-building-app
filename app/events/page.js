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
    <main className="m-2 mt-10">
      <h3 className="text-yellow">EVENTS</h3>
      <h1 className="text-4xl mt-4">All events here</h1>
      <p className="text-4xl mb-6 mt-0 text-gray-500">Checkout the latest</p>
      <span>
        {events.map((event) => {
          return (
            <div key={`event-${event.id}`}>
              <h3 className="text-2xl mr-10">{event.title}</h3>
              <p className="text-sm">{event.date}</p>

              <Image
                className="h-auto max-w-lg mt-4 mb-4 rounded-lg"
                src={`/images/${event.id}.png`}
                alt={event.title}
                width="380"
                height="600"
              />

              {/* <p className="text-lg">{event.description}</p> */}
              <div className="flex flex-wrap justify-end">
                <button
                  href="/"
                  type="button"
                  className="text-white bg-blue font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                >
                  Read more
                </button>
              </div>
            </div>
          );
        })}
        <div className="card w-96 mb-4 bg-base-100	shadow-xl">
          <figure>
            <img
              src="https://cdn.shopify.com/s/files/1/0632/4659/8402/files/Charlotte_Stone_Leti_x_Neek_01.20222375.jpg?v=1652992138&width=750"
              alt="example"
            />
          </figure>
          <div className="card-body">
            <p>
              <div className="badge badge-secondary">upcoming</div> 24/03/23
            </p>
            <h2 className="card-title">Tagalog for beginners</h2>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Fashion</div>
              <div className="badge badge-outline">Products</div>
            </div>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl image-full">
          <figure>
            <img
              src="https://cdn.shopify.com/s/files/1/0632/4659/8402/files/Charlotte_Stone_Leti_x_Neek_01.20222375.jpg?v=1652992138&width=750"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Tagalog for beginners</h2>
            <p>24/03/23</p>
            <div className="card-actions justify-end">
              <button className="btn btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </span>
      <div className="btm-nav">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </button>
        <button className="active">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </button>
      </div>
    </main>
  );
}
