import { cache } from 'react';
import { sql } from './connect';

export type Image = {
  id: number;
  userId: number | null;
  eventId: number | null;
  comment: string | null;
  imageUrl: string | null;
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

export type ImagesWithUserInfo = {
  imageId: number;
  userId: number;
  userName: string;
  userImageUrl: string | null;
  eventId: number;
  imageComment: string | null;
  imageUrl: string | null;
};

export const getImagesWithUserInfo = cache(async (eventId: number) => {
  const imagesWithUserInfo = await sql<ImagesWithUserInfo[]>`
  SELECT
  images.id AS image_id,
  users.id AS user_id,
  users.username AS user_name,
  users.image_url AS user_image_url,
  events.id AS event_id,
images.comment AS image_comment,
images.image_url AS image_url
FROM
images
INNER JOIN
events ON images.event_id = events.id
INNER JOIN
users ON images.user_id = users.id
WHERE
images.event_id = ${eventId}
  `;
  return imagesWithUserInfo;
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
      id = ${id}
    RETURNING *
  `;
  return image;
});
