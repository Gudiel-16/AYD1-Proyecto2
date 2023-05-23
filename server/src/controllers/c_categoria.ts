import { Request, Response } from 'express';

import pool from '../database';

class C_categoria{

    public async obtenerProductos(req:Request,res:Response){

        try {
            const { idCategoria } = req.params;

            let result = await pool.query('SELECT * FROM categoria WHERE categoria = ?',[idCategoria]);

            if(result.length>0){

                const data = await pool.query(`SELECT
                                                producto.producto, producto.nombre, producto.descripcion, producto.precio, producto.imagen,producto.existencia, producto.categoria
                                            FROM 
                                                producto 
                                            INNER JOIN categoria ON categoria.categoria = producto.categoria 
                                            AND categoria.categoria = ?`,[idCategoria]);

                if (data.length > 0) {
                    let array = [];
                    for (const key in data) {
                        array.push({identificador:data[key]["producto"],nombre_producto:data[key]["nombre"],
                                    descripcion:data[key]["descripcion"], precio:data[key]["precio"],
                                    imagen:data[key]["imagen"]+"", existencia:data[key]["existencia"], categoria:data[key]["categoria"]});
                    }
                    res.status(200).json({ productos: array });
                }
                else{
                    res.status(200).json({ productos: [] });
                }  

            }else{
                res.status(500).send('no existe categoria');
            }
              
        } catch (error) {
            res.status(500).json('Error');
        }
    }
    
    public async categorias(req:Request,res:Response){
        await pool.query(`  SELECT
                                * 
                            FROM 
                                categoria`, (err: any, rows: any, fields: any) => {
            if (!err) {
                res.status(200).send({categorias: rows});
            } else {
                res.status(500).send('error');
            }
        });
    }

}

export const c_categoria = new C_categoria();