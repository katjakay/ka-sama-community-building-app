import Link from 'next/link';
import { getAllUsers } from '../../database/users';

export const metadata = {
  title: 'The Ka-sama Community - Celebrate Culture and Heritage',
  description:
    'Join the Ka-sama community and connect with others who share your passion for cultural preservation and identity building. With Ka-sama, you can connect with people from different cultures and backgrounds, learn about different customs and traditions, and celebrate the rich diversity of our world´s heritage.',
  icons: {
    shortcut: '/icon.svg',
  },
};

export default async function CommunityDashboard() {
  const users = await getAllUsers();
  return (
    <main className="mt-2 mb-4">
      <h3 className="text-yellow text-left mr-2 ml-2">KA-SAMA Community</h3>
      <div className="w-90 bg-lightBrown h-auto rounded-box mt-2">
        <div className="flex flex-wrap flex-col text-center">
          <p className="text-4xl  mt-0 text-brown text-left mr-6 ml-6 mt-6 mb-6">
            Where ideas collide, creativity thrives, and collaboration reigns
            supreme.{' '}
          </p>
          <p className="text-left mr-6 ml-6 mb-6">
            We're all about inclusivity, diversity, and embracing different
            perspectives. So don't be shy – ask questions, share your thoughts,
            and let's build something amazing together!
          </p>
          <div className="mb-4 flex flex-wrap justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="blue"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="mt-6">
          <span>
            {users.map((user) => {
              return (
                <div key={`user-${user.id}`}>
                  <Link href={`/profile/${user.username}`}>
                    <p className="font-light text-xs mb-2 mt-2">
                      {user.username.charAt(0).toUpperCase() +
                        user.username.slice(1)}
                    </p>
                    <div className="avatar online">
                      <div className="w-20 rounded-full">
                        <img src={user.imageUrl} alt="girl with curls" />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </span>
        </div>
      </div>
    </main>
  );
}
