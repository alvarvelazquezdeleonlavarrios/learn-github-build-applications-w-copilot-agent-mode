import { Router } from 'express'
import Team from '../models/team'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const teams = await Team.find().populate('members').lean()
    res.json({ teams })
  } catch (error) {
    res.status(500).json({ error: 'Failed to load teams' })
  }
})

router.post('/', async (req, res) => {
  try {
    const team = await Team.create(req.body)
    res.status(201).json({ team })
  } catch (error) {
    res.status(400).json({ error: 'Failed to create team' })
  }
})

export default router
