const axios = require('axios');

const inventarioUrl = 'https://veterinaria-service-irvingcm123.cloud.okteto.net/api/inventario';

describe('Pruebas para la API de inventario', () => {

  test('Debería obtener una lista del inventario mediante una solicitud GET', async () => {
    const response = await axios.get(inventarioUrl);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  test('Cada entrada del inventario debe tener los campos necesarios y valores válidos', async () => {
    const response = await axios.get(inventarioUrl);
    const inventario = response.data;

    inventario.forEach((item) => {
      expect(item).toHaveProperty('id_inventario');
      expect(item).toHaveProperty('id_producto');
      expect(item).toHaveProperty('existencias');
      expect(item).toHaveProperty('StockMinimo');
      expect(item).toHaveProperty('StockMaximo');
      expect(item).toHaveProperty('producto');
      expect(parseInt(item.existencias)).toBeGreaterThanOrEqual(0);
      expect(parseInt(item.StockMinimo)).toBeGreaterThanOrEqual(0);
      expect(parseInt(item.StockMaximo)).toBeGreaterThanOrEqual(0);
    });
  });

  test('Los datos del producto en el inventario deben ser consistentes', async () => {
    const response = await axios.get(inventarioUrl);
    const inventario = response.data;

    inventario.forEach((item) => {
      const producto = item.producto;
      expect(producto.id).toBe(item.id_producto);
      expect(producto).toHaveProperty('nombre');
      expect(producto).toHaveProperty('descripcion');
      expect(producto).toHaveProperty('precio');
      expect(parseFloat(producto.precio)).toBeGreaterThanOrEqual(0);
      expect(producto).toHaveProperty('codigo_barras');
      expect(producto.codigo_barras).toMatch(/^\d+$/);
    });
  });

 
  test('Cada entrada del inventario debe tener un producto asociado válido', async () => {
    const response = await axios.get(inventarioUrl);
    const inventario = response.data;
  
    inventario.forEach((item) => {
      expect(item.producto).toBeDefined();
      expect(item.producto.nombre).toBeTruthy();
      expect(item.producto.precio).toBeTruthy();
    });
  });
  
    
  test('Información del producto en el inventario debe ser coherente y lógica', async () => {
    const response = await axios.get(inventarioUrl);
    const inventario = response.data;
  
    inventario.forEach((item) => {
      const producto = item.producto;
      expect(parseFloat(producto.precio)).toBeGreaterThanOrEqual(0);
      expect(producto.descripcion).toBeTruthy();
      expect(producto.nombre).toBeTruthy();
    });
  });
  

});
