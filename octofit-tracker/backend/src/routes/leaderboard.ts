import { Router } from 'express'
import LeaderboardEntry from '../models/leaderboard'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const leaderboard = await LeaderboardEntry.find().populate('team').lean()
    res.json({ leaderboard })
  } catch (error) {
    res.status(500).json({ error: 'Failed to load leaderboard' })
  }
})

export default router
