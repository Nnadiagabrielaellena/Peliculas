// src/componentes/CarruselBanner.jsx
import React from "react";
import Slider from "react-slick"; // Asegúrate de instalar react-slick
import { useMovies } from "../context/MovieContext";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function CarruselBanner() {
  const { populares } = useMovies();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Slider {...settings}>
      {populares.map((peli) => (
        <div key={peli.id}>
          <Link to={`/pelicula/${peli.id}`} style={{ textDecoration: "none" }}>
            <Card>
              <CardMedia
                component="img"
                height="500"
                image={`https://image.tmdb.org/t/p/w500${peli.backdrop_path}`}
                alt={peli.title}
              />
              <CardContent>
                <Typography variant="h6" align="center">
                  {peli.title}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </div>
      ))}
    </Slider>
  );
}



