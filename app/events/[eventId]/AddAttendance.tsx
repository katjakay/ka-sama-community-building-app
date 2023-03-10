'use client';

import { useState } from 'react';
import { Attendance } from '../../../database/attendance';

type Props = {
  attendances: Attendance[];
  eventId: number;
  userId: number;
};

export default function AddAttendance(props: Props) {
  const [attendances, setAttendances] = useState<Attendance[]>(
    props.attendances,
  );
  const [errors, setErrors] = useState();

  return (
    <div>
      <button
        className="text-white bg-yellow text-white font-regular
       text-sm rounded mt-4 mb-4 min-w-full h-11"
        onClick={async () => {
          const eventId = props.eventId;
          const response = await fetch('api/attendances', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              eventId,
            }),
          });

          const data = await response.json();

          if ('errors' in data) {
            setErrors(data.errors);
            return;
          }
          setAttendances([...attendances, data.attendance]);
        }}
      >
        YES! I'm joining
      </button>
    </div>
  );
}
