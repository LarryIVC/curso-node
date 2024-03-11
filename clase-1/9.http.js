const http = require('node:http')
const { findAbailablePort } = require('./10.portAvailable')

const port = process.env.PORT || 3000
const server = http.createServer((req, res) => {
  console.log('REQUEST RECEIVED')
  res.end('Hola mundo cruel')
})

findAbailablePort(port).then((port) => {
  server.listen(port, () => {
    console.log(`Server listening on port http://localhost:${server.address().port}`)
  })
})
