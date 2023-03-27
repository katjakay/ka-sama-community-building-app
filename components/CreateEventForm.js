'use client';

import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

const { format } = require('date-fns');

export default function CreateEventForm(props) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const [errors, setErrors] = useState();
  const [successUpload, setSuccessUpload] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const formattedDate = selectedDate ? format(selectedDate, 'dd-MM-yyyy') : '';

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    console.log(uploadData);

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
    ).then((response) => response.json());

    setImageSrc(data.secure_url);
    setUploadData(data);
    setSuccessUpload(true);
  }

  return (
    <main>
      <h1 className="text-2xl mb-9 mt-4">
        Host a cultural event on Ka-sama - <br />{' '}
        <div className="text-beige">share your passion for your heritage.</div>
      </h1>
      <p className="text-brown">{errors}</p>
      <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
        <label>
          Choose your event image:
          <br />
          <input
            type="file"
            name="file"
            className="file-input file-input-bordered file-input-primary file-input-xs w-full max-w-xs mt-2"
          />
        </label>
        <p className="text-xs mt-2 mb-2">Preview</p>
        <img
          className="card w-96 bg-base-100 shadow-xl"
          placeholder=""
          src={imageSrc}
          alt={imageSrc}
        />

        <button className="btn btn-sm mt-4">Upload</button>

        <div className="text-blue text-xs mt-2">
          {successUpload && <p>Your event image was uploaded!</p>}
        </div>
      </form>
      <div className="mt-2">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const response = await fetch('api/events', {
              method: 'POST',
              body: JSON.stringify({
                title: title,
                date: formattedDate,
                time: time,
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
            setSuccess(true);

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
              className="block w-full input input-bordered input-md w-full max-w-screen-md"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Date
            </label>
            <DatePicker
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              selected={selectedDate}
              placeholderText="Select a date"
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd-MM-yyyy"
              value={formattedDate}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Time
            </label>
            <input
              value={time}
              placeholder="00:00"
              onChange={(event) => setTime(event.currentTarget.value)}
              className="block w-full input input-bordered input-md w-full max-w-screen-md"
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
              className="block w-full input input-bordered input-md w-full max-w-screen-md"
            />
          </div>
          <div className="mb-6">
            <a href="https://ka-sama-ai-helper.netlify.app/">
              <label
                htmlFor="large-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
                <p className="text-brown text-xs"> Need help?</p>
              </label>
            </a>
            <input
              value={description}
              onChange={(event) => setDescription(event.currentTarget.value)}
              id="large-input"
              className="block w-full input input-bordered input-md w-full max-w-screen-md"
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
            <div className="text-blue text-xs">
              {success && <p>Your event was created!</p>}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
