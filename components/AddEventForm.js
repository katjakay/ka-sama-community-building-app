'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddEventForm(props) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [uploadData, setUploadData] = useState();
  const [errors, setErrors] = useState();
  const router = useRouter();

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === 'file',
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append('file', file);
    }

    formData.append('upload_preset', 'my-uploads');

    const data = await fetch(
      'https://api.cloudinary.com/v1_1/dy40peu7s/image/upload',
      {
        method: 'POST',
        body: formData,
      },
    ).then((r) => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);
  }

  return (
    <main>
      <h1 className="text-4xl mb-6 mt-4">
        Your contribution is precious. <br />
        Drop your ideas here to preserve culture
      </h1>

      <p className="text-brown">{errors}</p>

      <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
        <label>
          Upload your event image here:
          <br />
          <input
            type="file"
            name="file"
            className="file-input file-input-bordered file-input-primary w-full max-w-xs mt-4 mb-4"
          />
        </label>
        <p>Preview</p>
        <img
          className="card w-96 bg-base-100 shadow-xl"
          placeholder="https://res.cloudinary.com/dy40peu7s/image/upload/v1678432538/my-uploads/pd6gper7n2gtqvxxelck.png"
          src={imageSrc}
          alt="User"
        />
        <button className="btn btn-sm mt-2 mb-6">Upload</button>
      </form>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const response = await fetch('api/events', {
            method: 'POST',
            body: JSON.stringify({
              title: title,
              date: date,
              location: location,
              description: description,
              imageUrl: imageSrc,
              userId: props.user.id,
            }),
          });
          const data = await response.json();

          if ('errors' in data) {
            setErrors(data.errors);
            return;
          }

          router.replace(`/events`);
          router.refresh();
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
            className="block w-full p-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
