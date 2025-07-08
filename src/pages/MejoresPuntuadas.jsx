// src/pages/MejoresPuntuadas.jsx
import React, { useEffect, useState } from 'react';
import { Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from '../api/axios'; // tu configuración base de axios

export default function MejoresPuntuadas() {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        const res = await axios.get('/movie/top_rated?language=es-ES&page=1');
        setPeliculas(res.data.results);
      } catch (error) {
        console.error('Error al cargar las mejores puntuadas:', error);
      }
    };
    fetchPeliculas();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom sx={{ mt: 4, textAlign: 'center' }}>
        ⭐ Mejores Puntuadas
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {peliculas.map((peli) => (
          <Grid item xs={12} sm={6} md={3} key={peli.id}>
            <Link to={`/pelicula/${peli.id}`} style={{ textDecoration: 'none' }}>
              <Card>
                <CardMedia
                  component="img"
                  height="350"
                  image={`https://image.tmdb.org/t/p/w500${peli.poster_path}`}
                  alt={peli.title}
                />
                <CardContent>
                  <Typography variant="body1" align="center">
                    {peli.title}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
