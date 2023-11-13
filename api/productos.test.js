// productos.test.js
const request = require('supertest');
const axios = require('axios');

const apiUrl = 'https://veterinaria-service-irvingcm123.cloud.okteto.net/api/productos';

describe('Pruebas para la API de productos', () => {
  test('Debería obtener una lista de productos mediante una solicitud GET', async () => {
    const response = await request(apiUrl).get('');

    
    expect(response.status).toBe(200);

 
    expect(Array.isArray(response.body)).toBe(true);

  
  });
    
  test('todas las imágenes de productos deberían tener una URL válida', async () => {
    const response = await axios.get(apiUrl);
    const productos = response.data;
  
    productos.forEach((producto) => {
      expect(producto.imagen).toMatch(/^https?:\/\/\S+\.\S+$/);
    });
  });
    
  test('las existencias en el inventario deberían ser mayores o iguales a cero', async () => {
    const response = await axios.get(apiUrl);
    const productos = response.data;
  
    productos.forEach((producto) => {
      producto.inventario.forEach((inventario) => {
        expect(parseFloat(inventario.existencias)).toBeGreaterThanOrEqual(0);
      });
    });
  });
  
    
  test('los productos deberían tener una entrada correspondiente en el inventario', async () => {
    const response = await axios.get(apiUrl);
    const productos = response.data;
  
    productos.forEach((producto) => {
      producto.inventario.forEach((inventario) => {
        expect(inventario.id_producto).toBe(producto.id);
      });
    });
  });
    
  test('los códigos de barras deberían ser únicos', async () => {
    const response = await axios.get(apiUrl);
    const productos = response.data;
  
    const codigosDeBarras = new Set();
  
    productos.forEach((producto) => {
      expect(codigosDeBarras.has(producto.codigo_barras)).toBe(false);
      codigosDeBarras.add(producto.codigo_barras);
    });
  });
    
  test('los productos deberían tener una categoría correspondiente', async () => {
    const response = await axios.get(apiUrl);
    const productos = response.data;
  
    productos.forEach((producto) => {
      expect(producto.categoria.id_categoria).toBe(producto.id_categoria);
    });
  });
    
  
  
  


  
});

