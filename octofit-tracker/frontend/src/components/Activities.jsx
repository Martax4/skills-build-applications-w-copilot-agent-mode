import { useEffect, useState } from 'react';
import { getApiUrl, normalizeCollectionResponse } from '../api.js';

// Expected Codespaces URL shape: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadActivities = async () => {
      try {
        const response = await fetch(getApiUrl('activities'));
        if (!response.ok) {
          throw new Error('Unable to load activities.');
        }

        const payload = await response.json();
        if (isMounted) {
          setActivities(normalizeCollectionResponse(payload));
          setError('');
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load activities.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadActivities();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 card-title">Activities</h2>
        <p className="text-muted">Review recent fitness activity results.</p>

        {loading && (
          <div className="d-flex align-items-center gap-2 text-muted">
            <div className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
            <span>Loading activities…</span>
          </div>
        )}

        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th scope="col">User</th>
                  <th scope="col">Type</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Calories</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity._id || `${activity.userId}-${activity.date}`}>
                    <td>{activity.userId || '—'}</td>
                    <td>{activity.type || '—'}</td>
                    <td>{activity.durationMinutes ?? '—'} min</td>
                    <td>{activity.calories ?? '—'}</td>
                    <td>{activity.date ? new Date(activity.date).toLocaleDateString() : '—'}</td>
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

export default Activities;
