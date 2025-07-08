// src/pages/UltimosLanzamientos.jsx
import React from "react";
import { useMovies } from "../context/MovieContext";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function UltimosLanzamientos() {
  const { ultimosLanzamientos, cargando, error } = useMovies();

  // Verifica los datos de ultimosLanzamientos
  console.log(ultimosLanzamientos);

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;  // Mostrar mensaje de error si existe

  return (
    <div>
      <Typography variant="h5" sx={{ mt: 4, mb: 2, textAlign: "center" }}>
        🎞️ Últimos Lanzamientos
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {ultimosLanzamientos && ultimosLanzamientos.length > 0 ? (
          ultimosLanzamientos.map((peli) => (
            <Grid item xs={12} sm={6} md={3} key={peli.id}>
              <Link to={`/pelicula/${peli.id}`} style={{ textDecoration: "none" }}>
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
          ))
        ) : (
          <p>No hay últimos lanzamientos disponibles</p>
        )}
      </Grid>
    </div>
  );
}



