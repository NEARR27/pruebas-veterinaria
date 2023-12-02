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

  test('los precios de los productos deberían ser números positivos', async () => {
    const response = await axios.get(apiUrl);
    const productos = response.data;
  
    productos.forEach((producto) => {
      const precio = parseFloat(producto.precio);
      expect(precio).toBeGreaterThanOrEqual(0);
    });
  });

  test('los productos deberían tener una marca correspondiente', async () => {
    const response = await axios.get(apiUrl);
    const productos = response.data;
  
    productos.forEach((producto) => {
      expect(producto.marca.id_marca).toBe(producto.id_marca);
    });
  });
  
  test('los productos deberían tener una cantidad definida', async () => {
    const response = await axios.get(apiUrl);
    const productos = response.data;
  
    productos.forEach((producto) => {
      expect(parseFloat(producto.cantidad)).toBeGreaterThan(0);
    });
  });

  test('los productos deberían tener un proveedor correspondiente', async () => {
    const response = await axios.get(apiUrl);
    const productos = response.data;
  
    productos.forEach((producto) => {
      expect(producto.proveedor.id_proveedor).toBe(producto.id_proveedor);
    });
  });
  
  test('las descripciones de los productos no deben estar vacías', async () => {
    const response = await axios.get(apiUrl);
    const productos = response.data;
  
    productos.forEach((producto) => {
      expect(producto.descripcion).toBeTruthy();
    });
  });
  
  test('los nombres de las marcas deben ser coherentes con los productos', async () => {
    const response = await axios.get(apiUrl);
    const productos = response.data;
  
    productos.forEach((producto) => {
      expect(producto.marca.nombre).toMatch(/^[a-zA-Z\s]+$/);
    });
  });
  

  
  

  describe('Prueba para Verificar Consistencia en Datos de Proveedor:', () => {

    test('los datos del proveedor deben ser coherentes y completos', async () => {
      const response = await axios.get(apiUrl);
      const productos = response.data;
    
      productos.forEach((producto) => {
        const proveedor = producto.proveedor;
        expect(proveedor.nombre).toBeTruthy();
        expect(proveedor.direccion).toBeTruthy();
        expect(proveedor.ciudad).toBeTruthy();
        expect(proveedor.estado).toBeTruthy();
        expect(proveedor.telefono).toMatch(/^\d+$/);
        if (proveedor.email) {
          expect(proveedor.email).toMatch(/^\S+@\S+\.\S+$/);
        }
      });
    });

    test('la información de venta a granel debe ser coherente', async () => {
      const response = await axios.get(apiUrl);
      const productos = response.data;
    
      productos.forEach((producto) => {
        if (producto.venta_granel) {
          expect(parseFloat(producto.precio_granel)).toBeGreaterThan(0);
        }
      });
    });

    test('los proveedores deben tener todos los campos necesarios', async () => {
      const response = await axios.get('https://veterinaria-service-irvingcm123.cloud.okteto.net/api/proveedores');
      const proveedores = response.data;
    
      proveedores.forEach((proveedor) => {
        expect(proveedor).toHaveProperty('id_proveedor');
        expect(proveedor).toHaveProperty('nombre');
        expect(proveedor).toHaveProperty('nomenclatura');
        expect(proveedor).toHaveProperty('direccion');
        expect(proveedor).toHaveProperty('ciudad');
        expect(proveedor).toHaveProperty('estado');
        expect(proveedor).toHaveProperty('telefono');
        // El email puede ser null, así que solo verificamos la propiedad
        expect(proveedor).toHaveProperty('email');
      });
    });
    
    test('los teléfonos de los proveedores deben tener un formato válido', async () => {
      const response = await axios.get('https://veterinaria-service-irvingcm123.cloud.okteto.net/api/proveedores');
      const proveedores = response.data;
    
      proveedores.forEach((proveedor) => {
        expect(proveedor.telefono).toMatch(/^\d{10}$/);
      });
    });
    
    test('los nombres de los proveedores deben ser únicos', async () => {
      const response = await axios.get('https://veterinaria-service-irvingcm123.cloud.okteto.net/api/proveedores');
      const proveedores = response.data;
    
      const nombres = new Set();
      proveedores.forEach((proveedor) => {
        expect(nombres.has(proveedor.nombre)).toBe(false);
        nombres.add(proveedor.nombre);
      });
    });
    

    test('la nomenclatura de los proveedores debe seguir un patrón consistente', async () => {
      const response = await axios.get('https://veterinaria-service-irvingcm123.cloud.okteto.net/api/proveedores');
      const proveedores = response.data;
    
      proveedores.forEach((proveedor) => {
        expect(proveedor.nomenclatura).toMatch(/^[A-Za-z]{2}$/);
      });
    });
    

    test('si está presente, el email de los proveedores debe tener un formato válido', async () => {
      const response = await axios.get('https://veterinaria-service-irvingcm123.cloud.okteto.net/api/proveedores');
      const proveedores = response.data;
    
      proveedores.forEach((proveedor) => {
        if (proveedor.email) {
          expect(proveedor.email).toMatch(/^\S+@\S+\.\S+$/);
        }
      });
    });
    
    
  })



  
  
  
  
    
});

