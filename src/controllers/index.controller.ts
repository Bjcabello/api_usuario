import { Request, Response } from 'express';
import { pool } from './../database';
import { QueryResult } from 'pg';
import { parse } from 'dotenv';


export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const response: QueryResult = await pool.query("SELECT * FROM users");
    return res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error interno en el Servidor");
  }
};

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      return res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };
export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const { name, email } = req.body;
    const response: QueryResult = await pool.query('INSERT INTO users(name, email) VALUES($1, $2)', [name, email]);
    return res.json({
        message: 'Usuario creado',
        body: {
            user: { name, email }
        }
    })
};
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id])
    return res.json(`Usuario ${id} actualizado satisfactoriamente`);

};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);

    await pool.query("DELETE FROM users WHERE id = $1", [id]);

    return res.json({ message: `Usuario ${id} eliminado satisfactoriamente` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};


