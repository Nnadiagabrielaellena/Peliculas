// src/pages/Home.jsx
import React from "react";
import { useMovies } from "../context/MovieContext";
import CarruselBanner from "../components/CarruselBanner";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  const { populares, mejoresPuntuadas, cargando } = useMovies();

  if (cargando) return <p>Cargando películas...</p>;

  return (
    <div>
      <CarruselBanner peliculas={populares.slice(0, 5)} />

      <Typography variant="h5" sx={{ mt: 4, mb: 2, textAlign: "center" }}>
        ⭐ Mejores Puntuadas
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {mejoresPuntuadas.slice(0, 8).map((peli) => (
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
        ))}
      </Grid>
    </div>
  );
}



