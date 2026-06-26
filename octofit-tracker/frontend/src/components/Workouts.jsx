import { useEffect, useState } from 'react';
import { getApiUrl, normalizeCollectionResponse } from '../api.js';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadWorkouts = async () => {
      try {
        const response = await fetch(getApiUrl('workouts'));
        if (!response.ok) {
          throw new Error('Unable to load workouts.');
        }

        const payload = await response.json();
        if (isMounted) {
          setWorkouts(normalizeCollectionResponse(payload));
          setError('');
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load workouts.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadWorkouts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 card-title">Workouts</h2>
        <p className="text-muted">Browse workout suggestions and training plans.</p>

        {loading && (
          <div className="d-flex align-items-center gap-2 text-muted">
            <div className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
            <span>Loading workouts…</span>
          </div>
        )}

        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="row row-cols-1 row-cols-md-2 g-3">
            {workouts.map((workout) => (
              <div className="col" key={workout._id || workout.title}>
                <div className="border rounded p-3 h-100">
                  <h3 className="h6 mb-2">{workout.title || 'Untitled workout'}</h3>
                  <p className="text-muted mb-2">Focus: {workout.focus || '—'}</p>
                  <p className="mb-0">{workout.durationMinutes ?? '—'} min • {workout.difficulty || '—'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Workouts;
