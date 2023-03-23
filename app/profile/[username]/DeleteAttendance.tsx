'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Attendance } from '../../../database/attendances';

type Props = {
  attendance: Attendance;
};

export default function DeleteAttendance(props: Props) {
  const [error, setError] = useState<string>();

  const router = useRouter();

  return (
    <main>
      {typeof error === 'string' && <div style={{ color: 'red' }}>{error}</div>}

      <div key={`attendance-${props.attendance.id}`}>
        <button
          onClick={async () => {
            const response = await fetch(
              `/api/attendances/${props.attendance.id}`,
              {
                method: 'DELETE',
              },
            );

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
