// src/components/CarruselBanner.jsx
import React from 'react';
import Slider from 'react-slick';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const CarruselBanner = ({ peliculas }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <Slider {...settings}>
      {peliculas.map((peli) => (
        <Box
          key={peli.id}
          sx={{
            height: '60vh',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${peli.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            color: '#fff',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              bottom: 30,
              left: 30,
              backgroundColor: 'rgba(0,0,0,0.5)',
              padding: '20px',
              borderRadius: '8px',
              maxWidth: '60%',
            }}
          >
            <Typography variant="h4" component={Link} to={`/pelicula/${peli.id}`} style={{ textDecoration: 'none', color: '#fff' }}>
              {peli.title}
            </Typography>
            <Typography variant="body1">{peli.overview.slice(0, 200)}...</Typography>
          </Box>
        </Box>
      ))}
    </Slider>
  );
};

export default CarruselBanner;

