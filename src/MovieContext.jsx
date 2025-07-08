import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

const API_KEY = '7c7eaf93f4bdd728a68f7a22f2138a1a'; // Reemplaza con tu clave de API
const BASE_URL = 'https://api.themoviedb.org/3';

export function MovieProvider({ children }) {
  const [populares, setPopulares] = useState([]);
  const [mejoresPuntuadas, setMejoresPuntuadas] = useState([]);
  const [ultimosLanzamientos, setUltimosLanzamientos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null); // Añadimos el estado de error

  useEffect(() => {
    const fetchData = async () => {
      setCargando(true);
      setError(null); // Limpiar el error al iniciar la carga
      try {
        const [pop, top, latest] = await Promise.all([
          fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`).then(res => res.json()),
          fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=es-ES&page=1`).then(res => res.json()),
          fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=1`).then(res => res.json()), // Últimos lanzamientos
        ]);

        setPopulares(pop.results);
        setMejoresPuntuadas(top.results);
        setUltimosLanzamientos(latest.results); // Asignar los últimos lanzamientos
      } catch (error) {
        console.error('Error al cargar las películas:', error);
        setError("Hubo un error al cargar los últimos lanzamientos.");
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

export function useMovies() {
  return useContext(MovieContext);
}

