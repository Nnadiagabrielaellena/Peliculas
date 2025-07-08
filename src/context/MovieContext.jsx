// src/context/MovieContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axios';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [populares, setPopulares] = useState([]);
  const [mejoresPuntuadas, setMejoresPuntuadas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [sessionId, setSessionId] = useState(null);  // Aquí almacenamos el ID de sesión del usuario
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularesRes = await axios.get('movie/popular');
        const mejoresRes = await axios.get('movie/top_rated');
        setPopulares(popularesRes.data.results);
        setMejoresPuntuadas(mejoresRes.data.results);
        setCargando(false);
      } catch (error) {
        setError('Error al cargar películas.');
      }
    };

    fetchMovies();
  }, []);

  // Función para crear un token de solicitud
  const obtenerToken = async () => {
    const response = await axios.post('authentication/token/new');
    return response.data.request_token;
  };

  // Función para redirigir a la página de autenticación de TMDb
  const redirigirAutenticacion = (requestToken) => {
    window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://www.tusitio.com/callback`;
  };

  // Función para crear una sesión una vez el usuario ha autorizado el token
  const crearSesion = async (requestToken) => {
    const response = await axios.post('authentication/session/new', {
      request_token: requestToken,
    });
    setSessionId(response.data.session_id);  // Guarda el session ID
  };

  return (
    <MovieContext.Provider value={{
      populares, 
      mejoresPuntuadas, 
      cargando, 
      sessionId, 
      error,
      obtenerToken,
      redirigirAutenticacion,
      crearSesion
    }}>
      {children}
    </MovieContext.Provider>
  );
};

// Hook para consumir el contexto
export const useMovies = () => useContext(MovieContext);


