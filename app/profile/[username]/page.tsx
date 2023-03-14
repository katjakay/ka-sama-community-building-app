import Link from 'next/link';
import { notFound } from 'next/navigation';
import FooterNav from '../../../components/FooterNav';
import { getAttendanceByUserIdAndEventId } from '../../../database/attendances';
import { getEventById, getEvents } from '../../../database/events';
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
  const attendances = await getAttendanceByUserIdAndEventId(params.userId);
  const events = await getEvents();
  const filteredAttendances = attendances.filter(
    (attendance) => attendance.eventId === oneEvent?.id,
  );

  const user = await getUserWithAllInfo(params.username);

  if (!user) {
    notFound();
  }

  return (
    <main className="m-8 mt-10">
      <h3 className="text-yellow"> {user.username}'s Profile</h3>
      <div className="mt-4">
        <div className="avatar online">
          <div className="w-40 rounded-full">
            <img
              src="https://cdn.shopify.com/s/files/1/0632/4659/8402/files/JUNACO_SEPT_2020_53_d019cd72-9817-4cd7-a9d2-da75f8268227.jpg?v=1652992090&width=1100"
              alt="girl with curls"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl mt-4 mb-3">
            Hi I am, {user.username.toUpperCase()}!
          </h1>
          <div className="badge badge-primary badge-outline mt-4 mb-4">
            Location
          </div>{' '}
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
            className="text-white bg-blue text-white font-regular text-sm rounded mt-4 min-w-full h-11"
          >
            {' '}
            UPCOMING EVENTS
          </button>
        </Link>
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
      <span>
        {filteredAttendances.map((attendance) => {
          return (
            <div key={`event-${attendance.id}`}>
              <h1>{attendance.eventTitle}</h1>
            </div>
          );
        })}
      </span>
      <FooterNav />
    </main>
  );
}
