'use client';

import Link from 'next/link';
import { useState } from 'react';
import DeleteAttendance from './DeleteAttendance';

export default function SelectForm(props) {
  const [userChoice, setUserChoice] = useState('events');

  return (
    <div>
      <div>
        <select
          tabIndex={0}
          value={userChoice}
          onChange={(e) => {
            setUserChoice(e.target.value);
          }}
          className="mt-4 mb-4 select bg-yellow text-xl font-light uppercase select-lg w-full"
        >
          <option value="events">Events I've created</option>
          <option value="attendance">Events I'm joining</option>
        </select>
      </div>
      <div>
        {userChoice === 'events' ? (
          <div>
            {props.events.map((event) => {
              return (
                <div
                  key={`oneEvent-${event.id}`}
                  className="card lg:card-side bg-base-100 shadow-xl mt-2"
                >
                  <Link href={`/events/${event.id}`}>
                    <figure>
                      {!!event.imageUrl && (
                        <img
                          className="max-w-sm min-h-full rounded-lg"
                          src={event.imageUrl}
                          alt={event.imageUrl}
                        />
                      )}
                    </figure>
                  </Link>
                  <div className="card-body">
                    <h2 className="card-title">{event.title}</h2>
                    <p className="text-xs font-regular">{event.location}</p>
                    <p className="text-xs font-medium">
                      {event.date} / {event.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            {props.attendances.map((attendance) => {
              return (
                <div
                  key={`oneEvent-${attendance.eventId}`}
                  className="card lg:card-side bg-base-100 shadow-xl mt-2"
                >
                  <Link href={`/events/${attendance.eventId}`}>
                    <figure>
                      {!!attendance.eventImageUrl && (
                        <img
                          className="max-w-sm min-h-full rounded-lg"
                          src={attendance.eventImageUrl}
                          alt={attendance.eventImageUrl}
                        />
                      )}
                    </figure>
                  </Link>
                  <div className="card-body">
                    <h2 className="card-title">{attendance.eventTitle}</h2>
                    <p className="text-xs font-regular">
                      {attendance.eventLocation}
                    </p>
                    <p className="text-xs font-regular">
                      {attendance.eventDate}
                    </p>
                  </div>
                  <button className="btn btn-xs border-transparent bg-beige ml-1 mr-1">
                    <DeleteAttendance attendance={attendance} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
