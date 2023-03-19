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
export const getImageByEventId = cache(async (eventId: number) => {
  const images = await sql<Image[]>`
    SELECT
*
    FROM
    images

    WHERE
      images.event_id = ${eventId}
  `;
  return images;
});

// Get all images from one user??
export const getImagesByUserId = cache(async (userId: number) => {
  const images = await sql<Image[]>`
    SELECT
      *
    FROM
    images
    WHERE
      images.user_id = ${userId}
  `;
  return images;
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

// Delete an image by UserId and EventId
export const deleteImageById = cache(async (id: number) => {
  const [image] = await sql<Image[]>`
    DELETE FROM
      images
    WHERE
      id = ${id},
    RETURNING *
  `;
  return image;
});
