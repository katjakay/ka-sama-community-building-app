import { notFound } from 'next/navigation';
import { getUserByUsername } from '../../../database/users';

type Props = { params: { username: string } };

export default async function UserProfile({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  return (
    <main className="m-8 mt-10">
      <div className="flex flex-wrap flex-col justify-center">
        <div className="flex avatar justify-center">
          <div className="w-40 rounded-full">
            <img
              src="https://cdn.shopify.com/s/files/1/0632/4659/8402/files/JUNACO_SEPT_2020_53_d019cd72-9817-4cd7-a9d2-da75f8268227.jpg?v=1652992090&width=1100"
              alt="girl with curls"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <h1 className="text-4xl mt-4 mb-3">
            Welcome back, {user.username.toUpperCase()}!
          </h1>
        </div>
      </div>
    </main>
  );
}
