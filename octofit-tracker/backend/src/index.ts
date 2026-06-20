import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = process.env.PORT ? Number(process.env.PORT) : 8000
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit'

app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.get('/', (_req, res) => {
  res.json({ message: 'Welcome to OctoFit Tracker backend' })
})

mongoose.set('strictQuery', true)

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(port, '0.0.0.0', () => {
      console.log(`Backend running on http://0.0.0.0:${port}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  })
