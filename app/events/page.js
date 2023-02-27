export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'All events',
  description:
    'Your journey to wellness is just a few clicks away. Review your Pilates purchases and complete your transaction securely on our online store. Embrace a healthier, stronger you with our personalized classes and equipment.',
  icons: {
    shortcut: '/icon.svg',
  },
};

export default function EventsPage() {
  return (
    <main>
      <div>
        <li>
          <a> Event 1</a>
          <a> Event 2</a>
          <a> Event 3</a>
          <a> Event 4</a>
        </li>
      </div>
    </main>
  );
}
