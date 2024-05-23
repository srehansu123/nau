import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    fetchData();

    // Cleanup function
    return () => {
      // You can add cleanup code here if needed
    };
  }, [url]); // Re-run effect whenever the URL changes

  return { data, loading, error };
};

export default useFetchData;
