'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddImageToEvent(props) {
  const [imageSrc, setImageSrc] = useState('');
  const [comment, setComment] = useState('');
  const [uploadData, setUploadData] = useState();
  const [successUpload, setSuccessUpload] = useState(false);
  const [success, setSuccess] = useState(false);
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
    setSuccessUpload(true);

    console.log(uploadData);
  }

  return (
    <main className="mt-5">
      <hr className="mt-20" />
      <div className="mt-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="blue"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
          />
        </svg>

        <p className="text-4xl mb-6 mt-0 text-blue">Share the memories</p>
      </div>
      <p>{errors}</p>
      <div>
        <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
          <input
            type="file"
            name="file"
            className="file-input file-input-bordered file-input-grey file-input-xs w-full max-w-xs mt-2"
          />
          <p className="text-xs mt-2 mb-2">Preview</p>

          <img
            className="card w-96 bg-base-100 shadow-xl"
            src={imageSrc}
            alt={imageSrc}
          />
          <button className="btn btn-sm mt-4">Upload</button>

          <div className="text-blue text-xs mt-2">
            {successUpload && <p>Your event image was uploaded!</p>}
          </div>
        </form>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const response = await fetch('/api/images', {
              method: 'POST',
              body: JSON.stringify({
                userId: props.user.id,
                eventId: props.event.id,
                comment: comment,
                imageUrl: imageSrc,
              }),
            });
            const data = await response.json();

            if ('errors' in data) {
              setErrors(data.errors);
              return;
            }
            setSuccess(true);

            router.refresh();
          }}
        >
          <div className="mb-6">
            <label
              htmlFor="large-input"
              className="block mb-2 mt-4 text-xl font-medium text-brown dark:text-white"
            >
              Caption
            </label>
            <input
              value={comment}
              onChange={(event) => setComment(event.currentTarget.value)}
              id="large-input"
              className="block w-full input input-bordered input-md w-full max-w-screen-md p-10"
            />
          </div>
          <button
            className="btn btn-sm mb-4 bg-brown border-transparent cursor-crosshair"
            onClick={() => {
              router.refresh();
            }}
          >
            Share now
          </button>
          <div className="text-yellow">
            {success && <p>Your event was posted!</p>}
          </div>
        </form>
      </div>
      <br />
      <br />
    </main>
  );
}
