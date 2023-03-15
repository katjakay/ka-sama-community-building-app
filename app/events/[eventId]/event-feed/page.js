import { cookies } from 'next/headers';
import Image from 'next/image';
import AddImageToEvent from '../../../../components/AddImageEvent';
import { getEventById } from '../../../../database/events';
import { getImageByEventId } from '../../../../database/images';
import { getUserBySessionToken } from '../../../../database/users';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Event photo feed',
  description: 'Placeholder to add photos to your event.',
  icons: {
    shortcut: '/icon.svg',
  },
};

export default async function ImagePageEvent(props) {
  const oneEvent = await getEventById(parseInt(props.params.eventId));
  const images = await getImageByEventId(oneEvent.id);

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  return (
    <main className="m-8 mt-10">
      <h3 className="text-yellow">{oneEvent.title.toUpperCase()}</h3>
      <div className="mt-2">
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
            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>

        <h1 className="text-4xl mt-2">Capture the moment...</h1>
      </div>

      <span>
        {images.map((image) => {
          return (
            <div
              key={`oneEvent-${image.id}`}
              className="card card-compact w-96 mt-4 bg-base-100 shadow-xl"
            >
              <figure>
                {!!image.imageUrl && (
                  <Image
                    src={image.imageUrl}
                    alt="single event image"
                    width="500"
                    height="300"
                  />
                )}
              </figure>
              <div className="card-body">
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
                      d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                    />
                  </svg>
                  <p className="text-blue">{user.username}</p>
                </div>
                <p>{image.comment}</p>
              </div>
            </div>
          );
        })}
      </span>
      <div className="mt-6">
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

        <p className="text-4xl mb-6 mt-0 text-gray-500">
          ...share the memory - upload your event photos now!
        </p>
        {user && <AddImageToEvent event={oneEvent} user={user} />}
      </div>
    </main>
  );
}
