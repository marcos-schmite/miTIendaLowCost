import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import CatalogoProductos from './CatalogoProductos';
import Producto from './Producto';
import Carrito from './Carrito';
import Checkout from './CheckOut';
import NavBar from './NavBar';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://opensheet.elk.sh/1asZAzP6yLwHLNDYYcwW7_ym56h5nzh1voVcNeqHrugI/Hoja1')
      .then(res => {
        const formatted = res.data.map((item, index) => {
          let images = [];
          if (item.imagenes) {
            images = item.imagenes
              .split(',')
              .map(img => img.trim())
              .map(imgPath => imgPath.startsWith('./assets')
                ? imgPath.replace('./assets', '/assets')
                : imgPath
              );
          } else {
            images = ['https://via.placeholder.com/150'];
          }
          return {
            id: parseInt(item.id ?? index),
            name: item.nombre,
            category: item.categoria,
            price: parseFloat(item.precio),
            description: item.descripcion ?? '',
            images: images,
          };
        });
        setProducts(formatted);
      })
      .catch(() => setProducts([]));
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<CatalogoProductos products={products} />} />
        <Route path="/producto/:id" element={<Producto products={products} />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;
