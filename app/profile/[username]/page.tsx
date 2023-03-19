import { notFound } from 'next/navigation';
import FooterNav from '../../../components/FooterNav';
import { getAttendanceByUserId } from '../../../database/attendances';
// import { getEventById } from '../../../database/events';
import { getImagesByUserId } from '../../../database/images';
import { getUserWithAllInfo } from '../../../database/users';

type Props = {
  params: {
    username: string;
    eventId: number;
    userId: number;
  };
};

export default async function UserProfile({ params }: Props) {
  // const oneEvent = await getEventById(params.eventId);
  const user = await getUserWithAllInfo(params.username);

  if (!user) {
    notFound();
  }

  const attendances = await getAttendanceByUserId(user.id);
  const images = await getImagesByUserId(user.id);

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
      <div
        tabIndex={0}
        className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box mt-6"
      >
        <div className="collapse-title text-xl font-regular bg-yellow">
          My upcoming events
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
      <div
        tabIndex={0}
        className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box mt-2"
      >
        <div className="collapse-title text-xl font-regular bg-purple">
          My event photos
        </div>
        <div className="collapse-content">
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
                        alt="event attendance"
                      />
                    )}
                  </figure>
                </div>
              );
            })}
          </span>
        </div>
      </div>
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
