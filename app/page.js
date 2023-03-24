import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title:
    ' Home | Ka-sama - A Community Building App for Cultural Preservation and Identity Building',
  description:
    ' Ka-sama is a community building app designed to help users connect with their roots and build a sense of pride and identity around their heritage. It serves as a space for cultural preservation and celebration, allowing users to connect with others who share similar cultural backgrounds and interests.',
  icons: {
    shortcut: '/icon.svg',
  },
};

export default function HomePage() {
  return (
    <main>
      <div className="w-90 carousel rounded-box mb-2">
        <img src="/ka-sama-full.svg" className="w-full" alt="ka-sama logo" />
      </div>
      <div className="w-90 bg-lightBrown h-auto rounded-box">
        <div className="min-h-screen justify-items-stretch">
          <br />
          <br />
          <br />
          <br />
          <h1 className="text-4xl text-blue mb-15 mt-10 text-center">
            <p className="italic"> Ka-sama - meaning: companion, together</p>
          </h1>
          <br />

          <div className="text-ls mt-10 m-10 text-center text-justify">
            Events to connect with your roots and celebrate diversity with
            Kasama - Your community for cultural preservation and identity
            building.
            <br />
          </div>
          <div className="flex flex-wrap place-content-center">
            <Link
              href="/events"
              className="btn btn-circle bg-yellow border-transparent mt-9 justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="yellow"
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
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
