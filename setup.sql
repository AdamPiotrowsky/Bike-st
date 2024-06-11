CREATE DATABASE bike_store;

\c bike_store;

CREATE TABLE bikes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    mark VARCHAR(100),
    color VARCHAR(50),
    price NUMERIC(10, 2),
    type VARCHAR(50),
    quality VARCHAR(100)
);

CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    bike_id INTEGER REFERENCES bikes(id)
);
