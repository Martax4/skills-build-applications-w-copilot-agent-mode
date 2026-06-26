import { useEffect, useState } from 'react';
import { getApiUrl, normalizeCollectionResponse } from '../api.js';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadEntries = async () => {
      try {
        const response = await fetch(getApiUrl('leaderboard'));
        if (!response.ok) {
          throw new Error('Unable to load leaderboard.');
        }

        const payload = await response.json();
        if (isMounted) {
          setEntries(normalizeCollectionResponse(payload));
          setError('');
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load leaderboard.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadEntries();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 card-title">Leaderboard</h2>
        <p className="text-muted">Track the top performers in the community.</p>

        {loading && (
          <div className="d-flex align-items-center gap-2 text-muted">
            <div className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
            <span>Loading leaderboard…</span>
          </div>
        )}

        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">User</th>
                  <th scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry._id || `${entry.userId}-${entry.rank}`}>
                    <td>{entry.rank ?? '—'}</td>
                    <td>{entry.userId || '—'}</td>
                    <td>{entry.score ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
