const fs = require('node:fs')

console.log('Leyendo el primer archivo...\n')

// const text = fs.readFileSync('./archivo.txt', 'utf-8')
fs.readFile('./archivo.txt', 'utf-8', (err, data) => {
  console.log(data, '\n')
})

// console.log(text)

console.log('Hacer cosas mientras lee el archivo...\n')

console.log('Leyendo el segundo archivo...\n')

// const text2 = fs.readFileSync('./archivo2.txt', 'utf-8')
fs.readFile('./archivo2.txt', 'utf-8', (err, data) => {
  console.log(data, '\n')
})

// console.log(text2)