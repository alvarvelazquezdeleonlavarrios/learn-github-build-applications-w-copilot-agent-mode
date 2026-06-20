import { useState, useEffect } from 'react'

interface User {
  _id: string
  name: string
  email: string
  role: string
  joinedAt: string
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME
        const apiUrl = codespaceName
          ? `https://${codespaceName}-8000.app.github.dev/api/users`
          : 'http://localhost:8000/api/users'

        const response = await fetch(apiUrl)
        if (!response.ok) throw new Error('Failed to fetch users')
        const data = await response.json()
        setUsers(data.users || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <div className="alert alert-info">Loading users...</div>
  if (error) return <div className="alert alert-danger">Error: {error}</div>

  return (
    <div className="container py-5">
      <h2>Users</h2>
      {users.length === 0 ? (
        <p className="text-muted">No users found</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{new Date(user.joinedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Users
