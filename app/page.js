export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Ka-sama',
  description:
    'Discover a space for community building and cultural preservation, to help users connect with their roots and build a sense of pride and identity around their heritage',
  icons: {
    shortcut: '/icon.svg',
  },
};

export default function HomePage() {
  return (
    <main className="flex flex-wrap justify-center m-5">
      <div className="text-center">
        <h1 className="text-6xl m-7">Mabuhay, welcome!</h1>
        <div>
          Building a stronger filipino community through events, anywhere in the
          world. Never alone always mag{' '}
          <mark className="px-6 text-2xl text-white bg-blue-600 dark:bg-blue-500">
            KA-SAMA.
          </mark>
        </div>

        <div className="flex flex-wrap justify-center">
          <button
            type="button"
            className="text-white bg-blue-700 font-regular text-sm rounded m-4 min-w-full h-11"
          >
            Login
          </button>
          <a className="text-xs font-normal underline"> Register now</a>
        </div>
      </div>
      <footer className="block fixed inset-x-0 bottom-0 z-10 m-6">
        <div className="flex justify-between">
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
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
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
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </div>
      </footer>
    </main>
  );
}
