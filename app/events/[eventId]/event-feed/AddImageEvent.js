'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddImageToEvent(props) {
  const [imageSrc, setImageSrc] = useState('');
  const [comment, setComment] = useState('');
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
    <div>
      <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
        <input
          type="file"
          name="file"
          className="file-input file-input-bordered file-input-primary w-full max-w-xs mt-4 mb-4"
        />
        <img
          className="card w-96 bg-base-100 shadow-xl"
          placeholder="https://res.cloudinary.com/dy40peu7s/image/upload/v1678432538/my-uploads/pd6gper7n2gtqvxxelck.png"
          src={imageSrc}
          alt="event feed"
        />
        <button className="mt-4 text-primary cursor-crosshair">
          Upload ↳{' '}
        </button>
      </form>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const response = await fetch('api/images', {
            method: 'POST',
            body: JSON.stringify({
              userId: props.user.id,
              eventId: props.user.id,
              comment: comment,
              imageUrl: imageSrc,
            }),
          });
          const data = await response.json();

          if ('errors' in data) {
            setErrors(data.errors);
            return;
          }

          router.replace(`/events/${event.id}`);
          router.refresh();
        }}
      >
        <div className="mb-6">
          <label
            htmlFor="large-input"
            className="block mb-2 mt-4 text-xl font-medium text-gray-900 dark:text-white"
          >
            Comment
          </label>
          <input
            value={comment}
            onChange={(event) => setComment(event.currentTarget.value)}
            id="large-input"
            className="block w-full p-10 text-gray-900 border border-primary rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
          />
        </div>
        <button className="btn btn-sm mt-2 mb-6 bg-brown border-transparent cursor-crosshair">
          {' '}
          Share now
        </button>
      </form>
    </div>
  );
}
