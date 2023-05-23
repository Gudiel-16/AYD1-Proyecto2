import { Request, Response } from 'express';

import pool from '../database';

class C_producto{

    public async agregarProducto(req:Request,res:Response){

        try {
            const {nombre, descripcion, precio, imagen, existencia, categoria} = req.body;

            let result = await pool.query('SELECT * FROM producto WHERE nombre = ? and categoria = ?',[nombre,categoria]);

            if(result.length>0){
                res.status(500).send('producto existente'); //producto con ese nombre existente (en la misma categoria)
            }else{
                await pool.query('INSERT INTO producto(nombre,descripcion,precio,imagen,existencia,categoria) VALUES(?,?,?,?,?,?)',[nombre,descripcion,precio,imagen,existencia,categoria]);
                res.status(200).send(true);
            }            
        } catch (error) {
            res.status(500).send(false); //da error si los nombres de la estructura json vienen mal escritos, o el tipo de dato que se envia malo
        }

    }

    public async obtenerTodos(req:Request,res:Response){

        try {
            const data = await pool.query(` SELECT 
                                                producto.*,
                                                categoria.nombre as nombre_categoria
                                            FROM 
                                                producto
                                            INNER JOIN categoria ON categoria.categoria = producto.categoria;`);

            if (data.length > 0) {
                let array = [];
                for (const key in data) {
                    array.push({identificador:data[key]["producto"],nombre_producto:data[key]["nombre"],
                                descripcion:data[key]["descripcion"], precio:data[key]["precio"],
                                imagen:data[key]["imagen"]+"", existencia:data[key]["existencia"], categoria:data[key]["categoria"], nombre_categoria:data[key]["nombre_categoria"]});
                }
                res.status(200).json({ productos: array });
            }
            else{
                res.status(200).json({ productos: [] });
            }                
        } catch (error) {
            res.status(500).json('Error');
        }
    }

    public async obtenerUnProducto(req:Request,res:Response){

        try {
            const { idProducto } = req.params;

            const data = await pool.query(`SELECT 
                                                producto.*,
                                                categoria.nombre as nombre_categoria
                                            FROM 
                                                producto
                                            INNER JOIN categoria 	ON categoria.categoria = producto.categoria
                                                                    AND producto.producto = ?;`,[idProducto]);
            if (data.length > 0) {
                let array = [];
                for (const key in data) {
                    array.push({identificador:data[key]["producto"],nombre_producto:data[key]["nombre"],
                                descripcion:data[key]["descripcion"], precio:data[key]["precio"],
                                imagen:data[key]["imagen"]+"", existencia:data[key]["existencia"], categoria:data[key]["categoria"], nombre_categoria:data[key]["nombre_categoria"]});
                }
                res.status(200).json({ productos: array });
            }
            else{
                res.status(200).json({ productos: [] });
            }                
        } catch (error) {
            res.status(500).json('Error');
        }

    }

}

export const c_producto = new C_producto();