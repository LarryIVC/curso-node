import { validateMovie, validatePartialMovie } from '../validate.js'

export class MovieController {
  constructor ({ MovieModel }) {
    this.MovieModel = MovieModel
  }

  getAll = async (req, res) => {
    const { genre } = req.query
    const movies = await this.MovieModel.getAll({ genre })
    res.json(movies)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const movie = await this.MovieModel.getById({ id })
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' })
    }
    res.json(movie)
  }

  create = async (req, res) => {
    const result = validateMovie(req.body)
    // console.log(result)
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = await this.MovieModel.create({ input: result.data })
    if (!newMovie) {
      return res.status(400).json({ error: 'Movie not created' })
    }
    res.status(201).json(newMovie)
  }

  update = async (req, res) => {
    const { id } = req.params
    const result = validatePartialMovie(req.body)

    const updatedMovie = await this.MovieModel.update({
      id,
      input: result.data
    })

    if (!updatedMovie) {
      return res.status(400).json({ error: 'Movie not found' })
    }
    res.json(updatedMovie)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const response = await this.MovieModel.delete({ id })

    if (!response) {
      return res.status(404).json({ error: 'Movie not found' })
    }
    res.status(204)
    return res.json({ message: 'Movie deleted' })
  }
}
