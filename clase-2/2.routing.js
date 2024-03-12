const http = require('node:http')

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/':{
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.statusCode = 200
          res.end('<h1>Bienvenido a mi página de inicio</h1>')
          break }
        case '/about':{
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.statusCode = 200
          res.end('<h1>Bienvenido a mi página de about</h1>')
          break }
        default: {
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.statusCode = 404
          res.end('<h1>404 Not Found</h1>')
        }
      }
      break
    case 'POST':
      switch (url) {
        case '/': {
          const body = 'responde algo al POST de la página de inicio'
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.statusCode = 200
          res.end(body)
          break
        }
        case '/vsconfig': {
          let body = ''
          req.on('data', chunk => {
            body += chunk
          })

          req.on('end', () => {
            // console.log('body', body)
            const data = JSON.parse(body)
            res.writeHead(201, { 'Content-Type': 'appliation/json; charset=utf-8' })
            data.timestamp = new Date().toISOString()
            res.end(JSON.stringify(data))
          })
          break
        }
      }
      break
    default: {
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.statusCode = 404
      res.end('<h1>404 Not Found</h1>')
    }
  }
}

const server = http.createServer(processRequest)

server.listen(1234, () => {
  console.log('Server listening on  http://localhost:1234')
})
