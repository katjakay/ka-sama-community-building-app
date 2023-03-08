import EventDashboard from '../../components/AddEventForm';

export const metadata = {
  title: 'Create event',
  description: 'Placeholder for create event page.',
  icons: {
    shortcut: '/icon.svg',
  },
};

export default function CreateEventPage() {
  return (
    <main className="m-8 mt-10">
      <div>
        <h3 className="text-yellow">HOST YOUR EVENT</h3>
      </div>
      <EventDashboard />
    </main>
  );
}
