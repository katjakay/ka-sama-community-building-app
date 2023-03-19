'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  user: { id: number };
  images: { userId: number; id: number };
};

export default function DeleteImage(props: Props) {
  const [errors, setErrors] = useState();
  const router = useRouter();

  return (
    <div>
      {props.user.id === props.images.userId && (
        <button
          onClick={async () => {
            const response = await fetch(`/api/images/${props.images.id}`, {
              method: 'DELETE',
            });

            const data = await response.json();

            if ('errors' in data) {
              setErrors(data.errors);
              return;
            }

            router.refresh();

            await router.push('/events');
          }}
        >
          X
        </button>
      )}
    </div>
  );
}
