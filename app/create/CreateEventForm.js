'use client';

export default function CreateEventForm() {
  return (
    <main>
      <form>
        <label htmlFor="title">Name</label>
        <input name="title" />
        <label htmlFor="date">date</label>
        <input name="date" />
        <label htmlFor="description">description</label>
        <input name="description" />
        <button> Create event</button>
      </form>
    </main>
  );
}
