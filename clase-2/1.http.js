const http = require('node:http')
const fs = require('node:fs')

const port = process.env.PORT || 3000

const processRequest = (req, res) => {
  console.log('REQUEST RECEIVED', req.url)
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  if (req.url === '/') {
    res.stausCode = 200
    res.end('Bienvenido a mi página de inicio')
  } else if (req.url === '/imagen.png') {
    fs.readFile('./favicon.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('Internal Server Error')
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.statusCode = 200
        res.end(data)
      }
    })
  } else if (req.url === '/contact') {
    res.stausCode = 200
    res.end('Bienvenido a mi página de contacto')
  } else {
    res.statusCode = 404
    res.end('<h1>Página no encontrada</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(port, () => {
  console.log(`Server listening on port http://localhost:${server.address().port}`)
})
