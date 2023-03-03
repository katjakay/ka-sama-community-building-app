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
    <main className="flex flex-wrap justify-center m-5">
      <div className="text-center">
        <h1 className="text-6xl m-7">Mabuhay, welcome!</h1>
        <div>
          Building a stronger filipino community through events, anywhere in the
          world. Never alone always mag{' '}
          <mark className="px-6 text-2xl text-white bg-blue dark:bg-blue-500">
            KA-SAMA.
          </mark>
        </div>
        <div className="object-bottom">
          <Link href="/login">
            <button
              type="button"
              className="text-white bg-yellow text-white font-regular text-sm rounded mt-4 mb-4 min-w-full h-11"
            >
              {' '}
              DISCOVER
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
