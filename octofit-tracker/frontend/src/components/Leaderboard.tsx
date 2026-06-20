import { useState, useEffect } from 'react'

interface LeaderboardEntry {
  _id: string
  rank: number
  team: { _id: string; name: string }
  points: number
  updatedAt: string
}

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME
        const apiUrl = codespaceName
          ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard`
          : 'http://localhost:8000/api/leaderboard'

        const response = await fetch(apiUrl)
        if (!response.ok) throw new Error('Failed to fetch leaderboard')
        const data = await response.json()
        setLeaderboard(data.leaderboard || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  if (loading) return <div className="alert alert-info">Loading leaderboard...</div>
  if (error) return <div className="alert alert-danger">Error: {error}</div>

  return (
    <div className="container py-5">
      <h2>Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <p className="text-muted">No leaderboard entries found</p>
      ) : (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Rank</th>
              <th>Team</th>
              <th>Points</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry) => (
              <tr key={entry._id}>
                <td>
                  <strong>#{entry.rank}</strong>
                </td>
                <td>{entry.team?.name || 'Unknown'}</td>
                <td className="fw-bold">{entry.points}</td>
                <td>{new Date(entry.updatedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Leaderboard
