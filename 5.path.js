const path = require('node:path')
// barra separadora de directorios
console.log(path.sep)

// unir rutas
const filePath = path.join('content', 'subfolder', 'test.txt')
console.log(filePath)

const base = path.basename('content/subfolder/test.txt')
console.log(base)

const filename = path.basename('content/subfolder/test.txt', '.txt')
console.log(filename)

const extension = path.extname('content.subfolder.test.txt')
console.log(extension)
