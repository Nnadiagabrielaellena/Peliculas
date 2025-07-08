// src/components/Header.jsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, TextField, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search'; // Revisa esta importación

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/buscar?q=${searchTerm}`;
    }
  };

  return (
    <AppBar position="static" sx={{
      backgroundImage: 'url(/path/to/your/image.jpg)', 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '20px 0',
    }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>
          MovieApp
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/populares">Populares</Button>
        <Button color="inherit" component={Link} to="/ultimos-lanzamientos">Últimos Lanzamientos</Button>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            value={searchTerm}
            onChange={handleSearchChange}
            label="Buscar películas"
            variant="outlined"
            size="small"
            sx={{ backgroundColor: 'white', borderRadius: '4px' }}
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
