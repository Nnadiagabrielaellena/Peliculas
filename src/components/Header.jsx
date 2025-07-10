// src/components/Header.jsx
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  IconButton,
  Badge
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useMovies } from '../context/MovieContext'; // Importamos el hook para acceder a los favoritos

const API_KEY = '7c7eaf93f4bdd728a68f7a22f2138a1a'; // Usá tu clave real

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const { favoritos } = useMovies(); // Obtenemos los favoritos desde el contexto

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=es-ES&query=${encodeURIComponent(
            searchTerm
          )}`
        );
        const data = await res.json();

        if (data.results && data.results.length > 0) {
          const firstMatch = data.results[0];
          navigate(`/pelicula/${firstMatch.id}`);
        } else {
          alert('No se encontró ninguna película con ese nombre');
        }
      } catch (error) {
        console.error('Error al buscar película:', error);
      }
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundImage: 'url(/path/to/your/image.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px 0',
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>
          MovieApp
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/populares">Populares</Button>
        <Button color="inherit" component={Link} to="/mejores-puntuadas">Mejor Puntuadas</Button>

        {/* Botón de Mis Favoritos con el contador */}
        <Button color="inherit" component={Link} to="/favoritos" sx={{ display: 'flex', alignItems: 'center' }}>
          <Badge
            badgeContent={favoritos.length}
            color="error"
            sx={{ marginRight: 1 }}
          >
            <FavoriteIcon />
          </Badge>
          Mis Favoritos
        </Button>

        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            value={searchTerm}
            onChange={handleSearchChange}
            label=""
            variant="outlined"
            size="small"
            sx={{ backgroundColor: 'white', borderRadius: '4px', ml: 2 }}
          />
          <IconButton type="submit" sx={{ color: 'white' }}>
            <SearchIcon />
          </IconButton>
        </form>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

