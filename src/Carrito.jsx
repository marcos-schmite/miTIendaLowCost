import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Divider,
  Button,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Carrito = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleClear = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mi Carrito
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" align="center">
          Tu carrito está vacío
        </Typography>
      ) : (
        <>
          <List>
            {cart.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" onClick={() => handleRemove(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      variant="square"
                      src={item.images[0]}
                      alt={item.name}
                      sx={{ width: 60, height: 60 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${item.name} x${item.quantity}`}
                    secondary={`$${item.price} cada uno`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>

          <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
            <Button variant="contained" color="secondary" onClick={handleClear}>
              Vaciar carrito
            </Button>
            <Button variant="contained" color="primary" href="/checkout">
              Ir a Checkout
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Carrito;
