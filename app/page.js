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
      <div className="w-90 bg-lightBrown rounded-box">
        <div className="min-h-screen justify-items-stretch">
          <br />
          <br />
          <br />
          <br />
          <h1 className="text-4xl text-blue mb-15 mt-10 text-center xl:text-8xl xl:ml-96 xl:mr-96">
            <p className="italic"> Ka-sama - meaning: companion, together</p>
          </h1>
          <br />

          <div className="text-ls mt-10 m-10 xl:text-4xl xl:ml-96 xl:mr-96 text-center text-justify">
            Events to connect with your roots and celebrate diversity with
            Kasama - Your community for cultural preservation and identity
            building.
            <br />
          </div>
          <div className="flex flex-wrap place-content-center mt-20">
            <a
              className="btn btn-wide bg-yellow border-transparent"
              href="/register"
            >
              JOIN KA-SAMA
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
