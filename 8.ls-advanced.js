const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors')

const folder = process.argv[2] ?? '.'

const ls = async (folder) => {
  let files
  try {
    // Obtener la ruta absoluta
    const rutaAbsoluta = path.resolve(folder)
    console.log(pc.bgBlue('Leyendo el directorio: '), pc.bgBlue(rutaAbsoluta))
    files = await fs.readdir(folder)
  } catch (error) {
    console.error(pc.red('❌ No se pudo leer el directorio: '), folder)
    process.exit(1)
  }

  const filesPromises = files.map(async (file) => {
    const filePath = path.join(folder, file)
    let stats
    try {
      stats = await fs.stat(filePath) // información del archivo
    } catch (error) {
      console.error(pc.red('❌ No se pudo leer el archivo: '), file)
      process.exit(1)
    }
    const isDirectory = stats.isDirectory()
    const symbol = isDirectory ? 'd' : 'f'
    const fileSize = stats.size.toString()
    const fileModified = stats.mtime.toLocaleDateString().slice(0, 10)
    return `${pc.blue(file.padEnd(50))} ${pc.bgMagenta(symbol)} ${pc.green(fileSize.padStart(10))} ${pc.cyan(fileModified)}`
  })

  const FilesInfo = await Promise.all(filesPromises)
  const title = pc.bgGreen('Nombre'.padEnd(50)) + pc.bgGreen('Tipo'.padStart(4)) + pc.bgGreen('Tamaño '.padStart(10)) + pc.bgGreen('Modificado'.padEnd(8))
  console.log(title)
  FilesInfo.forEach(file => {
    console.log(file)
  })
}

ls(folder)
