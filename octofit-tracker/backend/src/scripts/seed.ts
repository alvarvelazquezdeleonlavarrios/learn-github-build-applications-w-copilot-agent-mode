import { connectDb } from '../db'
import Activity from '../models/activity'
import LeaderboardEntry from '../models/leaderboard'
import Team from '../models/team'
import User from '../models/user'
import Workout from '../models/workout'

async function seed() {
  console.log('Seed the octofit_db database with test data')

  await connectDb()

  await Promise.all([
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({})
  ])

  const users = await User.insertMany([
    { name: 'Ava Carter', email: 'ava.carter@example.com', role: 'member' },
    { name: 'Noah Ramirez', email: 'noah.ramirez@example.com', role: 'coach' },
    { name: 'Mia Patel', email: 'mia.patel@example.com', role: 'member' }
  ])

  const teams = await Team.insertMany([
    {
      name: 'Peak Performers',
      description: 'A team focused on daily strength and cardio metrics.',
      members: [users[0]._id, users[2]._id],
      score: 1285
    },
    {
      name: 'Endurance Elite',
      description: 'Long-distance runners and high-volume training.',
      members: [users[1]._id],
      score: 1420
    }
  ])

  const activities = await Activity.insertMany([
    {
      user: users[0]._id,
      type: 'Running',
      duration: 42,
      calories: 520,
      date: new Date(Date.now() - 1000 * 60 * 60 * 4),
      notes: 'Interval training around the lake'
    },
    {
      user: users[2]._id,
      type: 'Yoga',
      duration: 55,
      calories: 210,
      date: new Date(Date.now() - 1000 * 60 * 60 * 24),
      notes: 'Recovery flow session'
    }
  ])

  const workouts = await Workout.insertMany([
    {
      title: 'Full-body strength circuit',
      description: 'A 45-minute circuit focusing on compound lifts and core.',
      durationMinutes: 45,
      difficulty: 'medium',
      scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 10),
      coach: users[1]._id
    },
    {
      title: 'HIIT sprint ladder',
      description: 'High-intensity interval training to build speed and stamina.',
      durationMinutes: 30,
      difficulty: 'hard',
      scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 18),
      coach: users[1]._id
    }
  ])

  const leaderboard = await LeaderboardEntry.insertMany([
    { rank: 1, team: teams[1]._id, points: 1420 },
    { rank: 2, team: teams[0]._id, points: 1285 }
  ])

  console.log('Created users:', users.length)
  console.log('Created teams:', teams.length)
  console.log('Created activities:', activities.length)
  console.log('Created workouts:', workouts.length)
  console.log('Created leaderboard entries:', leaderboard.length)
  console.log('Seed data insertion complete.')
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seed script error:', error)
    process.exit(1)
  })
