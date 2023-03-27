'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Image } from '../../../database/images';

type Props = {
  image: Image;
};

export default function RemoveImage(props: Props) {
  const [error, setError] = useState<string>();
  const router = useRouter();

  return (
    <main>
      {typeof error === 'string' && <div style={{ color: 'red' }}>{error}</div>}

      <div key={`image-${props.image.id}`}>
        <button
          onClick={async () => {
            const response = await fetch(`/api/images/${props.image.id}`, {
              method: 'DELETE',
            });

            const data = await response.json();

            if (data.error) {
              setError(data.error);
              return;
            }

            router.refresh();
          }}
        >
          x
        </button>
      </div>
    </main>
  );
}
