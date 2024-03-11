const fs = require('node:fs/promises')

async function init () {
  console.log('Leyendo el primer archivo...\n')

  // const text = fs.readFileSync('./archivo.txt', 'utf-8')
  const data = await fs.readFile('./archivo.txt', 'utf-8')

  console.log('Primer texto: ', data, '\n')

  // console.log(text)

  console.log('Hacer cosas mientras lee el archivo...\n')

  console.log('Leyendo el segundo archivo...\n')

  // const text2 = fs.readFileSync('./archivo2.txt', 'utf-8')
  const secondData = await fs.readFile('./archivo2.txt', 'utf-8')

  console.log('Segundo texto:', secondData, '\n')
}

init()

// IIFE (Immediately Invoked Function Expression)
// ; (
//   async () => {
//     console.log('Leyendo el primer archivo...\n')

//     // const text = fs.readFileSync('./archivo.txt', 'utf-8')
//     const data = await fs.readFile('./archivo.txt', 'utf-8')

//     console.log('Primer texto: ', data, '\n')

//     // console.log(text)

//     console.log('Hacer cosas mientras lee el archivo...\n')

//     console.log('Leyendo el segundo archivo...\n')

//     // const text2 = fs.readFileSync('./archivo2.txt', 'utf-8')
//     const secondData = await fs.readFile('./archivo2.txt', 'utf-8')

//     console.log('Segundo texto:', secondData, '\n')

//   }
// )

// console.log(text2)
