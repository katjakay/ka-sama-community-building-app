'use client';

import { useState } from 'react';

export default function ImageUploadForm() {
  const [imageUrl, setImageUrl] = useState();
  const [uploadData, setUploadData] = useState();

  // Triggers when the file input changes
  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageUrl(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  // Triggers when  main form is submitted
  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === 'file',
    );

    // sends data to cloudinary
    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append('file', file);
    }

    formData.append('upload_preset', 'my-uploads');

    // add cloudinary name here
    const data = await fetch(
      'https://api.cloudinary.com/v1_1/dy40peu7s/image/upload',
      {
        method: 'POST',
        body: formData,
      },
    ).then((response) => response.json());

    setImageUrl(data.secure_url);
    setUploadData(data);
  }

  return (
    <div>
      <h1>Image Uploader</h1>
      <p>Upload your image to Cloudinary!</p>
      <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
        <p>
          <input type="file" name="file" />
        </p>

        <img src={imageUrl} alt="jelly" />

        {imageUrl && !uploadData && (
          <p>
            <button>Upload Files</button>
          </p>
        )}

        {uploadData && (
          <code>
            <p>{JSON.stringify(uploadData.url)}</p>
          </code>
        )}
      </form>
    </div>
  );
}
