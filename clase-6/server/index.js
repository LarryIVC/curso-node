import express from 'express'
import morgan from 'morgan'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import dotenv from 'dotenv'
import { createClient } from '@libsql/client'

dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()
const server = createServer(app)

const db = createClient({
  url: process.env.DB_URL,
  authToken: process.env.DB_TOKEN
})

// await db.execute('DROP TABLE IF EXISTS messages')

await db.execute(`CREATE TABLE IF NOT EXISTS messages (
                  id INTEGER PRIMARY KEY AUTOINCREMENT, 
                  content TEXT)`)

const io = new Server(server, {
  connectionStateRecovery: {
    maxDisconnectionDuration: 1000
  }
})

io.on('connection', (socket) => {
  console.log('User connected')
  socket.on('disconnect', () => {
    console.log('User disconnected')
  })

  socket.on('Chat message', async (msg) => {
    let result
    try {
      result = await db.execute({
        sql: 'INSERT INTO messages (content) VALUES (:message)',
        args: { message: msg }
      })
    } catch (error) {
      console.error(error)
      return
    }

    io.emit('Chat message', msg, result.lastInsertRowid.toString())
  })
})

app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(PORT, () => {
  console.log(`Server listening  http://localhost:${PORT}`)
})
