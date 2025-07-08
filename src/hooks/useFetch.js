import { useState, useEffect } from 'react';

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelado = false;

    const fetchData = async () => {
      try {
        setCargando(true);
        const res = await fetch(url);
        if (!res.ok) throw new Error('Error al obtener los datos');
        const json = await res.json();
        if (!cancelado) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (!cancelado) {
          setError(err.message);
          setData(null);
        }
      } finally {
        if (!cancelado) setCargando(false);
      }
    };

    fetchData();

    return () => {
      cancelado = true;
    };
  }, [url]);

  return { data, cargando, error };
}
