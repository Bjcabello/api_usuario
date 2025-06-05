CREATE DATABASE db_use;
 
 CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    nombre VACHAR(100),
    email TEXT,
    apellido VARCHAR(100)
 );

 INSERT INTO users(nombre, email, apellido) VALUES('bryan', 'bjcabello@gmail.com', 'cabello')