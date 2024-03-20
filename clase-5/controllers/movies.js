import { MovieModel } from '../models/mysql/movie.js'
import { validateMovie, validatePartialMovie } from '../validate.js'

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    res.json(movies)
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' })
    }
    res.json(movie)
  }

  static async create (req, res) {
    const result = validateMovie(req.body)
    // console.log(result)
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = await MovieModel.create({ input: result.data })
    if (!newMovie) {
      return res.status(400).json({ error: 'Movie not created' })
    }
    res.status(201).json(newMovie)
  }

  static async update (req, res) {
    const { id } = req.params
    const result = validatePartialMovie(req.body)

    const updatedMovie = await MovieModel.update({ id, input: result.data })

    if (!updatedMovie) {
      return res.status(400).json({ error: 'Movie not found' })
    }
    res.json(updatedMovie)
  }

  static async delete (req, res) {
    const { id } = req.params

    const response = await MovieModel.delete({ id })

    if (!response) {
      return res.status(404).json({ error: 'Movie not found' })
    }
    res.status(204)
    return res.json({ message: 'Movie deleted' })
  }
}
