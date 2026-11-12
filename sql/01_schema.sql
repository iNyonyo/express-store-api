DROP TABLE IF EXISTS customers, products, orders, order_items CASCADE;

CREATE TABLE customers (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender VARCHAR(7) NOT NULL,
    date_of_birth DATE NOT NULL,
    email VARCHAR(150) UNIQUE,
    phone VARCHAR(50) UNIQUE
);

CREATE TABLE products (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(50),
    description TEXT,
    price DECIMAL(10,2) NOT NULL CHECK (price > 0),
    quantity INT NOT NULL CHECK (quantity > 0)
);

CREATE TABLE orders (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    order_date TIMESTAMPTZ NOT NULL,
    status VARCHAR(50) NOT NULL CHECK(status IN ('processing', 'shipped', 'delivered', 'cancelled'),
    total_amount DECIMAL(10,2) NOT NULL,
    address VARCHAR(255) NOT NULL,

    FOREIGN KEY (customer_id)
    REFERENCES customers(id)
);


CREATE TABLE order_items (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    product_id BIGINT NOT NULL,
    order_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price > 0),
    total_price DECIMAL(10,2) NOT NULL CHECK (total_price = quantity * unit_price),

    CONSTRAINT fk_product
        FOREIGN KEY (product_id)
        REFERENCES products(id),
    
    CONSTRAINT fk_orders
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
);
