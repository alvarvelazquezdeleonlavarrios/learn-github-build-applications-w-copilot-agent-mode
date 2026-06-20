import { useState, useEffect } from 'react'

interface Team {
  _id: string
  name: string
  description: string
  score: number
  members: Array<{ _id: string; name: string }>
  createdAt: string
}

const Teams = () => {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME
        const apiUrl = codespaceName
          ? `https://${codespaceName}-8000.app.github.dev/api/teams`
          : 'http://localhost:8000/api/teams'

        const response = await fetch(apiUrl)
        if (!response.ok) throw new Error('Failed to fetch teams')
        const data = await response.json()
        setTeams(data.teams || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  if (loading) return <div className="alert alert-info">Loading teams...</div>
  if (error) return <div className="alert alert-danger">Error: {error}</div>

  return (
    <div className="container py-5">
      <h2>Teams</h2>
      {teams.length === 0 ? (
        <p className="text-muted">No teams found</p>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team._id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">{team.description}</p>
                  <p className="card-text">
                    <small className="text-muted">Score: {team.score}</small>
                  </p>
                  <p className="card-text">
                    <small>Members: {team.members?.length || 0}</small>
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

export default Teams
