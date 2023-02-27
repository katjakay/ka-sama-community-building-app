ka_sama_community_building_app

-- Create events table
CREATE TABLE events (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
title varchar(500) NOT NULL,
  date varchar(50) NOT NULL,
  location varchar(500 NOT NULL,
  description varchar(1000),
);

-- Insert some events (C in CRUD - Create)
INSERT INTO events
  (title, date, location, description)
VALUES
('Tagalog for beginners', '04/03/23', 'FIGMA office 147 First Avenue 10003 East Village, New York, US','Get familiar with basic Tagalog: dialogues and vocabularies in a fun & easy way!');

('Philippine history lessons', '07/05/23', 'AANDERS Studio Halle Piaristengasse 65, 1080 Vienna, AT ',' Today the Philippines is an archipelago of 7,000 islands. However, it is believed that during the last ice age they were joined to mainland Asia by a land bridge, enabling human beings to walk from there. Learn more!');

('Filipino Food Festival', '23/06/23', 'Open Market Playground Kürschnergasse 2,, 1210 Vienna, AT ','Eat yourself happy or take plunge into the Donau. A lot of delicious dishes are waiting for you!');

('Pop-up Fashion from the Philippines', '15/08/23', 'Vintage Store 24 Burgasse 24, 1070 Vienna, AT', 'We have invited philippine fashion designers to exposed themselved internationally. Shop and connect with other fellow filipinos!');

-- Read some events (R in CRUD - Read)
SELECT * FROM events;
