const fs = require('node:fs/promises');
const path = require('node:path');


const folder = process.argv[2] ?? '.'

const ls = async (folder) => {
  let files
  try {
    console.log("Leyendo el directorio: ", folder)
    files = await fs.readdir(folder)
  } catch (error) {

    console.error("No se pudo leer el directorio: ", folder)
    process.exit(1)
  }

  const filesPromises = files.map(async (file) => {
    const filePath = path.join(folder, file)
    let stats
    try {
      stats = await fs.stat(filePath) // información del archivo
    } catch (error) {
      console.error("No se pudo leer el archivo: ", file)
      process.exit(1)
    }
    const isDirectory = stats.isDirectory()
    const symbol = isDirectory ? 'd' : 'f'
    const fileSize = stats.size.toString()
    const fileModified = stats.mtime.toLocaleDateString().slice(0, 10)
    return `${file.padEnd(50)} ${symbol} ${fileSize.padStart(10)} ${fileModified} `
  })

  const FilesInfo = await Promise.all(filesPromises)
  console.log("Nombre".padEnd(48), "Tipo".padStart(4), "Tamaño".padStart(9), "Modificado".padStart(10))
  FilesInfo.forEach(file => {
    console.log(file)
  })
}

ls(folder)
