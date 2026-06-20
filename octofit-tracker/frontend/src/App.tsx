import { Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import Teams from './components/Teams'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Workouts from './components/Workouts'

function Home() {
  return (
    <div className="container py-5">
      <h1>OctoFit Tracker</h1>
      <p className="lead">Modern multi-tier app with React, Express, and MongoDB.</p>
      <div className="mt-4">
        <Link to="/users" className="btn btn-primary me-2">
          Users
        </Link>
        <Link to="/teams" className="btn btn-primary me-2">
          Teams
        </Link>
        <Link to="/activities" className="btn btn-primary me-2">
          Activities
        </Link>
        <Link to="/leaderboard" className="btn btn-primary me-2">
          Leaderboard
        </Link>
        <Link to="/workouts" className="btn btn-primary me-2">
          Workouts
        </Link>
      </div>
    </div>
  )
}

function Nav() {
  return (
    <nav className="navbar navbar-dark bg-dark mb-4">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">
          🐙 OctoFit
        </Link>
        <div className="d-flex gap-3">
          <Link to="/users" className="nav-link">
            Users
          </Link>
          <Link to="/teams" className="nav-link">
            Teams
          </Link>
          <Link to="/activities" className="nav-link">
            Activities
          </Link>
          <Link to="/leaderboard" className="nav-link">
            Leaderboard
          </Link>
          <Link to="/workouts" className="nav-link">
            Workouts
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </>
  )
}
