import './globals.css';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUserBySessionToken } from '../database/users';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};
export default async function RootLayout({ children }) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  return (
    <html lang="en">
      <head />
      <body className="p-2">
        <div className="navbar bg-transparent rounded-box">
          <div className="flex-1 px-2 lg:flex-none">
            <svg
              width="45"
              height="22"
              viewBox="0 0 45 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="45" height="21.9286" fill="white" />
              <path
                d="M3 19H5.60462V13.6442L8.16144 10.9184L13.5618 19H16.7161L9.97751 9.07736L16.6444 2H13.0123L5.60462 9.93812V2H3V19Z"
                fill="#2F5FFF"
              />
              <path
                d="M28.7604 19H31.5084L25.3194 2H23.3361L17.1471 19H19.8951L21.4005 14.7201H27.2788L28.7604 19ZM22.2847 12.1857L24.3397 6.27989L26.3947 12.1857H22.2847Z"
                fill="#2F5FFF"
              />
              <path
                d="M42.5079 2L35.403 19H32.5395L39.7599 2H42.5079Z"
                fill="#2F5FFF"
              />
            </svg>
          </div>
          <div className="flex justify-end flex-2 px-0">
            <div className="flex items-stretch">
              <div className="dropdown dropdown-end">
                <button tabIndex={0} className="btn btn-ghost rounded-btn">
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
                      d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                    />
                  </svg>
                </button>
                <button
                  tabIndex={0}
                  className="menu dropdown-content p-2 shadow bg-yellow rounded-box w-52 mt-4"
                >
                  <li>
                    <a href="/">HOME</a>
                  </li>
                  <li>
                    <a href="/about">ABOUT</a>
                  </li>

                  <li>
                    <a href="/events">EVENTS</a>
                  </li>
                  <li>
                    {user ? (
                      <>
                        <Link href={`/profile/${user.username}`}>
                          <div className="text-blue">
                            {user.username.toUpperCase()}
                          </div>
                        </Link>
                        <Link href="/logout" prefetch={false}>
                          LOGOUT
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link href="/register">REGISTER</Link>
                        <Link href="/login">LOGIN</Link>
                      </>
                    )}
                  </li>
                </button>
              </div>
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
