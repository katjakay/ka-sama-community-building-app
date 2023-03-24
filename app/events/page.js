// import { cookies } from 'next/headers';
// import { cookies } from 'next/headers';
import Image from 'next/image';
import FooterNav from '../../components/FooterNav';
import { getEvents } from '../../database/events';

// import { getUserBySessionToken } from '../../database/users';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Events - Connect and share stories',
  description:
    'With Ka-sama, users can share stories, traditions, and experiences, as well as learn about different cultures and customs from around the world. Join Ka-sama today and be a part of a vibrant and supportive community that celebrates diversity and promotes cultural understanding.',
  icons: {
    shortcut: '/icon.svg',
  },
};

export default async function EventsPage() {
  const events = await getEvents();

  // const cookieStore = cookies();
  // const sessionToken = cookieStore.get('sessionToken');

  // // 2. validate that session
  // // 3. get the user profile matching the session
  // const user = !sessionToken?.value
  //   ? undefined
  //   : await getUserBySessionToken(sessionToken.value);

  return (
    <main className="m-2 mt-2">
      <h3 className="text-yellow">EVENTS</h3>
      <h1 className="text-4xl mt-4">All events</h1>
      <p className="text-4xl mb-6 mt-0 text-beige">Check out the latest</p>

      <div className="flex flex-wrap justify-center">
        {/* <div className="tabs mb-4">
          <a className="tab tab-bordered tab-active">upcoming</a>
          <a className="tab tab-bordered">passed</a>
        </div> */}
        <div className="tabs tabs-boxed mb-4">
          <a className="tab tab-active">upcoming</a>
          <a className="tab">passed</a>
        </div>
      </div>
      <span>
        {events.map((event) => {
          return (
            <div
              key={`event-${event.id}`}
              className="card card-compact w-auto bg-base-100 shadow-md mt-2 mb-4"
            >
              <figure>
                {!!event.imageUrl && (
                  <Image
                    className="h-auto min-w-min rounded-lg"
                    src={event.imageUrl}
                    alt={event.imageUrl}
                    width="500"
                    height="600"
                  />
                )}
              </figure>
              <div className="card-body">
                <div className="badge badge-primary">UPCOMING</div>
                <h2 className="card-title mr-24 text-3xl text-light">
                  {event.title}
                </h2>

                <p>
                  {event.date} at {event.time}
                </p>

                <div className="card-actions justify-end">
                  <a
                    href={`/events/${event.id}`}
                    className="btn btn-circle mr-2 bg-yellow border-transparent"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="white"
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
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </span>
      <br />
      <br />
      <br />

      <FooterNav />
    </main>
  );
}
