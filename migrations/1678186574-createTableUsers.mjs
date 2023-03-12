export async function up(sql) {
  await sql`
  CREATE TABLE users (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username varchar(80) NOT NULL UNIQUE,
    location varchar(80),
    description varchar(1000),
    password_hash varchar(70) NOT NULL
  )
`;
}

export async function down(sql) {
  await sql`
  DROP TABLE users
`;
}
