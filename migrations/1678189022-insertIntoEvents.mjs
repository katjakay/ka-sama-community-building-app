export const events = [
  {
    id: 1,
    title: 'Tagalog for beginners',
    date: '07.05.2023',
    location: 'FIGMA office 147 First Avenue 10003 East Village, New York, US',
    description:
      'Get familiar with basic Tagalog: dialogues and vocabularies in a fun & easy way!',
    image_url:
      'https://res.cloudinary.com/dy40peu7s/image/upload/v1678270023/ka_sama/1_jz6um4.png',
  },
  {
    id: 2,
    title: 'Philippine history lessons',
    date: '07.05.2023',
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
    location: 'Praterstraße 14 1020 Wien, Austria',
    description:
      'We have invited philippine fashion designers to exposed themselves internationally. Shop and connect with other fellow filipinos!',
    image_url:
      'https://res.cloudinary.com/dy40peu7s/image/upload/v1678270023/ka_sama/4_mp11yr.webp',
  },
  {
    id: 5,
    title: 'Barrio Fiesta',
    date: '15/08/23',
    location: 'Landstraßer Hauptstraße 2A 1030 Wien, Austria',
    description:
      'A celebration of Filipino culture and tradition featuring live performances of folk dances, music, and games, as well as a showcase of traditional Filipino cuisine',
    image_url:
      'https://res.cloudinary.com/dy40peu7s/image/upload/v1678300400/ka_sama/8_D0A0239-Edit_rso1me.webp',
  },
  {
    id: 6,
    title: 'Filipino Film Festival',
    date: '15/08/23',
    location: 'Opernring 7 1010 Wien, Austria',
    description:
      'A screening of award-winning Filipino films that showcase the countrys rich culture, history, and contemporary issues, as well as talks with the filmmakers and actors.',
    image_url:
      'https://res.cloudinary.com/dy40peu7s/image/upload/v1678300400/ka_sama/6_D0A7951-2_b7c27fdd-db8b-42cc-b4d6-ff70c48c4c2a_z12jzp.webp',
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
