import mongoose, { Document, Schema, model } from 'mongoose'

export interface ActivityDoc extends Document {
  user: mongoose.Types.ObjectId
  type: string
  duration: number
  calories: number
  date: Date
  notes?: string
}

const activitySchema = new Schema<ActivityDoc>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  calories: { type: Number, required: true },
  date: { type: Date, required: true },
  notes: { type: String }
})

const Activity = model<ActivityDoc>('Activity', activitySchema)
export default Activity
