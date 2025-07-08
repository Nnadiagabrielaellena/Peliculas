// src/pages/Populares.jsx
import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Card, CardMedia } from '@mui/material';
import axios from '../api/axios';

export default function Populares() {
  const [peliculasPopulares, setPeliculasPopulares] = useState([]);

  useEffect(() => {
    const fetchPopulares = async () => {
      try {
        const response = await axios.get('movie/popular');
        setPeliculasPopulares(response.data.results);
      } catch (error) {
        console.error('Error al cargar películas populares:', error);
      }
    };
    fetchPopulares();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom sx={{ marginTop: '20px' }}>
        🎬 Películas Populares
      </Typography>
      <Grid container spacing={4}>
        {peliculasPopulares?.map((peli) => (
          <Grid item xs={12} sm={6} md={4} key={peli.id}>
            <Card sx={{ maxWidth: 345 }}>
              {/* Imagen de la película */}
              <CardMedia
                component="img"
                height="400"
                image={`https://image.tmdb.org/t/p/w500${peli.poster_path}`} // URL de la imagen
                alt={peli.title}
              />
              <Paper sx={{ padding: '10px', textAlign: 'center' }}>
                <Typography variant="h6">{peli.title}</Typography>
              </Paper>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
