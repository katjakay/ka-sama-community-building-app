import { getEventById } from '../../../../database/events';
import AddImageToEvent from './AddImageEvent';

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
    </main>
  );
}
