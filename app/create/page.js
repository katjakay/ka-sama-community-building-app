import { cookies } from 'next/headers';
import AddEventForm from '../../components/CreateEventForm';
import { getEventById } from '../../database/events';
import { getUserBySessionToken } from '../../database/users';

export const metadata = {
  title: 'Create a Cultural Event on Ka-sama - Connect with Your Community',
  description:
    'Host a cultural event on Ka-sama and share your passion for your heritage. With easy event creation tools, you can set up your event in minutes and invite your friends and community members to join. Celebrate traditions, share experiences, and connect with like-minded individuals. Join Ka-sama today and start creating events that bring people together and celebrate diversity.',
  icons: {
    shortcut: '/icon.svg',
  },
};

export default async function CreateEventPage(props) {
  const events = await getEventById(props.params.eventId);

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  return (
    <main className="m-2 mt-2">
      <div>
        <h3 className="text-yellow">HOST YOUR EVENT</h3>
      </div>
      {user && <AddEventForm events={events} user={user} />}
    </main>
  );
}
