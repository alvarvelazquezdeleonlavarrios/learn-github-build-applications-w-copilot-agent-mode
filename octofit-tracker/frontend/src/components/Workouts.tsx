import { useState, useEffect } from 'react'

interface Workout {
  _id: string
  title: string
  description: string
  durationMinutes: number
  difficulty: 'easy' | 'medium' | 'hard'
  scheduledAt: string
  coach: { _id: string; name: string }
}

const Workouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME
        const apiUrl = codespaceName
          ? `https://${codespaceName}-8000.app.github.dev/api/workouts`
          : 'http://localhost:8000/api/workouts'

        const response = await fetch(apiUrl)
        if (!response.ok) throw new Error('Failed to fetch workouts')
        const data = await response.json()
        setWorkouts(data.workouts || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchWorkouts()
  }, [])

  const getDifficultyBadge = (difficulty: string) => {
    const colorMap: Record<string, string> = {
      easy: 'badge-success',
      medium: 'badge-warning',
      hard: 'badge-danger'
    }
    return colorMap[difficulty] || 'badge-secondary'
  }

  if (loading) return <div className="alert alert-info">Loading workouts...</div>
  if (error) return <div className="alert alert-danger">Error: {error}</div>

  return (
    <div className="container py-5">
      <h2>Workouts</h2>
      {workouts.length === 0 ? (
        <p className="text-muted">No workouts found</p>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout._id} className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{workout.title}</h5>
                  <p className="card-text">{workout.description}</p>
                  <div className="mb-2">
                    <span className={`badge ${getDifficultyBadge(workout.difficulty)}`}>
                      {workout.difficulty}
                    </span>
                  </div>
                  <p className="card-text">
                    <small>Duration: {workout.durationMinutes} min</small>
                  </p>
                  <p className="card-text">
                    <small>Coach: {workout.coach?.name || 'Unknown'}</small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Scheduled: {new Date(workout.scheduledAt).toLocaleString()}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Workouts
