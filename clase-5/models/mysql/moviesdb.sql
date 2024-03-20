DROP DATABASE IF EXISTS moviesdb;

CREATE DATABASE IF NOT EXISTS moviesdb DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE moviesdb;

CREATE TABLE IF NOT EXISTS movie (
  id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
  title VARCHAR(255) NOT NULL,
  year INT NOT NULL,
  director VARCHAR(255) NOT NULL,
  duration INT NOT NULL,
  poster TEXT,
  rate DECIMAL(2, 1) NOT NULL
);

CREATE TABLE IF NOT EXISTS genre (
  id int AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE movie_genres (
  movie_id BINARY(16) REFERENCES movie(id),
  genre_id int REFERENCES genre(id),
  PRIMARY KEY (movie_id, genre_id)  
);

INSERT INTO genre (name) VALUES 
('Action'), 
('Adventure'), 
('Animation'), 
('Comedy'), 
('Crime'), 
('Drama'), 
('Fantasy'), 
('Horror'), 
('Mystery'), 
('Romance'), 
('Sci-Fi'), 
('Thriller'), 
('Western');

INSERT INTO movie (title, year, director, duration, poster, rate) VALUES 
('The Shawshank Redemption', 1994, 'Frank Darabont', 142, 'https://www.imdb.com/title/tt0111161/mediaviewer/rm2489068800/', 9.3),
('The Godfather', 1972, 'Francis Ford Coppola', 175, 'https://www.imdb.com/title/tt0068646/mediaviewer/rm2489068800/', 9.2),
('The Dark Knight', 2008, 'Christopher Nolan', 152, 'https://www.imdb.com/title/tt0468569/mediaviewer/rm2489068800/', 9.0),
('The Lord of the Rings: The Return of the King', 2003, 'Peter Jackson', 201, 'https://www.imdb.com/title/tt0167260/mediaviewer/rm2489068800/', 8.9),
('Pulp Fiction', 1994, 'Quentin Tarantino', 154, 'https://www.imdb.com/title/tt0110912/mediaviewer/rm2489068800/', 8.9),
('Forrest Gump', 1994, 'Robert Zemeckis', 142, 'https://www.imdb.com/title/tt0109830/mediaviewer/rm2489068800/', 8.8),
('Inception', 2010, 'Christopher Nolan', 148, 'https://www.imdb.com/title/tt1375666/mediaviewer/rm2489068800/', 8.8),
('The Matrix', 1999, 'Lana Wachowski, Lilly Wachowski', 136, 'https://www.imdb.com/title/tt0133093/mediaviewer/rm2489068800/', 8.7),
('The Silence of the Lambs', 1991, 'Jonathan Demme', 118, 'https://www.imdb.com/title/tt0102926/mediaviewer/rm2489068800/', 8.6);

INSERT INTO movie_genres (movie_id, genre_id) VALUES
((SELECT id FROM movie WHERE title = 'The Shawshank Redemption'), (SELECT id FROM genre WHERE name = 'Drama')),
((SELECT id FROM movie WHERE title = 'The Shawshank Redemption'), (SELECT id FROM genre WHERE name = 'Action')),
((SELECT id FROM movie WHERE title = 'The Godfather'), (SELECT id FROM genre WHERE name = 'Crime')),
((SELECT id FROM movie WHERE title = 'The Dark Knight'), (SELECT id FROM genre WHERE name = 'Action')),
((SELECT id FROM movie WHERE title = 'The Lord of the Rings: The Return of the King'), (SELECT id FROM genre WHERE name = 'Adventure')),
((SELECT id FROM movie WHERE title = 'Pulp Fiction'), (SELECT id FROM genre WHERE name = 'Crime')),
((SELECT id FROM movie WHERE title = 'Forrest Gump'), (SELECT id FROM genre WHERE name = 'Drama')),
((SELECT id FROM movie WHERE title = 'Inception'), (SELECT id FROM genre WHERE name = 'Action')),
((SELECT id FROM movie WHERE title = 'The Matrix'), (SELECT id FROM genre WHERE name = 'Action')),
((SELECT id FROM movie WHERE title = 'The Silence of the Lambs'), (SELECT id FROM genre WHERE name = 'Crime'));

SELECT * FROM movie;

SELECT BIN_TO_UUID(id) AS id, title, year, director, duration, poster, rate FROM movie;

SELECT BIN_TO_UUID(id) AS id, title, year, director, duration, poster, rate FROM movie
join movie_genres on movie.id = movie_genres.movie_id
join genre on movie_genres.genre_id = genre.id
where genre.name = 'Action';

select g.name from genre g 
join movie_genres mg on g.id = mg.genre_id 
join movie m on m.id = mg.movie_id 
WHERE m.id = UUID_TO_BIN('b11097fd-e6d8-11ee-a74c-bc5ff4400066');

```

