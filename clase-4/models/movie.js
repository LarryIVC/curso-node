import { readJSON } from '../utils.js'

const movies = readJSON('./models/movies.json')

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      return movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }
    return movies
  }

  static async getById ({ id }) {
    const movie = movies.find(movie => movie.id === id)
    return movie
  }

  static async create ({ input }) {
    const newMovie = {
      id: crypto.randomUUID(),
      ...input
    }
    movies.push(newMovie)
    return newMovie
  }

  static async update ({ id, input }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) {
      return false
    }

    const updatedMovie = {
      ...movies[movieIndex],
      ...input
    }
    movies[movieIndex] = updatedMovie
    return updatedMovie
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) {
      return false
    }
    movies.splice(movieIndex, 1)
    return true
  }
}
