import Link from 'next/link';
import { getAllUsers } from '../../database/users';

export default async function CommunityDashboard() {
  const users = await getAllUsers();
  return (
    <main className="flex flex-wrap flex-col place-items-center text-center">
      <h3 className="text-yellow">KA-SAMA Community</h3>
      <div className="mt-6">
        <span>
          {users.map((user) => {
            return (
              <div key={`user-${user.id}`}>
                <Link href={`/profile/${user.username}`}>
                  <p className="font-light text-xs mb-2 mt-2">
                    {user.username.charAt(0).toUpperCase() +
                      user.username.slice(1)}
                  </p>
                  <div className="avatar online">
                    <div className="w-20 rounded-full">
                      <img src={user.imageUrl} alt="girl with curls" />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </span>
      </div>
    </main>
  );
}
