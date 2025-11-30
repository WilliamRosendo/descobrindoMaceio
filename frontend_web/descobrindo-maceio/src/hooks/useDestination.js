import { useState, useEffect } from 'react';
import { getDestinations } from '../services/destination.service';

export const useDestinations = () => {
  const [destinations, setDestinations] = useState({
    praias: [],
    cultura: [],
    lazer: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const data = await getDestinations();
        setDestinations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return { destinations, loading, error };
};