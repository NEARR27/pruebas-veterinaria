const axios = require('axios');

const apiUrl = 'https://veterinaria-service-irvingcm123.cloud.okteto.net/api/productos';

describe('Prueba get de ventas', () => {

    test('los IDs de venta deberían ser únicos', async () => {
        const response = await axios.get(apiUrl);
        const ventas = response.data;
      
        const idsDeVenta = new Set();
      
        ventas.forEach((venta) => {
          console.log(venta.id_venta); 
          expect(idsDeVenta.has(venta.id_venta)).toBe(false, `El ID de venta ${venta.id_venta} no es único.`);
          idsDeVenta.add(venta.id_venta);
        });
      });
      
      
      
      

})



  
  
  
