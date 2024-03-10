// argumentos de la línea de comandos

console.log(process.argv)

// controlar el proceso y su salida
// process.exit(0) // 0 es el código de salida para un proceso exitoso
// process.exit(1) // 1 es el código de salida para un proceso con errores


// controlamos eventos del proceso
process.on('beforeExit', () => {
  console.log('El proceso va a terminar')
})

// directorio actual
console.log(process.cwd())