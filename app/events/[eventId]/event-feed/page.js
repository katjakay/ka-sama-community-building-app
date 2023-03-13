import { getEventById } from '../../../../database/events';
import { eventNotFoundMetadata } from '../not-found';
import AddImageToEvent from './AddImageEvent';

export const dynamic = 'force-dynamic';

export async function generateMetadata(props) {
  const oneEvent = await getEventById(parseInt(props.params.eventId));

  if (!oneEvent) {
    return eventNotFoundMetadata;
  }

  return {
    title: 'Share your memories',
    description: `BLABLA`,
    icons: {
      shortcut: '/icon.svg',
    },
  };
}

export default async function ImagePageEvent(props) {
  const oneEvent = await getEventById(parseInt(props.params.eventId));

  return (
    <main className="m-8 mt-10">
      <h3 className="text-yellow">{oneEvent.title.toUpperCase()}</h3>
      <h1 className="text-4xl mt-4">Capture the moment,</h1>
      <p className="text-4xl mb-6 mt-0 text-gray-500">
        share the memory - upload your event photos now!
      </p>
      <div>
        <AddImageToEvent />
      </div>
      <div className="h-96 w-auto carousel carousel-vertical rounded-box">
        <div className="carousel-item h-full">
          <img
            src="https://res.cloudinary.com/dy40peu7s/image/upload/v1678740770/ka_sama/qk0z8fv8uzlmsw0ttj37.jpg"
            alt="ice cream"
          />
        </div>
        <div className="carousel-item h-full">
          <img
            src="https://res.cloudinary.com/dy40peu7s/image/upload/v1678740769/ka_sama/zlikui05xpdmvkoxw892.jpg"
            alt="bear"
          />
        </div>
        <div className="carousel-item h-full">
          <img
            src="https://res.cloudinary.com/dy40peu7s/image/upload/v1678741169/ka_sama/f8sn7uly6qnvfw2ijawd.webp"
            alt="dog"
          />
        </div>
        <div className="carousel-item h-full">
          <img
            src="https://res.cloudinary.com/dy40peu7s/image/upload/v1678741242/ka_sama/rdgcw4t09e0ylb99xf4i.jpg"
            alt="cat"
          />
        </div>
      </div>
    </main>
  );
}
