-- CREATE TABLE users (
--   -- id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
--   email TEXT PRIMARY KEY NOT NULL,
--   token TEXT NOT NULL
-- );

CREATE TABLE posts (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  location TEXT,
  notes TEXT,
  rating INTEGER DEFAULT 1,
  date_created TIMESTAMPTZ DEFAULT now(),
  email TEXT NOT NULL,
  token TEXT NOT NULL
);