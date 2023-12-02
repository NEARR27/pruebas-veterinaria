const axios = require('axios');

const detalleVentaUrl = 'https://veterinaria-service-irvingcm123.cloud.okteto.net/api/detalleVenta';

describe('Pruebas para la API de detalle de ventas', () => {

  test('Debería obtener una lista de detalles de ventas mediante una solicitud GET', async () => {
    const response = await axios.get(detalleVentaUrl);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  test('Cada detalle de venta debe tener los campos necesarios y valores válidos', async () => {
    const response = await axios.get(detalleVentaUrl);
    const detallesVenta = response.data;

    detallesVenta.forEach((detalle) => {
      expect(detalle).toHaveProperty('id_detalleVenta');
      expect(detalle).toHaveProperty('id_venta');
      expect(detalle).toHaveProperty('cantidad_vendida');
      expect(detalle).toHaveProperty('precio_producto');
      expect(detalle).toHaveProperty('subtotal');
      expect(detalle).toHaveProperty('venta_granel');
      expect(parseFloat(detalle.cantidad_vendida)).toBeGreaterThanOrEqual(0);
      expect(parseFloat(detalle.precio_producto)).toBeGreaterThanOrEqual(0);
      expect(parseFloat(detalle.subtotal)).toBeGreaterThanOrEqual(0);
    });
  });
    
  test('Cada detalle de venta debe tener los campos necesarios y valores válidos', async () => {
    const response = await axios.get(detalleVentaUrl);
    const detallesVenta = response.data;
  
    detallesVenta.forEach((detalle) => {
      expect(detalle).toHaveProperty('id_detalleVenta');
      expect(detalle).toHaveProperty('id_venta');
      expect(detalle).toHaveProperty('cantidad_vendida');
      expect(detalle).toHaveProperty('precio_producto');
      expect(detalle).toHaveProperty('subtotal');
      expect(detalle).toHaveProperty('venta_granel');
      
    });
  });
  
  test('Cada detalle de venta debe referenciar un producto válido', async () => {
    const response = await axios.get(detalleVentaUrl);
    const detallesVenta = response.data;
  
    detallesVenta.forEach((detalle) => {
      expect(Array.isArray(detalle.id_producto)).toBe(true);
      detalle.id_producto.forEach((producto) => {
        expect(producto).toHaveProperty('id');
        expect(producto).toHaveProperty('nombre');
      });
    });
  });
  
    
  test('El estado de venta a granel debe ser consistente', async () => {
    const response = await axios.get(detalleVentaUrl);
    const detallesVenta = response.data;
  
    detallesVenta.forEach((detalle) => {
      expect(typeof detalle.venta_granel).toBe('boolean');
    });
  });
  
  

});
