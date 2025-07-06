import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); 
    const signal = controller.signal;        
    async function fetchData() {
      try {
        const response = await fetch(url, { signal }); 
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (err) {
        if (err.name !== 'AbortError') { 
          setError(err);
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
