import { Router } from 'express'
import Workout from '../models/workout'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const workouts = await Workout.find().populate('coach').lean()
    res.json({ workouts })
  } catch (error) {
    res.status(500).json({ error: 'Failed to load workouts' })
  }
})

router.post('/', async (req, res) => {
  try {
    const workout = await Workout.create(req.body)
    res.status(201).json({ workout })
  } catch (error) {
    res.status(400).json({ error: 'Failed to create workout' })
  }
})

export default router
