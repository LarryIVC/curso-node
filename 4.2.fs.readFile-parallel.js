const fs = require('node:fs/promises')

Promise.all([
  fs.readFile('./archivo.txt', 'utf-8'),
  fs.readFile('./archivo2.txt', 'utf-8')
])
  .then(([data, secondData]) => {
    console.log('Primer texto: ', data, '\n')
    console.log('Segundo texto:', secondData, '\n')
  })

