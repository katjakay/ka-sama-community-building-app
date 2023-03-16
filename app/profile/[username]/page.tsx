import Link from 'next/link';
import { notFound } from 'next/navigation';
import FooterNav from '../../../components/FooterNav';
import { getAttendanceByUserId } from '../../../database/attendances';
import { getEventById } from '../../../database/events';
import { getUserWithAllInfo } from '../../../database/users';

type Props = {
  params: {
    username: string;
    eventId: number;
    userId: number;
  };
};

export default async function UserProfile({ params }: Props) {
  const oneEvent = await getEventById(params.eventId);
  const user = await getUserWithAllInfo(params.username);

  if (!user) {
    notFound();
  }

  const attendances = await getAttendanceByUserId(user.id);

  return (
    <main className="m-8 mt-10">
      <h3 className="text-yellow">
        {' '}
        {user.username.charAt(0).toUpperCase() + user.username.slice(1)}'s
        Profile
      </h3>
      <div className="mt-4">
        <div className="avatar online">
          <div className="w-40 rounded-full">
            <img src={user.imageUrl} alt="girl with curls" />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl mt-4 mb-3">
            Hi I am,{' '}
            {user.username.charAt(0).toUpperCase() + user.username.slice(1)}!
          </h1>
          <div className="badge badge-primary badge-outline mt-4 mb-4">
            Location
          </div>
          <p>{user.location}</p>
        </div>
        <div className="badge badge-primary badge-outline mt-4 mb-4">
          About me
        </div>
        <p>{user.description}</p>
      </div>

      <div className="object-bottom">
        <Link href="/">
          <button
            type="button"
            className="text-white bg-brown text-white font-regular text-sm rounded mt-2 mb-4 min-w-full h-11"
          >
            {' '}
            MY EVENT PHOTOS
          </button>
        </Link>
      </div>
      <div className="badge badge-primary badge-outline mt-4 mb-4">
        My upcoming events{' '}
      </div>

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

      <FooterNav />
    </main>
  );
}
