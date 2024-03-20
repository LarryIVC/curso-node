import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  password: 'Seguridad123*',
  database: 'moviesdb',
  port: '3306'
}

const pool = mysql.createPool(config)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowerGenre = genre.toLowerCase()
      try {
        const [rows] = await pool.query(
          `SELECT BIN_TO_UUID(movie.id) AS id, title, year, director, duration, 
          poster, rate, genre.name 
          FROM movie 
          JOIN movie_genres ON movie.id = movie_genres.movie_id 
          JOIN genre ON movie_genres.genre_id = genre.id 
          WHERE LOWER(genre.name) = ?`, [lowerGenre])
        if (rows.length === 0) return []
        return rows
      } catch (error) {
        console.error(error)
        return []
      }
    }

    try {
      const [rows] = await pool.query(
        `SELECT BIN_TO_UUID(id) AS id, title, year, director, duration, poster, rate 
        FROM movie`)
      return rows
    } catch (error) {
      console.error(error)
      return []
    }
  }

  static async getById ({ id }) {
    if (!id) return null
    try {
      const [rows] = await pool.query(
        `SELECT BIN_TO_UUID(id) AS id, title, year, director, duration, poster, rate 
        FROM movie 
        WHERE id = UUID_TO_BIN(?)`, [id])
      return rows[0]
    } catch (error) {
      console.error(error)
      return null
    }
  }

  static async create ({ input }) {
    if (!input) return null
    const {
      genre: genreInput,
      title,
      year,
      director,
      duration,
      poster,
      rate
    } = input
    try {
      const [rows] = await pool.query('SELECT UUID() id')
      // console.log(rows)
      const [{ id }] = rows
      // console.log(id)
      await pool.query('INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?)', [id, title, year, director, duration, poster, rate])
      if (genreInput) {
        // console.log(genreInput)
        genreInput.forEach(async g => {
          const [rowId] = await pool.query('SELECT id genId FROM genre WHERE LOWER(name) = ?', [g.toLowerCase()])
          const [{ genId }] = rowId
          await pool.query('INSERT INTO movie_genres (movie_id, genre_id) VALUES (UUID_TO_BIN(?), ?)', [id, genId])
        })
      }
      const [movie] = await pool.query('SELECT BIN_TO_UUID(id) AS id, title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?)', [id])
      const [genres] = await pool.query(
        `select g.name from genre g 
        join movie_genres mg on g.id = mg.genre_id 
        join movie m on m.id = mg.movie_id 
        WHERE m.id = UUID_TO_BIN(?)`, [id])
      movie[0].genre = genres.map(g => g.name)
      return movie[0]
    } catch (error) {
      console.error('Cant create movie', error)
      return null
    }
  }

  static async update ({ id, input }) {
    
    // const movieIndex = movies.findIndex(movie => movie.id === id)
    // if (movieIndex === -1) {
    //   return false
    // }

    // const updatedMovie = {
    //   ...movies[movieIndex],
    //   ...input
    // }
    // movies[movieIndex] = updatedMovie
    // return updatedMovie
  }

  // static async delete ({ id }) {
  //   const movieIndex = movies.findIndex(movie => movie.id === id)
  //   if (movieIndex === -1) {
  //     return false
  //   }
  //   movies.splice(movieIndex, 1)
  //   return true
  // }
}
