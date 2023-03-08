export const events = [
  {
    id: 1,
    title: 'Tagalog for beginners',
    date: '04/03/23',
    location: 'FIGMA office 147 First Avenue 10003 East Village, New York, US',
    description:
      'Get familiar with basic Tagalog: dialogues and vocabularies in a fun & easy way!',
    image_url:
      'https://res.cloudinary.com/dy40peu7s/image/upload/v1678270023/ka_sama/1_jz6um4.png',
  },
  {
    id: 2,
    title: 'Philippine history lessons',
    date: '07/05/23',
    location: 'AANDERS Studio Halle Piaristengasse 65, 1080 Vienna, AT ',
    description:
      'Today the Philippines is an archipelago of 7,000 islands. However, it is believed that during the last ice age they were joined to mainland Asia by a land bridge, enabling human beings to walk from there. Learn more!',
    image_url:
      'https://res.cloudinary.com/dy40peu7s/image/upload/v1678270023/ka_sama/2_cbyqsn.png',
  },

  {
    id: 3,
    title: 'Filipino Food Festival',
    date: '23/06/23',
    location: 'Open Market Playground Kürschnergasse 2, 1210 Vienna, AT ',
    description:
      'Eat yourself happy or take plunge into the Donau. A lot of delicious dishes are waiting for you!',
    image_url:
      'https://res.cloudinary.com/dy40peu7s/image/upload/v1678270023/ka_sama/3_szxqxe.png',
  },
  {
    id: 4,
    title: 'Pop-up Fashion from the Philippines',
    date: '15/08/23',
    location: 'Vintage Store 24 Burgasse 24, 1070 Vienna, AT',
    description:
      'We have invited philippine fashion designers to exposed themselves internationally. Shop and connect with other fellow filipinos!',
    image_url:
      'https://res.cloudinary.com/dy40peu7s/image/upload/v1678270023/ka_sama/3_szxqxe.png',
  },
];

export async function up(sql) {
  await sql`
INSERT INTO events ${sql(
    events,
    'title',
    'date',
    'location',
    'description',
    'image_url',
  )}
`;
}

export async function down(sql) {
  for (const event of events) {
    await sql`
    DELETE FROM
    events
    WHERE
    id = ${event.id}
    `;
  }
}
