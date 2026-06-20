import { Routes, Route, Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container py-5">
      <h1>OctoFit Tracker</h1>
      <p>Modern multi-tier app scaffold with React + Vite.</p>
      <Link to="/dashboard" className="btn btn-primary">Go to dashboard</Link>
    </div>
  )
}

function Dashboard() {
  return (
    <div className="container py-5">
      <h1>Dashboard</h1>
      <p>Track workouts, teams, and performance.</p>
      <Link to="/" className="btn btn-secondary">Back home</Link>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}
