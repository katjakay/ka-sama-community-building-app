'use client';

import { useState } from 'react';

export default function ImageUpload() {
  const [result, setResult] = useState('');
  const handleImageUpload = (event) => {
    event.preventDefault();
    const file = event.currentTarget['fileInput'].files[0];

    const formData = new FormData();
    formData.append('file', file);

    fetch('https://echo-api.3scale.net/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <form onSubmit={handleImageUpload}>
        <input id="fileInput" type="file" />
        <input type="submit" />
      </form>
      <br />
      <br />
      Result:
      <br />
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
