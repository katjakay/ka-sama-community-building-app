export async function up(sql) {
  await sql`
  CREATE TABLE events (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title varchar(500) NOT NULL,
    date varchar(50) NOT NULL,
    location varchar(500) NOT NULL,
    description varchar(1000),
    image_url varchar(500),
    user_id integer REFERENCES users (id)
  )
  `;
}

export async function down(sql) {
  await sql`
  DROP TABLE events
  `;
}
