import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'https://movies.com',
  'https://my-app.com'
]

export const corsMiddleware = () => cors({
  origin: (origin, callback) => {
    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
})
