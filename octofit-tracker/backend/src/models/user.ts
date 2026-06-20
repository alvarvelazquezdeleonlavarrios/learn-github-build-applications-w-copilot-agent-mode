import mongoose, { Document, Schema, model } from 'mongoose'

export interface UserDoc extends Document {
  name: string
  email: string
  role: string
  team?: mongoose.Types.ObjectId
  joinedAt: Date
}

const userSchema = new Schema<UserDoc>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  role: { type: String, default: 'member' },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  joinedAt: { type: Date, default: Date.now }
})

const User = model<UserDoc>('User', userSchema)
export default User
