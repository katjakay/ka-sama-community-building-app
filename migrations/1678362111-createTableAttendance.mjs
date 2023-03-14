export async function up(sql) {
  await sql`
  CREATE TABLE attendances (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer REFERENCES users (id) ON DELETE CASCADE,
    event_id integer REFERENCES events (id) ON DELETE CASCADE
     )
`;
}

export async function down(sql) {
  await sql`
  DROP TABLE attendances
`;
}
