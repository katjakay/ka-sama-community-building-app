'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddEventForm(props) {
  // const [events, setEvents] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState();
  const router = useRouter();

  return (
    <main>
      <h1 className="text-4xl mb-6 mt-4">
        Your contribution is precious. <br />
        Drop your ideas here to preserve culture
      </h1>

      <p className="text-brown">{error}</p>

      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const response = await fetch('api/create/', {
            method: 'POST',
            body: JSON.stringify({
              title: title,
              date: date,
              location: location,
              description: description,
              imageUrl: imageUrl,
              userId: props.user.id,
            }),
          });

          const data = await response.json();

          if ('errors' in data) {
            setError(data.errors);
            return;
          }
        }}
      >
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Date
          </label>
          <input
            value={date}
            onChange={(event) => setDate(event.currentTarget.value)}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Location
          </label>
          <input
            value={location}
            onChange={(event) => setLocation(event.currentTarget.value)}
            id="default-input"
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="large-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <input
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
            id="large-input"
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="large-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Image (placeholder)
          </label>
          <input
            value={imageUrl}
            onChange={(event) => setImageUrl(event.currentTarget.value)}
            id="large-input"
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap justify-center">
          <button
            className="text-white bg-yellow text-white font-regular text-sm rounded m-4 min-w-full h-11"
            onClick={() => {
              router.refresh();
            }}
          >
            Create event
          </button>
        </div>
      </form>
    </main>
  );
}
