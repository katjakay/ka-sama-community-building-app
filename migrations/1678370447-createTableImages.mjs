export async function up(sql) {
  await sql`
  CREATE TABLE images (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer REFERENCES users (id),
   event_id integer REFERENCES events (id),
   image_url varchar(500)
  )
  `;
}

export async function down(sql) {
  await sql`
  DROP TABLE images
  `;
}
