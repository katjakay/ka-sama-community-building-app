import { cookies } from 'next/headers';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import FooterNav from '../../../components/FooterNav';
import { getAttendanceByUserId } from '../../../database/attendances';
import { getEventsByUserId } from '../../../database/events';
import { getImagesByUserId } from '../../../database/images';
import {
  getUserBySessionToken,
  getUserWithAllInfo,
} from '../../../database/users';
import DeleteImage from './DeleteImage';

type Props = {
  params: {
    username: string;
    eventId: number;
    userId: number;
  };
};

export default async function UserProfile({ params }: Props) {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const currentUser = token && (await getUserBySessionToken(token.value));

  if (!currentUser) {
    return (
      NextResponse.json({ error: 'session token is not valid' }),
      redirect(`/login?returnTo=/locations`)
    );
  }

  // const oneEvent = await getEventById(params.eventId);
  const user = await getUserWithAllInfo(params.username);

  if (!user) {
    notFound();
  }

  const attendances = await getAttendanceByUserId(user.id);
  const images = await getImagesByUserId(user.id);
  const events = await getEventsByUserId(user.id);
  return (
    <main className="m-6 mt-10">
      <h3 className="text-yellow">
        {user.username.charAt(0).toUpperCase() + user.username.slice(1)}'s
        Profile
      </h3>
      <div className="flex flex-wrap flex-col place-items-center text-center">
        {' '}
        <div className="mt-8">
          <div className="avatar online">
            <div className="w-40 rounded-full">
              <img src={user.imageUrl} alt="girl with curls" />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-md mt-4">
              {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
            </p>
            <p className="text-md mb-3 text-beige">{user.location}</p>
          </div>
        </div>
      </div>
      <div className="badge badge-primary badge-outline mt-8 mb-4">
        About me
      </div>
      <p>{user.description}</p>
      <div className="badge badge-primary badge-outline mt-8 mb-4">
        Check out my events
      </div>
      <span>
        {events.map((event) => {
          return (
            <div
              className="card-compact card-side bg-base-100 shadow-xl"
              key={`oneEvent-${event.id}`}
            >
              <Link href="/">
                <figure>
                  {!!event.imageUrl && (
                    <img
                      className="max-w-sm min-h-full mb-4 rounded-lg"
                      src={event.imageUrl}
                      alt="event"
                      width="100"
                      height="100"
                    />
                  )}
                </figure>
              </Link>
              <div className="card-body">
                <h2 className="card-title">{event.title}</h2>
              </div>
            </div>
          );
        })}
      </span>

      {/* <span>
        {events.map((event) => {
          return (
            <div
              key={`oneEvent-${event.id}`}
              className="card card-side bg-base-100 shadow-xl mt-2"
            >
              <Link href="/">
                <figure>
                  {!!event.imageUrl && (
                    <img
                      className="max-w-sm min-h-full mb-4 rounded-lg"
                      src={event.imageUrl}
                      alt="event"
                    />
                  )}
                </figure>
              </Link>
              <div className="card-body">
                <h2 className="card-title">{event.title}</h2>
                <p>{event.location}</p>
                <p>{event.date}</p>
              </div>
            </div>
          );
        })}
      </span> */}
      <div
        tabIndex={0}
        className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box mt-6"
      >
        <div className="collapse-title text-xl font-light uppercase bg-yellow">
          I'M ATTENDING
        </div>
        <div className="collapse-content">
          <span>
            {attendances.map((attendance) => {
              return (
                <div
                  key={`oneEvent-${attendance.eventId}`}
                  className="card card-side bg-base-100 shadow-xl mt-2"
                >
                  <figure>
                    {!!attendance.eventImageUrl && (
                      <img
                        className="max-w-sm min-h-full mb-4 rounded-lg"
                        src={attendance.eventImageUrl}
                        alt="event attendance"
                      />
                    )}
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{attendance.eventTitle}</h2>
                    <p>{attendance.eventLocation}</p>
                    <p>{attendance.eventDate}</p>
                  </div>
                </div>
              );
            })}
          </span>
        </div>
      </div>
      {/* <div
        tabIndex={0}
        className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box mt-2"
      >
        <div className="collapse-title text-xl font-light uppercase bg-purple">
          My event photos
        </div> */}
      {/* <div className="collapse-content"> */}
      <span>
        {images.map((image) => {
          return (
            <div
              key={`images-${image.userId}`}
              className="card card-side bg-base-100 shadow-xl mt-2"
            >
              <figure>
                {!!image.imageUrl && (
                  <img
                    className="max-w-sm min-h-full mb-4 rounded-lg"
                    src={image.imageUrl}
                    alt={image.imageUrl}
                  />
                )}
              </figure>
              <br />
              <div>
                <button className="btn btn-xs">
                  {currentUser.id === user.id ? (
                    <DeleteImage image={image} />
                  ) : (
                    ''
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </span>
      <br />
      <br />
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
