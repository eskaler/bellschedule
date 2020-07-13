-- sqlite

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Bells;
DROP TABLE IF EXISTS Days;
DROP TABLE IF EXISTS SpecialDays;
DROP TABLE IF EXISTS Profiles;

CREATE TABLE Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  login TEXT,
  password TEXT
);
CREATE TABLE Profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT
);
CREATE TABLE Bells (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  profileId INTEGER REFERENCES Profiles(id) ON DELETE CASCADE,
  ringsAt TIME
);
CREATE TABLE Days (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  weekday INTEGER,
  profileId INTEGER REFERENCES Profiles(id)
);

INSERT INTO Users (login, password) VALUES ('admin', 'admin');
INSERT INTO Profiles (name) VALUES 
  ('Будни1'), ('Будни2');
INSERT INTO Bells (profileId, ringsAt) VALUES 
  (1, '10:00'), (1, '12:00'),
  (2, '13:00'), (2, '15:00');
