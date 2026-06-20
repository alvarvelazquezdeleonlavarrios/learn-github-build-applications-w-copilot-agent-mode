import { useState, useEffect } from 'react'

interface Activity {
  _id: string
  user: { _id: string; name: string }
  type: string
  duration: number
  calories: number
  date: string
  notes?: string
}

const Activities = () => {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME
        const apiUrl = codespaceName
          ? `https://${codespaceName}-8000.app.github.dev/api/activities`
          : 'http://localhost:8000/api/activities'

        const response = await fetch(apiUrl)
        if (!response.ok) throw new Error('Failed to fetch activities')
        const data = await response.json()
        setActivities(data.activities || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  if (loading) return <div className="alert alert-info">Loading activities...</div>
  if (error) return <div className="alert alert-danger">Error: {error}</div>

  return (
    <div className="container py-5">
      <h2>Activities</h2>
      {activities.length === 0 ? (
        <p className="text-muted">No activities found</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Duration (min)</th>
              <th>Calories</th>
              <th>Date</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id}>
                <td>{activity.user?.name || 'Unknown'}</td>
                <td>{activity.type}</td>
                <td>{activity.duration}</td>
                <td>{activity.calories}</td>
                <td>{new Date(activity.date).toLocaleDateString()}</td>
                <td>{activity.notes || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Activities
