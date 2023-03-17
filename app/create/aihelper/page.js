'use client';

import { useState } from 'react';

// import EventCreatorWithAi from './EventCreatorWithAi';

export default function CreateEventWithAi() {
  const [eventInput, setEventInput] = useState('');
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ event: eventInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
      setEventInput('');
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <main className="m-8 mt-10">
      <div>
        <h3 className="text-blue">AI HELPER</h3>
        <h1 className="text-4xl mt-4">
          We got your back and are here to support you.
        </h1>
        <form onSubmit={onSubmit}>
          <input
            name="event"
            placeholder="Enter an event"
            value={eventInput}
            onChange={(e) => setEventInput(e.target.value)}
          />
          <input type="submit" value="Generate Description" />
        </form>
        <div>{result}</div>
      </div>
      <div className="mt-4">{/* <EventCreatorWithAi /> */}</div>
    </main>
  );
}
