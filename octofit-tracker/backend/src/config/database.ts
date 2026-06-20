import mongoose from 'mongoose'

export const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'

mongoose.set('strictQuery', true)

export function connectDb() {
  return mongoose.connect(mongoUri)
}
