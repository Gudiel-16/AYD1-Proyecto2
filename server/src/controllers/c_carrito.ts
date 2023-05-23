import { Request, Response } from 'express';

import pool from '../database';

class C_carrito {

    public async insertar(req: Request, res: Response) {
        //Validar existencia del producto 
        let existe = await pool.query(` SELECT * FROM producto WHERE producto = ${[req.body.producto]}`);
        if (existe.length > 0) {
            //Si existe el producto especificado
            //Buscar el producto en el carrito del cliente
            let result = await pool.query(` SELECT * FROM carrito WHERE usuario = ${[req.body.usuario]} AND producto = ${[req.body.producto]}`);
            if (result.length > 0) {
                //Ya existe el producto en el carrito del cliente
                //Validar stock
                let consultarStock = await pool.query(`SELECT existencia FROM producto WHERE producto = ${[req.body.producto]}`);
                let stock = consultarStock[0].existencia;
                if (stock >= req.body.cantidad) {
                    //Hay suficientes productos para agregar al carrito
                    //Consultar cuantos productos hay en el carrito
                    let consultarCantidad = await pool.query(`SELECT cantidad FROM carrito WHERE producto = ${[req.body.producto]} AND usuario= ${req.body.usuario}`);
                    let cantidad = consultarCantidad[0].cantidad;
                    //Quitar del stock
                    var nuevoStock = stock - req.body.cantidad;
                    let reducirStock = await pool.query(`UPDATE producto SET existencia = ${nuevoStock} WHERE producto = ${req.body.producto}`);
                    //Aumentar cantidad de productos en carrito
                    var nuevaCantidad = cantidad + req.body.cantidad;
                    let aumentarCantidad = await pool.query(`UPDATE carrito SET cantidad = ${nuevaCantidad} WHERE producto = ${req.body.producto} AND usuario = ${req.body.usuario}`);
                    res.status(200).send('agregado');
                } else {
                    //No hay suficientes productos para agregar al carrito
                    res.status(500).send('false');
                }
            } else {
                //No existe el producto en el carrito del cliente
                //Validar stock
                let consultarStock = await pool.query(`SELECT existencia FROM producto WHERE producto = ${[req.body.producto]}`);
                let stock = consultarStock[0].existencia;
                if (stock >= req.body.cantidad) {
                    //Hay suficientes productos para agregar al carrito
                    //Quitar del stock
                    var nuevoStock = stock - req.body.cantidad;
                    let reducirStock = await pool.query(`UPDATE producto SET existencia = ${nuevoStock} WHERE producto = ${req.body.producto}`);
                    //Insertar productos en carrito
                    let insertarProducto = await pool.query(`INSERT INTO carrito (producto, usuario, cantidad) VALUES (${req.body.producto}, ${req.body.usuario}, ${req.body.cantidad})`);
                    res.status(200).send('agregado');
                } else {
                    //No hay suficientes productos para agregar al carrito
                    res.status(500).send('false');
                }
            }
        } else {
            //No existe el producto especificado
            res.status(500).send('false');
        }
    }

    public async modificar(req: Request, res: Response) {
        //Buscar el producto en el carrito del cliente
        let result = await pool.query(` SELECT * FROM carrito WHERE usuario = ${[req.body.usuario]} AND producto = ${[req.body.producto]}`);
        if (result.length > 0) {
            //Ya existe el producto en el carrito del cliente
            //Consultar la cantidad de productos en el carrito del cliente
            let consultarCantidad = await pool.query(`SELECT cantidad FROM carrito WHERE producto = ${[req.body.producto]} AND usuario= ${req.body.usuario}`);
            let cantidad = consultarCantidad[0].cantidad;
            if (cantidad < req.body.cantidad) {
                //Mas productos
                //Validar stock
                var diferencia = req.body.cantidad - cantidad;
                let consultarStock = await pool.query(`SELECT existencia FROM producto WHERE producto = ${[req.body.producto]}`);
                let stock = consultarStock[0].existencia;
                if (stock >= diferencia) {
                    //Hay suficientes productos para agregar al carrito
                    //Quitar del stock
                    var nuevoStock = stock - diferencia;
                    let reducirStock = await pool.query(`UPDATE producto SET existencia = ${nuevoStock} WHERE producto = ${req.body.producto}`);
                    //Aumentar cantidad de productos en carrito
                    var nuevaCantidad = req.body.cantidad;
                    let aumentarCantidad = await pool.query(`UPDATE carrito SET cantidad = ${nuevaCantidad} WHERE producto = ${req.body.producto} AND usuario = ${req.body.usuario}`);
                    res.status(200).send('true');
                } else {
                    //No hay suficientes productos para agregar al carrito
                    res.status(500).send('false');
                }
            } else if (cantidad > req.body.cantidad) {
                //Menos productos
                //Cantidad de productos que se van a retirar del carrito
                var diferencia: number = cantidad - req.body.cantidad;
                //Consultar el stock
                let consultarStock = await pool.query(`SELECT existencia FROM producto WHERE producto = ${[req.body.producto]}`);
                let stock: number = consultarStock[0].existencia;
                //Aumentar del stock
                var nuevoStock = stock + diferencia;
                let aumentarStock = await pool.query(`UPDATE producto SET existencia = ${nuevoStock} WHERE producto = ${req.body.producto}`);
                //Reducir cantidad de productos en carrito
                var nuevaCantidad = req.body.cantidad;
                let aumentarCantidad = await pool.query(`UPDATE carrito SET cantidad = ${nuevaCantidad} WHERE producto = ${req.body.producto} AND usuario = ${req.body.usuario}`);
                res.status(200).send('true');
            } else {
                //Cantidad no cambia
                res.status(200).send('true');
            }
        } else {
            //No existe el producto en el carrito del cliente
            res.status(500).send('false');
        }
    }

