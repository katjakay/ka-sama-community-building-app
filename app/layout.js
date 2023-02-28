import './globals.css';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="m-2 p-2">
        <nav>
          <ul className="flex flex-wrap items-center justify-between mx-auto">
            <li className="inline-block p-4">
              <Link href="/">Home</Link>
            </li>
            <li className="inline-block p-4">
              <Link href="/events">Events</Link>
            </li>
            <li className="inline-block p-4">
              <Link href="/create">Create</Link>
            </li>
            <li className="inline-block p-4">
              <Link href="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
