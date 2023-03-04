import CreateEventForm from './EventDashboard';

export const metadata = {
  title: 'Create event',
  description: 'Placeholder for create event page.',
  icons: {
    shortcut: '/icon.svg',
  },
};

export default function CreateEventPage() {
  return (
    <main>
      <CreateEventForm />
    </main>
  );
}
