import express, { json } from 'express'
import { movieRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

const PORT = process.env.PORT || 1234

const app = express()
app.disable('x-powered-by')
app.use(json())
app.use(corsMiddleware())

app.get('/', (req, res) => {
  res.send('<h1>Hola mundo</h1>')
})

app.use('/movies', movieRouter)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en  http://localhost:${PORT}`)
})
