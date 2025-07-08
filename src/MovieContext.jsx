import { createContext, useContext, useState, useEffect } from 'react';

const MovieContext = createContext();

const API_KEY = '7c7eaf93f4bdd728a68f7a22f2138a1a'; // Reemplazalo por tu clave real
const BASE_URL = 'https://api.themoviedb.org/3';

export function MovieProvider({ children }) {
  const [populares, setPopulares] = useState([]);
  const [mejoresPuntuadas, setMejoresPuntuadas] = useState([]);
  const [ultimosLanzamientos, setUltimosLanzamientos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setCargando(true);
      setError(null);  // Reset error state before each request
      try {
        const [pop, top, latest] = await Promise.all([
          fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`).then(res => res.json()),
          fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=es-ES&page=1`).then(res => res.json()),
          fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=1`).then(res => res.json()),
        ]);

        // Verificar que los resultados no estén vacíos
        if (pop.results && top.results && latest.results) {
          setPopulares(pop.results);
          setMejoresPuntuadas(top.results);
          setUltimosLanzamientos(latest.results);
        } else {
          throw new Error("Datos de la API incompletos");
        }
      } catch (error) {
        console.error('Error al cargar películas:', error);
        setError('Hubo un problema al cargar las películas. Intenta de nuevo más tarde.');
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, []);

  return (
    <MovieContext.Provider value={{ populares, mejoresPuntuadas, ultimosLanzamientos, cargando, error }}>
      {children}
    </MovieContext.Provider>
  );
}

// Custom hook para usar fácilmente el contexto
export function useMovies() {
  return useContext(MovieContext);
}
