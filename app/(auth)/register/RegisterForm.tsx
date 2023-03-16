'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBody } from '../../api/(auth)/register/route';

export default function RegisterForm(props: { returnTo?: string | string[] }) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imageSrc, setImageSrc] = useState<string>('');
  const [uploadData, setUploadData] = useState<Blob>();
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  function handleOnChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent: ProgressEvent<FileReader>) {
      setImageSrc(onLoadEvent.target!.result as string);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === 'file',
    ) as HTMLInputElement;

    const formData = new FormData();

    for (const file of fileInput.files as FileList) {
      formData.append('file', file);
    }

    formData.append('upload_preset', 'my-uploads');

    const data = await fetch(
      'https://api.cloudinary.com/v1_1/dofvjgdq6/image/upload',
      {
        method: 'POST',
        body: formData,
      },
    ).then((r) => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);
  }

  const placeholderImage =
    'https://res.cloudinary.com/dy40peu7s/image/upload/v1678802320/my-uploads/k1q1ocwpetnfven43j5m.jpg';

  return (
    <main>
      <form method="post" onSubmit={handleOnSubmit}>
        <div className="flex flex-wrap flex-col place-items-center">
          <br />

          <div className="avatar">
            <div className="w-40 rounded-full self-center">
              <img
                className="card w-96 bg-base-100 shadow-xl"
                placeholder="placeholderImage"
                src={imageSrc}
                alt="User"
              />
            </div>
          </div>
          <input
            onChange={handleOnChange}
            type="file"
            name="file"
            className="file-input file-input-bordered file-input-primary file-input-xs w-full max-w-xs mt-6 "
          />

          <br />
          <button className="btn btn-sm mb-8">Upload</button>
        </div>
      </form>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({
              username: username,
              password: password,
              location: location,
              description: description,
              imageUrl: imageSrc,
            }),
          });

          const data: RegisterResponseBody = await response.json();

          if ('errors' in data) {
            setErrors(data.errors);
            return;
          }

          if (
            props.returnTo &&
            !Array.isArray(props.returnTo) &&
            // This is checking that the return to is a valid path in your application and not going to a different domain
            /^\/[a-zA-Z0-9-?=/]*$/.test(props.returnTo)
          ) {
            router.push(props.returnTo);
            return;
          }

          router.replace(`/profile/${data.user.username}`);
          router.refresh();
        }}
      >
        {errors.map((error) => (
          <div key={`error-${error.message}`}>Error: {error.message}</div>
        ))}
        <label>
          Username
          <input
            className="block w-full input input-bordered input-md w-full max-w-screen-md"
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </label>
        <label>
          Location
          <input
            className="block w-full input input-bordered input-md w-full max-w-screen-md"
            value={location}
            onChange={(event) => setLocation(event.currentTarget.value)}
          />
        </label>
        <label>
          Description
          <input
            className="block w-full input input-bordered input-md w-full max-w-screen-md"
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
          />
        </label>
        <label>
          Password{' '}
          <input
            className="block w-full input input-bordered input-md w-full max-w-screen-md "
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>
        <button className="text-white bg-brown text-white font-regular text-sm rounded mt-16 mb-4 min-w-full h-11">
          Register
        </button>
      </form>
    </main>
  );
}
