// src/pages/Buscar.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Paper, Typography } from '@mui/material';
import axios from '../api/axios';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Buscar() {
  const query = useQuery();
  const searchTerm = query.get('q');
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      const fetchSearchResults = async () => {
        try {
          const response = await axios.get('search/movie', {
            params: { query: searchTerm }
          });
          setPeliculas(response.data.results);
        } catch (error) {
          console.error('Error al buscar películas:', error);
        }
      };
      fetchSearchResults();
    }
  }, [searchTerm]);

  return (
    <div>
      <Typography variant="h4" gutterBottom sx={{ marginTop: '20px' }}>
        🎬 Resultados de búsqueda para: "{searchTerm}"
      </Typography>
      <Grid container spacing={4}>
        {peliculas?.map((peli) => (
          <Grid item xs={12} sm={6} md={4} key={peli.id}>
            <Paper sx={{ padding: '10px', textAlign: 'center' }}>
              <Typography variant="h6">{peli.title}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
