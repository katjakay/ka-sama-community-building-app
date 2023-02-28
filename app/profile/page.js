export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Profile',
  description:
    'Your journey to wellness is just a few clicks away. Review your Pilates purchases and complete your transaction securely on our online store. Embrace a healthier, stronger you with our personalized classes and equipment.',
  icons: {
    shortcut: '/icon.svg',
  },
};

export default function UserProfilePage() {
  return (
    <main>
      <div>
        <h1> User profile</h1>
        <p>Rachel Mendoza</p>
        <p>New York</p>
      </div>
      <div>
        <p> Photos of events created by user.</p>
        <button> Edit profile</button>
      </div>
    </main>
  );
}