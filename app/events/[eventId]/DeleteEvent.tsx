'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  user: { id: number };
  events: { userId: number; id: number };
};

export default function DeleteEvent(props: Props) {
  const [errors, setErrors] = useState();
  const router = useRouter();

  return (
    <div>
      {props.user.id === props.events.userId && (
        <button
          onClick={async () => {
            const response = await fetch(`/api/events/${props.events.id}`, {
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
          DELETE
        </button>
      )}
    </div>
  );
}
