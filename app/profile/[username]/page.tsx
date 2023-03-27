import { cookies } from 'next/headers';
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
import ProfileTab from './ProfileTab';

export const metadata = {
  title:
    ' Ka-sama - A Community Building App for Cultural Preservation and Identity Building',
  description:
    ' Ka-sama is a community building app designed to help users connect with their roots and build a sense of pride and identity around their heritage. It serves as a space for cultural preservation and celebration, allowing users to connect with others who share similar cultural backgrounds and interests.',
  icons: {
    shortcut: '/icon.svg',
  },
};

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

  const currentUser = token && (await getUserBySessionToken(token.value));

  if (!currentUser) {
    return (
      NextResponse.json({ error: 'session token is not valid' }),
      redirect(`/login?returnTo=/locations`)
    );
  }

  const user = await getUserWithAllInfo(params.username);

  if (!user) {
    notFound();
  }
  const attendances = await getAttendanceByUserId(user.id);
  const events = await getEventsByUserId(user.id);
  const images = await getImagesByUserId(user.id);

  return (
    <main className="m-2 mt-2">
      <h3 className="text-yellow">
        {user.username.charAt(0).toUpperCase() + user.username.slice(1)}'s
        Profile
      </h3>
      <div className="flex flex-wrap flex-col place-items-center text-center">
        <div className="mt-8">
          <div className="avatar online">
            <div className="w-24 rounded-full">
              <img
                className="w-40 rounded-full"
                src={user.imageUrl || undefined}
                alt=""
              />
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
      <div className="badge badge-primary badge-outline mt-4 mb-4">
        About me
      </div>
      <p className="mb-4">{user.description}</p>
      <ProfileTab attendances={attendances} events={events} user={user} />

      <div className="badge badge-primary badge-outline mt-6 mb-4">
        My event photos
      </div>
      <div>
        {' '}
        <span>
          {images.map((image) => {
            return (
              <div
                key={`images-${image.userId}`}
                className="card lg:card-side bg-base-100 shadow-md
                 mt-2"
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
                <div className="card-body">
                  <p className="text-xs font-regular">{image.comment}</p>
                </div>
                <button className="btn btn-xs border-transparent bg-beige ml-1 mr-1">
                  {currentUser.id === user.id ? (
                    <DeleteImage image={image} />
                  ) : (
                    ''
                  )}
                </button>
              </div>
            );
          })}
        </span>
      </div>
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
