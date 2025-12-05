import { useState, useEffect } from 'react';
import { getLocais } from '../services/destination.service';

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

        const data = await getLocais();

        const praias = data.filter(item => item.categoria === "praias");
        const cultura = data.filter(item => item.categoria === "cultura" || item.categoria === "culturais");
        const lazer = data.filter(item => item.categoria === "lazer");

        setDestinations({ praias, cultura, lazer });

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
