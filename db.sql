--for help  \?
--list databases  \l
--create database CREATE DATABASE database_name;
--list all tables \d
 --UPDATE restaurants SET name = 'red lobster', location = 'miami', price_range = 2 where id = 6;



CREATE TABLE products (
  id INT,
  name VARCHAR(50),
  price INT,
  on_sale BOOLEAN
);

CREATE TABLE restaurants (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL check(price_range >= 1 and price_range <= 5)

);

INSERT INTO restaurants (id, name, location, price_range) VALUES (123, 'maccies', 'st. johns', 3);