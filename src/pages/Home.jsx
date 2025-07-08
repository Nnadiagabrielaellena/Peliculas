import React from "react";
import { useMovies } from "../context/MovieContext";
import CarruselBanner from "../components/CarruselBanner";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  const { populares, mejoresPuntuadas, cargando } = useMovies();

  if (cargando) return <Box textAlign="center" mt={5}><CircularProgress /></Box>;

  return (
    <Box p={3}>
      {/* Carrusel de Películas Populares */}
      <CarruselBanner peliculas={populares.slice(0, 5)} />

      {/* Grilla con dos columnas: Populares y Mejores Puntuadas */}
      <Grid container spacing={4} mt={4}>
        {/* Películas Populares */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom textAlign="center">
            🎬 Populares
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {populares.slice(0, 6).map((peli) => (
              <Grid item xs={12} sm={6} key={peli.id}>
                <Link to={`/pelicula/${peli.id}`} style={{ textDecoration: "none" }}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="300"
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
        </Grid>

        {/* Mejores Puntuadas */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom textAlign="center">
            ⭐ Mejores Puntuadas
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {mejoresPuntuadas.slice(0, 6).map((peli) => (
              <Grid item xs={12} sm={6} key={peli.id}>
                <Link to={`/pelicula/${peli.id}`} style={{ textDecoration: "none" }}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="300"
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
        </Grid>
      </Grid>
    </Box>
  );
}


