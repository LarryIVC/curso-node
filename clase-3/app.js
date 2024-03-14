const express = require('express')
const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./validate.js')

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:1234',
  'https://movies.com',
  'https://my-app.com'
]
const app = express()
app.disable('x-powered-by')
const PORT = process.env.PORT || 1234

app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Hola mundo</h1>')
})
// all movies
app.get('/movies', (req, res) => {
  // res.header('Access-Control-Allow-Origin', '*')
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin)
  }

  // by genre
  const { genre } = req.query
  if (genre) {
    const moviesByGenre = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(moviesByGenre)
  }
  res.json(movies)
})

// single movie
app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' })
  }
  res.json(movie)
})

// create a movie
app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)
  console.log(result)
  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  // const {
  //   title,
  //   year,
  //   director,
  //   duration,
  //   genre,
  //   rate,
  //   poster
  // } = req.body

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
    // title,
    // year,
    // director,
    // duration,
    // genre,
    // rate: rate || 0,
    // poster
  }

  movies.push(newMovie)
  res.status(201).json(newMovie)
})

// update a movie
app.patch('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)
  if (movieIndex === -1) {
    return res.status(404).json({ error: 'Movie not found' })
  }

  const result = validatePartialMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const updatedMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updatedMovie
  res.json(updatedMovie)
})

// search all movies by genre
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