    public async eliminar(req: Request, res: Response) {
        //Buscar el producto en el carrito del cliente
        let result = await pool.query(`SELECT * FROM carrito WHERE usuario = ${[req.body.usuario]} AND producto = ${[req.body.producto]}`);
        if (result.length > 0) {
            //Si existe el producto en el carrito del cliente
            //Consultar stock
            let consultarStock = await pool.query(`SELECT existencia FROM producto WHERE producto = ${[req.body.producto]}`);
            let stock = consultarStock[0].existencia;
            //Consultar la cantidad de productos en el carrito del cliente
            let consultarCantidad = await pool.query(`SELECT cantidad FROM carrito WHERE producto = ${[req.body.producto]} AND usuario= ${req.body.usuario}`);
            let cantidad = consultarCantidad[0].cantidad;
            //Aumentar del stock
            var nuevoStock = stock + cantidad;
            let aumentarStock = await pool.query(`UPDATE producto SET existencia = ${nuevoStock} WHERE producto = ${req.body.producto}`);
            //Eliminar producto del carrito
            let eliminar = await pool.query(`DELETE FROM carrito WHERE producto = ${req.body.producto} AND usuario = ${req.body.usuario}`);
            res.status(200).send('true');
        } else {
            //No existe el producto en el carrito del cliente
            res.status(500).send('false');
        }

    }

    public async leer(req: Request, res: Response) {
        let result = await pool.query(` SELECT 
		                                    producto.producto 						AS identificador,
                                            producto.nombre							AS nombre_producto,
                                            producto.descripcion					AS descripcion,
                                            producto.precio							AS precio,
                                            producto.imagen							AS imagen,
                                            carrito.cantidad						AS cantidad,
                                            producto.categoria 						AS categoria
                                        FROM 
                                            carrito
                                        INNER JOIN producto ON carrito.producto = producto.producto
                                        INNER JOIN usuario 	ON carrito.usuario = usuario.usuario
                                                            AND usuario.usuario = ${req.params.idUsuario}`);
        if (result.length > 0) {
            res.status(200).send({ productos: result });
        } else {
            res.status(200).send({});
        }
    }

    public async limpiar(req: Request, res: Response) {
        //Buscar productos en el carrito del cliente
        let result = await pool.query(` SELECT * FROM carrito WHERE usuario = ${req.params.idUsuario}`);
        if (result.length > 0) {
            for (let i = 0; i < result.length; i++) {
                //Consultar stock
                let consultarStock = await pool.query(`SELECT existencia FROM producto WHERE producto = ${result[i].producto}`);
                let stock = consultarStock[0].existencia;
                //Consultar la cantidad de productos en el carrito del cliente
                let consultarCantidad = await pool.query(`SELECT cantidad FROM carrito WHERE producto = ${result[i].producto} AND usuario= ${result[i].usuario}`);
                let cantidad = consultarCantidad[0].cantidad;
                //Aumentar del stock
                var nuevoStock = stock + cantidad;
                let aumentarStock = await pool.query(`UPDATE producto SET existencia = ${nuevoStock} WHERE producto = ${result[i].producto}`);
                //Eliminar producto del carrito
                let eliminar = await pool.query(`DELETE FROM carrito WHERE producto = ${result[i].producto} AND usuario = ${result[i].usuario}`);
            }
            res.status(200).send('true');
        } else {
            res.status(200).send('true');
        }
    }

}

export const c_carrito = new C_carrito();