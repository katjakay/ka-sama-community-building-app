'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateEventForm(props) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const [errors, setErrors] = useState();
  const [successUpload, setSuccessUpload] = useState(false);
  const [success, setSuccess] = useState(false);
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
    setSuccessUpload(true);
  }

  return (
    <main>
      <h1 className="text-2xl mb-6 mt-4">
        Host a cultural event on Ka-sama - <br />{' '}
        <div className="text-beige">share your passion for your heritage.</div>
      </h1>
      <p className="text-brown">{errors}</p>
      <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
        <label>
          Upload your event image here:
          <br />
          <input
            type="file"
            name="file"
            className="file-input file-input-bordered file-input-primary file-input-xs w-full max-w-xs mt-6 "
          />
        </label>
        <p>Preview</p>
        <img
          className="card w-96 bg-base-100 shadow-xl"
          placeholder=""
          src={imageSrc}
          alt={imageSrc}
        />

        {!!imageSrc && !uploadData && (
          <p>
            <button className="btn btn-sm mt-2 mb-3">Upload</button>
          </p>
        )}
        <div className="text-blue">
          {successUpload && <p>Your event image was uploaded!</p>}
        </div>
      </form>
      <div className="mt-6">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const response = await fetch('api/events', {
              method: 'POST',
              body: JSON.stringify({
                title: title,
                date: date,
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
              placeholder="Give your event a title"
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
            <input
              value={date}
              placeholder="YYYY-MM-DD"
              onChange={(event) => setDate(event.currentTarget.value)}
              className="block w-full input input-bordered input-md w-full max-w-screen-md"
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
            <label
              htmlFor="large-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description{' '}
              <Link href="/create/aihelper">
                <p className="text-brown text-xs"> Need help?</p>
              </Link>
            </label>
            <input
              value={description}
              onChange={(event) => setDescription(event.currentTarget.value)}
              id="large-input"
              placeholder="Give us some information about the event"
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
            <div className="text-blue">
              {success && <p>Your event was created!</p>}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
