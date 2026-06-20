import mongoose, { Document, Schema, model } from 'mongoose'

export interface WorkoutDoc extends Document {
  title: string
  description: string
  durationMinutes: number
  difficulty: 'easy' | 'medium' | 'hard'
  scheduledAt: Date
  coach: mongoose.Types.ObjectId
}

const workoutSchema = new Schema<WorkoutDoc>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true, enum: ['easy', 'medium', 'hard'] },
  scheduledAt: { type: Date, required: true },
  coach: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

const Workout = model<WorkoutDoc>('Workout', workoutSchema)
export default Workout
