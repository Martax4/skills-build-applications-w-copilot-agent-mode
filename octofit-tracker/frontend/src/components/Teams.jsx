import { useEffect, useState } from 'react';
import { getApiUrl, normalizeCollectionResponse } from '../api.js';

// Expected Codespaces URL shape: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadTeams = async () => {
      try {
        const response = await fetch(getApiUrl('teams'));
        if (!response.ok) {
          throw new Error('Unable to load teams.');
        }

        const payload = await response.json();
        if (isMounted) {
          setTeams(normalizeCollectionResponse(payload));
          setError('');
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load teams.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadTeams();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 card-title">Teams</h2>
        <p className="text-muted">Explore groups and their member lists.</p>

        {loading && (
          <div className="d-flex align-items-center gap-2 text-muted">
            <div className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
            <span>Loading teams…</span>
          </div>
        )}

        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="row row-cols-1 row-cols-md-2 g-3">
            {teams.map((team) => (
              <div className="col" key={team._id || team.name}>
                <div className="border rounded p-3 h-100">
                  <h3 className="h6 mb-2">{team.name || 'Unnamed team'}</h3>
                  <p className="text-muted mb-2">Sport: {team.sport || '—'}</p>
                  <p className="mb-0">Members: {Array.isArray(team.members) ? team.members.join(', ') : '—'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;
