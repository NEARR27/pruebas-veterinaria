const axios = require('axios');

const ventasUrl = 'https://veterinaria-service-irvingcm123.cloud.okteto.net/api/venta';

describe('Pruebas para la API de ventas', () => {

  test('Debería obtener una lista de ventas mediante una solicitud GET', async () => {
    const response = await axios.get(ventasUrl);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  test('Cada venta debe tener los campos necesarios y valores válidos', async () => {
    const response = await axios.get(ventasUrl);
    const ventas = response.data;

    ventas.forEach((venta) => {
      expect(venta).toHaveProperty('id_venta');
      expect(venta).toHaveProperty('id_vendedor');
      expect(venta).toHaveProperty('id_sucursal');
      expect(venta).toHaveProperty('fecha_venta');
      expect(venta).toHaveProperty('total_venta');
      expect(venta).toHaveProperty('subtotal');
      expect(venta).toHaveProperty('iva');
      expect(venta).toHaveProperty('sucursal');
      expect(venta).toHaveProperty('vendedor');
      expect(parseFloat(venta.total_venta)).toBeGreaterThanOrEqual(0);
      expect(parseFloat(venta.subtotal)).toBeGreaterThanOrEqual(0);
      expect(parseFloat(venta.iva)).toBeGreaterThanOrEqual(0);
    });
  });

  test('Información de la sucursal y el vendedor en cada venta debe ser coherente', async () => {
    const response = await axios.get(ventasUrl);
    const ventas = response.data;

    ventas.forEach((venta) => {
      const { sucursal, vendedor } = venta;
      expect(sucursal.id_sucursal).toBe(venta.id_sucursal);
      expect(vendedor.id_vendedor).toBe(venta.id_vendedor);
    });
  });

  test('Las fechas de venta deben seguir un formato válido', async () => {
    const response = await axios.get(ventasUrl);
    const ventas = response.data;
  
    ventas.forEach((venta) => {
      expect(venta.fecha_venta).toMatch(/^\d{4}-\d{2}-\d{2}$/); // Formato YYYY-MM-DD
    });
  });
  
  test('El total de venta debe ser igual al subtotal más el IVA', async () => {
    const response = await axios.get(ventasUrl);
    const ventas = response.data;
  
    ventas.forEach((venta) => {
      const totalCalculado = parseFloat(venta.subtotal) + parseFloat(venta.iva);
      expect(parseFloat(venta.total_venta)).toBeCloseTo(totalCalculado);
    });
  });
  

  test('La información del vendedor y la sucursal debe estar completa y ser coherente', async () => {
    const response = await axios.get(ventasUrl);
    const ventas = response.data;
  
    ventas.forEach((venta) => {
      const { sucursal, vendedor } = venta;
      expect(sucursal.nombre).toBeTruthy();
      expect(sucursal.direccion).toBeTruthy();
      expect(vendedor.acronimo).toBeTruthy();
      expect(vendedor.permisoVenta).toBe(true);
    });
  });
  

});




  
  
  
