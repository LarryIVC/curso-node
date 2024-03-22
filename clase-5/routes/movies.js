import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'
// import { MovieModel } from '../models/mysql/movie.js'

export const CretaeMovieRouter = ({ MovieModel }) => {
  const movieRouter = Router()
  const movieController = new MovieController({ MovieModel })

  movieRouter.get('/', movieController.getAll)

  movieRouter.get('/:id', movieController.getById)

  movieRouter.post('/', movieController.create)

  movieRouter.patch('/:id', movieController.update)

  movieRouter.delete('/:id', movieController.delete)

  return movieRouter
}
