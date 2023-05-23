import { Request, Response } from 'express';

import pool from '../database';

class C_pago{

    public async realizarPago(req:Request,res:Response){

        try {
            const {usuario,nombre,nit,telefono,metodo_pago,tarjeta,total,correo} = req.body;

            let result0 = await pool.query('SELECT * FROM usuario WHERE usuario = ?',[usuario]);

            if(result0.length>0){
                //obtengo fecha
                const fecha = new Date();
                const anioActual = fecha.getFullYear();
                const mesActual = fecha.getMonth() + 1;
                const hoy = fecha.getDate();
                const fechaActual = anioActual+"/"+mesActual+"/"+hoy;

                //ingreso datos en factura
                let result = await pool.query(`INSERT INTO factura(fecha,nombrefacturar,nit,correofacturar,telefono,total,usuario,metodo_pago,tarjeta) VALUES(?,?,?,?,?,?,?,?,?)`,
                                                [fechaActual,nombre,nit,correo,telefono,total,usuario,metodo_pago,tarjeta]);
                
                //obtengo id de factura
                let result2 = await pool.query('SELECT factura from factura order by factura desc limit 1;');
                let idFac = result2[0]["factura"];

                //obtengo datos del carrito
                let result3 = await pool.query(`SELECT 
                                                    carrito.producto, carrito.cantidad, producto.nombre, producto.precio 
                                                FROM 
                                                    carrito 
                                                INNER JOIN producto ON producto.producto = carrito.producto and usuario = ?`,[usuario]);
                
                //productos
                let array = [];

                //ingreso datos en tabla ventas
                for (const key in result3) {
                    let product = result3[key]["producto"];
                    let cantid = result3[key]["cantidad"];
                    array.push({codigoDeProducto:product,nombreDeProducto:result3[key]["nombre"],cantidad:cantid,precio:result3[key]["precio"]});
                    await pool.query('INSERT INTO venta(producto,cantidad,factura) VALUES(?,?,?)',[product,cantid,idFac]);
                }

                //elimino datos del carrito
                let result4 = await pool.query('DELETE FROM carrito WHERE usuario = ?',[usuario]);

                res.status(200).json({nombre:nombre,nit:nit,telefono:telefono,correo:correo,total:total,metodo_pago:metodo_pago,fecha:fechaActual,no_factura:idFac,detalle:array});
            }else{
                res.status(500).send('no existe usuario');
            }
            
        } catch (error) {
            res.status(500).send(false); 
        }

    }
    
    public async verDatosFactura(req:Request,res:Response){

        try {
            //Verificar que exista la factura
            let result = await pool.query(`SELECT * FROM factura WHERE factura = ${req.params.idFactura}`);
            if (result.length > 0) {
                //La factura existe
                let encabezado = await pool.query(` SELECT 
                                                        factura.nombrefacturar 	                AS nombre,
                                                        factura.nit 			                AS nit,
                                                        DATE_FORMAT(factura.fecha, "%d/%m/%Y")  AS fecha,
                                                        factura.factura			                AS no_factura
                                                    FROM
                                                        factura
                                                    WHERE
                                                        factura =  ${req.params.idFactura}`);
                let detalle = await pool.query(` SELECT 
                                                    producto.producto 	AS codigoDeProducto,
                                                    producto.nombre		AS nombreDeProducto,
                                                    venta.cantidad		AS cantidad,
                                                    producto.precio		AS precioUnitario
                                                FROM
                                                    producto
                                                INNER JOIN venta 	ON 		producto.producto = venta.producto
                                                INNER JOIN factura 	ON 		venta.factura = factura.factura 
                                                                    AND 	factura.factura = ${req.params.idFactura}`);

                var factura =   {
                                    nombre      :encabezado[0]["nombre"], 
                                    nit         :encabezado[0]["nit"],
                                    fecha       :encabezado[0]["fecha"],
                                    no_factura  :encabezado[0]["no_factura"],
                                    detalle
                                };
                res.status(200).send(factura);
            }else{
                //La factura no existe
                res.status(500).send(false); 
            } 
        } catch (error) {
            res.status(500).send(false); 
        }
    }
    
}

export const c_pago = new C_pago();