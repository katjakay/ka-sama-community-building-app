import { cookies } from 'next/headers';
import AddEventForm from '../../components/AddEventForm';
import { getEventById } from '../../database/events';
import { getUserBySessionToken } from '../../database/users';

export const metadata = {
  title: 'Create event',
  description: 'Placeholder for create event page.',
  icons: {
    shortcut: '/icon.svg',
  },
};

export default async function CreateEventPage(props) {
  const events = await getEventById(props.params.eventId);

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  return (
    <main className="m-8 mt-10">
      <div>
        <h3 className="text-yellow">HOST YOUR EVENT</h3>
      </div>
      {user && <AddEventForm events={events} user={user} />}
    </main>
  );
}
