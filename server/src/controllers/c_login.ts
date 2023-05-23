import { Request, Response } from 'express';

import pool from '../database';

class C_login{
    public async loguear(req:Request,res:Response){
        await pool.query(`  SELECT
                                * 
                            FROM 
                                usuario 
                            WHERE 
                                    correo      = '${req.body.correo}' 
                                AND contrasenia = '${req.body.contrasenia}'`, (err: any, rows: any, fields: any) => {
            if (!err) {
                if(rows.length > 0){
                    res.status(200).send(rows[0]);
                }else{
                    res.status(500).send('false');
                }
            } else {
                res.status(500).send('error');
            }
        });
    }
}

export const c_login = new C_login();