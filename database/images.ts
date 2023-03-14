import { cache } from 'react';
import { sql } from './connect';

export type Image = {
  id: number;
  userId: number;
  eventId: number;
  comment: string;
  imageUrl: string;
};

// Get all images from one user
export const getImagesByUserId = cache(async (userId: number) => {
  const [image] = await sql<Image[]>`
    SELECT
      *
    FROM
    images
    WHERE
      user_id = ${userId}
  `;
  return image;
});

// Create a new image
export const createImage = cache(
  async (
    userId: number,
    eventId: number,
    comment: string,
    imageUrl: string,
  ) => {
    const [image] = await sql<Image[]>`
      INSERT INTO images
        (user_id, event_id, comment, image_url)
      VALUES
        (${userId}, ${eventId}, ${comment}, ${imageUrl})
      RETURNING *
    `;
    return image;
  },
);

// Delete an image by UserId
export const deleteImageByUserId = cache(async (userId: number) => {
  const [image] = await sql<Image[]>`
    DELETE FROM
      images
    WHERE
      user_id = ${userId}
    RETURNING *
  `;
  return image;
});
