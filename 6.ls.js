// const fs = require('node:fs');

// fs.readdir('./', (err, files) => {
//   if (err) {
//     console.log("No se pudo leer el directorio", err)
//     return
//   } 
  
//   // console.log(files)
//   files.forEach(file => {
//     console.log(file)
//   })
  
// })

const fs = require('node:fs/promises');

fs.readdir('./').then((files) => {
  files.forEach(file => {
    console.log(file)
  })
}).catch((err) => {
  console.error("No se pudo leer el directorio", err)
}).finally(() => {
  console.log("Proceso terminado")
} )