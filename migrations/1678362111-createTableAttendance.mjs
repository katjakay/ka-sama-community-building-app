export async function up(sql) {
  await sql`
  CREATE TABLE attendance (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer REFERENCES users (id),
    event_id integer REFERENCES events (id),
    attendance_time varchar(50)
  )
`;
}

export async function down(sql) {
  await sql`
  DROP TABLE attendance
`;
}
