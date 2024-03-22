import express, { json } from 'express'
import { CretaeMovieRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'
// import { MovieModel } from './models/mysql/movie.js'

export const CreateApp = ({ MovieModel }) => {
  const PORT = process.env.PORT || 1234

  const app = express()
  app.disable('x-powered-by')
  app.use(json())
  app.use(corsMiddleware())

  app.get('/', (req, res) => {
    res.send('<h1>Hola mundo</h1>')
  })

  app.use('/api/v1/movies', CretaeMovieRouter({ MovieModel }))

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en  http://localhost:${PORT}`)
  })
}
