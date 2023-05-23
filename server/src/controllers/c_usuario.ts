import { Request, Response } from 'express';

import pool from '../database';

class C_usuario{

    public async reset(req:Request,res:Response){
        let resetUsuario = await pool.query(`DELETE FROM usuario WHERE correo = 'nuevo@ejemplo.com'`);
        let resetCarrito = await pool.query(`DELETE FROM carrito WHERE usuario = 1`);
        res.status(200).send('true');
    }

    public async registrar(req:Request,res:Response){

        try {
            const {correo} = req.body;
            let result = await pool.query('SELECT * FROM usuario WHERE correo = ?',[correo]);

            if(result.length>0){
                res.status(500).send(false); //usuario con ese correo existente
            }else{
                await pool.query('INSERT INTO usuario set ?',[req.body]);
                res.status(200).send(true);
            }
        } catch (error) {
            res.status(500).send(false); //da error si los nombres de la estructura json vienen mal escritos, ej que venga "correoo"
        }

    }
}

export const c_usuario = new C_usuario();