// src/pages/Favoritos.jsx
import React from "react";
import { useMovies } from "../context/MovieContext";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";

export default function Favoritos() {
  const { favoritos, toggleFavorito } = useMovies();

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom textAlign="center">
        ❤️ Mis Películas Favoritas
      </Typography>

      {favoritos.length === 0 ? (
        <Typography textAlign="center" mt={4}>
          Aún no agregaste ninguna película como favorita.
        </Typography>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {favoritos.map((peli) => (
            <Grid item xs={12} sm={6} md={4} key={peli.id}>
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
                    <Box display="flex" justifyContent="center">
                      <IconButton
                        onClick={(e) => {
                          e.preventDefault(); // Evita redireccionar al hacer clic
                          toggleFavorito(peli); // Permite quitar de favoritos
                        }}
                      >
                        <FavoriteIcon color="error" />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
