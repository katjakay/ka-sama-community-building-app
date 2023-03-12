import Link from 'next/link';

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
    <main className="bg-white">
      <div className="flex flex-wrap justify-center m-5 min-h-screen">
        <div className="text-center min-h-screen justify-items-stretch">
          <h1 className="text-6xl m-7">Mabuhay, welcome!</h1>
          <div className="text-2xl mt-20">
            Building a stronger filipino community through events, anywhere in
            the world. Never alone always mag
            <br />
            <div className="mt-4 mb-24">
              <mark className="px-6 text-6xl text-white bg-blue dark:bg-blue-500">
                KA-SAMA.
              </mark>
            </div>
          </div>
          <Link href="/events">
            <button className="btn btn-wide btn-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
