import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Slider,
  Box,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const CatalogoProductos = ({ products }) => {
  
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredProducts, setFilteredProducts] = React.useState(products);
  const [categoryFilter, setCategoryFilter] = React.useState('Todas');
  const [priceFilter, setPriceFilter] = React.useState([0, 2000]);

  const navigate = useNavigate();

  const categories = ['Todas', ...new Set(products.map((p) => p.category))];

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    const filtered = products.filter((p) => {
      const inCategory = categoryFilter === 'Todas' ? true : p.category === categoryFilter;
      const inPrice = p.price >= priceFilter[0] && p.price <= priceFilter[1];
      const inSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      return inCategory && inPrice && inSearch;
    });
    setFilteredProducts(filtered);
  }, [searchTerm, categoryFilter, priceFilter, products]);

  const handleCardClick = (id) => {
    navigate(`/producto/${id}`);
  };
  
  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom align="center" fontWeight="bold" mb={3}>
        Catálogo de Productos
      </Typography>

      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} mb={4}>
        <TextField
          label="Buscar productos"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Categoría</InputLabel>
          <Select value={categoryFilter} label="Categoría" onChange={(e) => setCategoryFilter(e.target.value)}>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ width: 200, px: 2 }}>
          <Typography gutterBottom>
            Precio (${priceFilter[0]} - ${priceFilter[1]})
          </Typography>
          <Slider
            value={priceFilter}
            min={0}
            max={3000}
            onChange={(e, newValue) => setPriceFilter(newValue)}
            valueLabelDisplay="auto"
          />
        </Box>
      </Stack>

      {filteredProducts.length === 0 ? (
        <Typography variant="h6" align="center">
          No se encontraron productos
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id} sx={{ display: 'flex' }}>
              <Card
                onClick={() => handleCardClick(product.id)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  width: '100%',
                  cursor: 'pointer',
                  '&:hover': { boxShadow: 6 },
                }}
              >
                {product.images[0] && (
                  <CardMedia
                    component="img"
                    image={product.images[0]}
                    alt={product.name}
                    sx={{
                      height: 180,
                      objectFit: 'cover',
                    }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" gutterBottom noWrap title={product.name}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap title={product.description}>
                    {product.description}
                  </Typography>
                  <Typography variant="subtitle1" mt={1} fontWeight="bold">
                    ${product.price}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Categoría: {product.category}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default CatalogoProductos;
