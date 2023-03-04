'use client';

import { Cloudinary } from 'cloudinary-core';
import { Image } from 'cloudinary-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const cloudinary = new Cloudinary({
  cloud_name: 'dy40peu7s',
  api_key: '433852971859245',
  api_secret: 'KmBXdDdeRNZNAOCbRmsV4nTKKPI',
});

export default function ImageUpload() {
  // const router = useRouter();
  const [image, setImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'hgd09mip');
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${
        cloudinary.config().cloud_name
      }/image/upload`,
      {
        method: 'POST',
        body: formData,
      },
    );
    const data = await response.json();
    setImage(data.secure_url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Do something with the uploaded image, e.g. save it to a database
    await router.push('/events');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Upload an image:
          <input type="file" onChange={handleImageUpload} />
        </label>
        <button>Submit</button>
      </form>
      {image && (
        <div>
          <Image cloudName={cloudinary.config().cloud_name} publicId={image} />
        </div>
      )}
    </div>
  );
}
