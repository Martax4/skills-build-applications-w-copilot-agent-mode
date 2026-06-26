import { Link, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import './App.css';

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4 border-bottom pb-3">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
          <div>
            <h1 className="h3 mb-1">Octofit Tracker</h1>
            <p className="text-muted mb-0">
              A React 19 presentation tier for the multi-tier fitness application.
            </p>
          </div>
          <div className="text-muted small">
            VITE_CODESPACE_NAME must be defined in <code>.env.local</code> for GitHub Codespaces URLs.
          </div>
        </div>
      </header>

      <nav className="nav nav-pills flex-wrap mb-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            end={item.to === '/'}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="h4 card-title">Welcome to Octofit Tracker</h2>
                <p className="text-muted mb-3">
                  Explore the application data through the routed React experience.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  {navItems
                    .filter((item) => item.to !== '/')
                    .map((item) => (
                      <Link key={item.to} className="btn btn-outline-primary" to={item.to}>
                        {item.label}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
