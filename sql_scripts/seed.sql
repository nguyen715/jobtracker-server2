TRUNCATE users RESTART IDENTITY CASCADE;
TRUNCATE POSTS RESTART IDENTITY CASCADE;

INSERT INTO users (username, password) VALUES
  ('user1', 'pass1'),
  ('user2', 'pass2')
;

INSERT INTO posts (title, url, location, notes, rating, user_id) VALUES
  ('Interesting job', 'https://www.indeed.com/job123', 'remote', 'This looks like a good job!', 8, 1),
  ('Job number 2', 'https://www.craigslist.com/reallylegitjob', 'Antarctica', 'Not sure about this one', 3, 1)
;
