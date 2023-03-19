'use client';

import { useState } from 'react';

export default function Home() {
  const [eventInput, setEventInput] = useState('');
  const [result, setResult] = useState();
  const [errors, setErrors] = useState();

  return (
    <div>
      <main>
        <h3>Event description</h3>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const response = await fetch('/api/openai', {
              method: 'POST',
              body: JSON.stringify({ event: eventInput }),
            });
            const data = await response.json();
            if ('errors' in data) {
              setErrors(data.errors);
              return;
            }
            setResult(data.result);
            setEventInput('');
          }}
        >
          <input
            name="event"
            placeholder="Enter an event"
            value={eventInput}
            onChange={(event) => setEventInput(event.currentTarget.value)}
          />
          <input type="submit" value="Generate Description" />
        </form>
        <div>{result}</div>
      </main>
    </div>
  );
}
