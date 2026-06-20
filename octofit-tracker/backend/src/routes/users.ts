import { Router } from 'express'
import User from '../models/user'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const users = await User.find().lean()
    res.json({ users })
  } catch (error) {
    res.status(500).json({ error: 'Failed to load users' })
  }
})

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json({ user })
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' })
  }
})

export default router
