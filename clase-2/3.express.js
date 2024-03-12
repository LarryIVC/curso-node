const express = require('express')
const app = express()

app.disable('x-powered-by')
const port = process.env.PORT || 1234

// este es en ves del midleware de express
app.use(express.json())

// Asi es usando el midleware de express
// app.use((req, res, next) => {
//   if (req.method !== 'POST') next()
//   if (req.headers['content-type'] !== 'application/json') next()

//   let body = ''
//   req.on('data', (chunk) => {
//     body += chunk
//   })
//   req.on('end', () => {
//     const data = JSON.parse(body)
//     data.timestamp = new Date().toISOString()
//     req.body = data
//     next()
//   })
// })

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/vsconfig', (req, res) => {
  req.body.timestamp = new Date().toISOString()
  res.status(201).json(req.body)
})

app.use((req, res) => {
  res.status(404).send('Not found')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
