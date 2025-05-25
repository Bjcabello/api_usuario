CREATE DATABASE Api;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email TEXT
);

INSERT INTO users(name, email) VALUES('Genesis', 'genesisv@gmail.com'),
('Leidy', 'leidyc@gmail.com');