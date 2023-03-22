'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Event } from '../../database/events';

type Props = {
  user: { id: number };
  event: Event;
};

export default function DeleteEvent(props: Props) {
  const [errors, setErrors] = useState();
  const router = useRouter();

  return (
    <div>
      {props.user.id === props.event.userId && (
        <button
          onClick={async () => {
            const response = await fetch(`/api/events/${props.event.id}`, {
              method: 'DELETE',
            });

            const data = await response.json();

            if ('errors' in data) {
              setErrors(data.errors);
              return;
            }

            router.refresh();
            router.push('/events');
          }}
        >
          X
        </button>
      )}
      {typeof errors === 'string' && (
        <div style={{ color: 'red' }}>{errors}</div>
      )}
    </div>
  );
}
