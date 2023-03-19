export const metadata = {
  title:
    ' About Ka-sama - A Community Building App for Cultural Preservation and Identity Building',
  description:
    ' Ka-sama is a community building app designed to help users connect with their roots and build a sense of pride and identity around their heritage. With Ka-sama, users can share stories, traditions, and experiences, as well as learn about different cultures and customs from around the world.',
  icons: {
    shortcut: '/icon.svg',
  },
};

export default function AboutPage() {
  return (
    <main className="m-6 mt-10">
      <h3 className="text-yellow">About KA-SAMA</h3>
      <h1 className="text-4xl mt-4">A space to create</h1>
      <span className="text-4xl mb-6 mt-0 text-beige">
        and connect with our roots
      </span>
      <div className="w-100 carousel rounded-box flex flex-wrap items-center mt-6">
        <div className="carousel-item w-full">
          <div className="carousel-item w-full flex flex-wrap flex-col mr-2 ml-2">
            {' '}
            <img
              src="/ka-sama-logo.svg"
              className="w-full"
              alt="ka-sama logo"
              width="100"
              height="50"
            />
            <div>
              Swipe to read about Ka-sama <br />↳
            </div>
          </div>
          <div className="carousel-item w-full flex flex-wrap flex-col  text-center text-justify m-10">
            <div>
              <span>
                <p className="text-brown">WHY KA-SAMA?</p>
                <br />
                1 million Filipinos leave their home country yearly in search of
                better opportunities, but in the process, they often lose touch
                with their roots and cultural identity. KA-SAMA is a platform
                that aims to address the issue of cultural erosion among
                Filipinos living abroad.
                <br />↳
              </span>
            </div>
            <br />
          </div>
          <div className="carousel-item w-full">
            <img
              src="https://res.cloudinary.com/dy40peu7s/image/upload/v1679243389/my-uploads/hpeqide1h82gjux3pdrf.jpg"
              className="w-full"
              alt="Philippine island"
            />
          </div>
          <div className="carousel-item w-full flex flex-wrap flex-col  text-center text-justify m-10">
            <div>
              <span>
                <p className="text-blue">WHAT IS KA-SAMA?</p>
                <br />
                KA-SAMA is a platform that aims to address the issue of cultural
                erosion among Filipinos living abroad. By providing a space for
                community building and cultural preservation, the app aims to
                help users connect with their roots and build a sense of pride
                and identity around their heritage.
                <br />↳
              </span>
            </div>
          </div>
          <div className="carousel-item w-full">
            <img
              src="https://res.cloudinary.com/dy40peu7s/image/upload/v1679245775/my-uploads/wrkvtfloelb3oeybadci.png"
              className="w-full"
              alt="Philippine island"
            />
          </div>
          <div className="carousel-item w-full flex flex-wrap flex-col  text-center text-justify m-10">
            <div>
              <span>
                <p className="text-blue">HOW TO BUILD A COMMUNITY?</p>
                <br />
                KA-SAMA emphasizes community building and stands out from other
                event platforms through <div className="text-blue">
                  EVENTS
                </div>{' '}
                and meet-ups that bring people together. Users can connect and
                build relationships based on a shared cultural identity. The app
                includes a community forum for discussions on Philippine
                culture.
                <br />↳
              </span>
            </div>
          </div>
          <div className="carousel-item w-full flex flex-wrap flex-col  text-center text-justify m-10">
            <div>
              <span>
                <p className="text-blue">COLLABORATION AND SHARING KNOWLEDGE</p>
                <br />
                By providing users with the opportunity to actively participate
                and collaborate in preserving their culture, KA-SAMA hopes to
                create a sense of pride and connection to their heritage.
                <br />↳
              </span>
            </div>
          </div>
          <div className="carousel-item w-full flex flex-wrap flex-col  text-center text-justify m-10">
            <div>
              <span>
                <p className="text-blue">BUILDING TOGETHER</p>
                <br />
                The app will also include features such as user-generated
                content, allowing users to share their own experiences and
                perspectives on Philippine culture. This will encourage
                engagement and interaction among users, and help to build a
                sense of community within the app.
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
