const http = require('node:http')

const port = process.env.PORT || 3000
const server = http.createServer((req, res) => {
  console.log('REQUEST RECEIVED', req.url)
  res.end('Hola mundo cruel')
})

server.listen(port, () => {
  console.log(`Server listening on port http://localhost:${server.address().port}`)
})
