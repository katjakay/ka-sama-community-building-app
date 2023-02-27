import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Ka-sama',
  description:
    'Discover a space for community building and cultural preservation, to help users connect with their roots and build a sense of pride and identity around their heritage',
  icons: {
    shortcut: '/icon.svg',
  },
};

export default function HomePage() {
  return (
    <main>
      <div>The users logs in / signs up here.</div>
      <Link href="/login">Login</Link>
    </main>
  );
}
