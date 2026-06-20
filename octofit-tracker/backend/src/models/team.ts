import mongoose, { Document, Schema, model } from 'mongoose'

export interface TeamDoc extends Document {
  name: string
  description: string
  members: mongoose.Types.ObjectId[]
  score: number
  createdAt: Date
}

const teamSchema = new Schema<TeamDoc>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  score: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
})

const Team = model<TeamDoc>('Team', teamSchema)
export default Team
