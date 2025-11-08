import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();

    const handleGoToCart = () => {
        navigate('/carrito');
    };

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Button onClick={handleGoHome} color="inherit" >
                    Mi Tienda
                </Button>
                <Button color="inherit" onClick={handleGoToCart}>
                    CARRITO
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
