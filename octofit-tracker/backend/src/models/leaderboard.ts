import mongoose, { Document, Schema, model } from 'mongoose'

export interface LeaderboardEntryDoc extends Document {
  rank: number
  team: mongoose.Types.ObjectId
  points: number
  updatedAt: Date
}

const leaderboardEntrySchema = new Schema<LeaderboardEntryDoc>({
  rank: { type: Number, required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  points: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now }
})

const LeaderboardEntry = model<LeaderboardEntryDoc>('LeaderboardEntry', leaderboardEntrySchema)
export default LeaderboardEntry
