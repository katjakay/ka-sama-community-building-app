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
  }

  return (
    <main className="mt-5">
      <div>
        <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
          <input
            type="file"
            name="file"
            className="file-input file-input-bordered file-input-primary file-input-xs w-full max-w-xs mt-6 "
          />
          <img
            className="card w-100 bg-base-100 shadow-m mt-4"
            src={imageSrc}
            alt={imageSrc}
          />
          <button className="mt-4 text-primary cursor-crosshair">
            Upload ↳
          </button>
          <div className="text-yellow">
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

            router.replace(`/events/${props.event.id}/eventfeed`);
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
    </main>
  );
}
