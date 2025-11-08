import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Stack,
} from "@mui/material";
import axios from "axios";

const GOOGLE_FORM_ACTION_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSeeIQa4XKkvGqYS2JZ3icDXCWb8zsFEPnLAyrWIvczKtEStiw/formResponse"; // Reemplaza TU_FORM_ID con el tuyo

const ENTRY_POINTS = {
    nombre: "entry.1973839934",
    dni: "entry.567271939",
    email: "entry.1675174646",
    productos: "entry.1864682132",
    celular: "entry.451953303",
    estado: "entry.1473843210",
};

const Checkout = () => {
    const [cart, setCart] = useState([]);
    const [formData, setFormData] = useState({
        nombre: "",
        dni: "",
        email: "",
        celular: "",
        estado: "pendiente",
    });
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Genera string con productos y cantidades
    const formatProducts = () => {
        return cart
            .map((item) => `${item.name} x${item.quantity}`)
            .join("; ");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.nombre ||
            !formData.dni ||
            !formData.email ||
            !formData.celular
        ) {
            setMessage("Por favor completas todos los campos.");
            return;
        }

        setSubmitting(true);
        setMessage("");

        // Armar datos para Google Form (form-data)
        const formPayload = new URLSearchParams();
        formPayload.append(ENTRY_POINTS.nombre, formData.nombre);
        formPayload.append(ENTRY_POINTS.dni, formData.dni);
        formPayload.append(ENTRY_POINTS.email, formData.email);
        formPayload.append(ENTRY_POINTS.celular, formData.celular);
        formPayload.append(ENTRY_POINTS.estado, formData.estado);
        formPayload.append(ENTRY_POINTS.productos, formatProducts());

        try {
            fetch(GOOGLE_FORM_ACTION_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formPayload.toString(),
            });
            setMessage("¡Compra enviada correctamente!");
            localStorage.removeItem("cart");
            setCart([]);
            setFormData({
                nombre: "",
                dni: "",
                email: "",
                celular: "",
                estado: "",
            });
        } catch (error) {
            setMessage("Error al enviar la compra, inténtalo nuevamente.");
        } finally {
            setSubmitting(false);
        }
    };

    if (cart.length === 0)
        return (
            <Container sx={{ mt: 4 }}>
                <Typography variant="h5" align="center">
                    Tu carrito está vacío
                </Typography>
            </Container>
        );

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Checkout
            </Typography>
            <Typography variant="subtitle1" mb={2}>
                Productos a comprar: {formatProducts()}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack spacing={2}>
                    <TextField
                        label="Nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="DNI"
                        name="dni"
                        value={formData.dni}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Celular"
                        name="celular"
                        value={formData.celular}
                        onChange={handleChange}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={submitting}
                    >
                        {submitting ? "Enviando..." : "Finalizar compra"}
                    </Button>
                    {message && (
                        <Typography color={message.includes("Error") ? "error" : "green"}>
                            {message}
                        </Typography>
                    )}
                </Stack>
            </Box>
        </Container>
    );
};

export default Checkout;
