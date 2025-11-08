import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Button,
} from '@mui/material';

const Producto = ({ products }) => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" align="center">Producto no encontrado</Typography>
      </Container>
    );
  }

  // Función para añadir al carrito en localStorage
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingIndex = cart.findIndex(item => item.id === product.id);

    if (existingIndex !== -1) {
      // Si ya está, actualizar la cantidad
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Producto "${product.name}" añadido al carrito.`);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card>
        {product.images[0] && (
          <CardMedia
            component="img"
            height="300"
            image={product.images[0]}
            alt={product.name}
            sx={{ objectFit: 'cover' }}
          />
        )}
        <CardContent>
          <Typography variant="h4" gutterBottom>{product.name}</Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Categoría: {product.category}
          </Typography>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Precio: ${product.price}
          </Typography>
          <Typography variant="body1">{product.description}</Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={handleAddToCart}
          >
            Añadir al carrito
          </Button>

          <Stack direction="row" spacing={1} mt={2}>
            {product.images.map((img, i) => (
              <CardMedia
                key={i}
                component="img"
                image={img}
                alt={`${product.name} image ${i}`}
                sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1 }}
              />
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Producto;
