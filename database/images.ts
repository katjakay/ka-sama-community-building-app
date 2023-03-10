import { cache } from 'react';
import { sql } from './connect';

export type Image = {
  id: number;
  userId: number;
  eventId: number;
  imageUrl: string;
};

// Get all images
export const getImage = cache(async () => {
  const images = await sql<Image[]>`
    SELECT * FROM images
  `;
  return images;
});

// Get all images from a user
export const getImagesByUserId = cache(async (userId: number) => {
  const [image] = await sql<Image[]>`
    SELECT
      *
    FROM
    images
    WHERE
    userId = ${userId}
  `;
  return image;
});

// Create a new image
export const createImage = cache(
  async (userId: number, eventId: number, imageUrl: string) => {
    const [image] = await sql<Image[]>`
      INSERT INTO images
        (userId, eventId, imageUrl)
      VALUES
        (${userId}, ${eventId}, ${imageUrl})
      RETURNING *
    `;
    return image;
  },
);

// Update an image by ID
export const updateImageById = cache(
  async (id: number, userId: number, eventId: number, imageUrl: string) => {
    const [image] = await sql<Image[]>`
      UPDATE
        images
      SET
      id = ${id},
      userId = ${userId},
      eventId = ${eventId},
      imageUrl = ${imageUrl}
      WHERE
        id = ${id}
      RETURNING *
    `;
    return image;
  },
);

// Delete an image by UserId
export const deleteImageById = cache(async (userId: number) => {
  const [image] = await sql<Image[]>`
    DELETE FROM
      images
    WHERE
      userId = ${userId}
    RETURNING *
  `;
  return image;
});
