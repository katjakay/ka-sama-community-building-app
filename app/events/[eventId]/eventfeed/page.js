import { cookies } from 'next/headers';
import Image from 'next/image';
import FooterNav from '../../../../components/FooterNav';
import { getEventById } from '../../../../database/events';
import { getImagesWithUserInfo } from '../../../../database/images';
import { getUserBySessionToken } from '../../../../database/users';
import AddImageToEvent from './AddImageEvent.js';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Explore Ka-sama Event Photos - Connect with Your Community',
  description:
    'Browse the event photo feed on Ka-sama, the community building app for cultural preservation and identity building. See photos from events hosted by members of the Ka-sama community, and connect with others who share your interests and passions. Share your own event photos and celebrate the diverse cultures and traditions represented on Ka-sama.',
  icons: {
    shortcut: '/icon.svg',
  },
};

export default async function ImagePageEvent(props) {
  const oneEvent = await getEventById(parseInt(props.params.eventId));

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  const imageUser = await getImagesWithUserInfo(oneEvent.id);

  return (
    <main className="m-2 mt-2 h-auto">
      <h3 className="text-yellow">{oneEvent.title.toUpperCase()}</h3>
      <div className="flex flex-wrap justify-center mt-6">
        <div className="tabs tabs-boxed mb-4">
          <a className="tab tab-active">View photos</a>
          <a className="tab" href="#upload">
            Upload
          </a>
        </div>
      </div>
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
        <p className="text-4xl mb-6 mt-0 text-blue">
          Browse through good times
        </p>
      </div>
      <span>
        {imageUser.map((image) => {
          return (
            <div
              key={`oneEvent-${image.id}`}
              className="card card-compact w-auto bg-base-100 shadow-xl mt-2 mb-4"
            >
              <figure>
                {!!image.imageUrl && (
                  <Image
                    className="h-auto min-w-min rounded-lg"
                    src={image.imageUrl}
                    alt={image.imageUrl}
                    width="500"
                    height="600"
                  />
                )}
              </figure>
              <div className="card-body">
                <div>
                  <div className="avatar">
                    <div className="w-6 rounded-full mr-2">
                      {image.comment}
                      <img src={image.userImageUrl} alt="test" />
                    </div>
                    <p className="text-beige text-xs mr-2">
                      by {image.userName}:
                    </p>
                    <p className=" text-xs mr-2">{image.imageComment}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </span>
      <div id="upload">
        {user && <AddImageToEvent event={oneEvent} user={user} />}
      </div>
      <FooterNav />
    </main>
  );
}
