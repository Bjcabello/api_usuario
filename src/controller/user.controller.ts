import { Request, Response } from "express";
import { pool } from "../database/db";
import { QueryResult } from "pg";


export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const response: QueryResult = await pool.query("SELECT * FROM users");
    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Usuario no encontrado" });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { nombre, email, apellido, edad} = req.body;
    await pool.query("INSERT INTO users(nombre, email, apellido, edad) VALUES($1, $2, $3, $4)", [
      nombre,
      email,
      apellido,
      edad
    ]);
    res.status(201).json({
      message: "Usuario creado",
      body: {
        user: { nombre, email, apellido, edad },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const { nombre, email, apellido, edad } = req.body;
    await pool.query(
      "UPDATE users SET nombre = $1, email = $2, apellido = $3, edad=$4 WHERE id = $5",
      [nombre, email, apellido, edad, id]
    );
    res.json({ message: `Usuario ${id} actualizado satisfactoriamente` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.json({ message: `Usuario ${id} eliminado satisfactoriamente` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};
  
      