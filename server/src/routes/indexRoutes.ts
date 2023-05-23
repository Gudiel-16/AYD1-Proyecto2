import { Router } from 'express';

import {c_carrito} from '../controllers/c_carrito';
import {c_login} from '../controllers/c_login';
import {c_categoria} from '../controllers/c_categoria';
import {c_pago} from '../controllers/c_pago';
import {c_producto} from '../controllers/c_producto';
import {c_usuario} from '../controllers/c_usuario';

class IndexRoutes{
    public router: Router = Router();

    constructor(){
        this.config();

        //USUARIO
        this.router.post('/registrarUsuario', c_usuario.registrar);
        this.router.get('/reset', c_usuario.reset);

        //PRODUCTO
        this.router.post('/agregarProduco', c_producto.agregarProducto);
        this.router.get('/obtenerProductos', c_producto.obtenerTodos);
        this.router.get('/obtenerProducto/:idProducto', c_producto.obtenerUnProducto);

        //PAGAR
        this.router.post('/pagarAhora', c_pago.realizarPago);
        this.router.get('/factura/:idFactura', c_pago.verDatosFactura);

        //CATEGORIA
        this.router.get('/filtroCategoria/:idCategoria', c_categoria.obtenerProductos);
        this.router.get('/categorias', c_categoria.categorias);
        //LOGIN
        this.router.post('/login', c_login.loguear);
        
        //CARRITO
        this.router.post('/agregarProductoCarrito', c_carrito.insertar);
        this.router.post('/actualizarCarrito', c_carrito.modificar);
        this.router.delete('/eliminarProductoCarrito', c_carrito.eliminar);
        this.router.get('/leerCarrito/:idUsuario', c_carrito.leer);
        this.router.delete('/limpiarCarrito/:idUsuario', c_carrito.limpiar);

    }

    config(): void {

    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;