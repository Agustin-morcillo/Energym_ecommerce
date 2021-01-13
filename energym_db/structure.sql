CREATE SCHEMA energym;

USE energym;

CREATE TABLE users (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) NOT NULL,
    rol INT NOT NULL DEFAULT 10,
    
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);

CREATE TABLE products (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
    price DECIMAL UNSIGNED NOT NULL,
    introduction VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    weight_KG smallint UNSIGNED NOT NULL,
    size VARCHAR(255) NOT NULL,
    material VARCHAR(80) NOT NULL,
    category VARCHAR(20) NOT NULL,
    homepage TINYINT UNSIGNED NOT NULL,
    image VARCHAR(255) NOT NULL,
    
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);

CREATE TABLE rutines (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
    price DECIMAL UNSIGNED NOT NULL,
    introduction varchar(255) NOT NULL,
    description TEXT NOT NULL,
    duration_weeks TINYINT UNSIGNED NOT NULL, 
    category VARCHAR(20) NOT NULL,
    homepage tinyint unsigned NOT NULL,
    image VARCHAR(255) NOT NULL,
    
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);


CREATE TABLE contact (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    subject VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    user_id INT UNSIGNED,

	created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);

CREATE TABLE user_product (    
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    
    user_id INT UNSIGNED,
    product_id INT UNSIGNED,

	created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);

CREATE TABLE user_rutines (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    
    user_id INT UNSIGNED,
    rutine_id INT UNSIGNED,

	created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);

CREATE TABLE cart_items (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    unit_price DECIMAL unsigned NOT NULL,
    quantity tinyint unsigned NOT NULL,
    subtotal DECIMAL unsigned NOT NULL,
	image VARCHAR(255) NOT NULL,
    status tinyint unsigned NOT NULL,
    user_id INT UNSIGNED,
    order_id INT UNSIGNED,
    product_id INT UNSIGNED,
    rutine_id INT UNSIGNED,

	created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);

CREATE TABLE orders(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    order_number INT unsigned unique NOT NULL,
    total DECIMAL unsigned NOT NULL,
    user_id INT UNSIGNED,

	created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);



ALTER TABLE contact 
ADD FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE user_product
ADD FOREIGN KEY (product_id) REFERENCES products(id),
ADD FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE user_rutines
ADD FOREIGN KEY (rutine_id) REFERENCES rutines(id),
ADD FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE cart_items
ADD FOREIGN KEY (rutine_id) REFERENCES rutines(id),
ADD FOREIGN KEY (user_id) REFERENCES users(id),
ADD FOREIGN KEY (product_id) REFERENCES products(id),
ADD FOREIGN KEY (order_id) REFERENCES orders(id);

ALTER TABLE orders
ADD FOREIGN KEY (user_id) REFERENCES users(id);
