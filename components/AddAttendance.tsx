'use client';

import { useState } from 'react';
import { Attendance } from '../database/attendances';

type Props = {
  user: {
    id: number;
    username: string;
  };
  oneEvent: {
    id: number;
  };
  attendances: Attendance[];
};

export default function AddAttendance(props: Props) {
  const [attendances, setAttendances] = useState<Attendance[]>(
    props.attendances,
  );
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState();

  return (
    <div>
      <button
        className="text-white bg-yellow text-white font-regular
       text-sm rounded mt-4 mb-4 min-w-full h-11"
        onClick={async () => {
          const response = await fetch('/api/attendances', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: props.user.id,
              eventId: props.oneEvent.id,
            }),
          });

          const data = await response.json();

          if ('errors' in data) {
            setErrors(data.errors);
            return;
          }
          setSuccess(true);

          setAttendances([...attendances, data.attendance]);
        }}
      >
        YES! I'm joining
      </button>
      <div className="text-blue text-xs text-center">
        {success && <p>Nice! You're joining this event!</p>}
      </div>
      <p className="text-brown">{errors}</p>
    </div>
  );
}
