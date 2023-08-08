CREATE DATABASE cinderella;
\c cinderella;

CREATE EXTENSION pgcrypto ;


-- Type: group

-- DROP TYPE IF EXISTS "group";

CREATE TYPE "group" AS ENUM
    ('Men', 'Women', 'Kids', 'Accessories');

ALTER TYPE "group"  OWNER TO postgres;


-- Type: "status"

-- DROP TYPE IF EXISTS "status";

CREATE TYPE "status" AS ENUM ('Active', 'Inactive');

ALTER TYPE "status"    OWNER TO postgres;



-- Table: clt_users

-- DROP TABLE IF EXISTS clt_users;

CREATE TABLE IF NOT EXISTS clt_users
(
    id integer NOT NULL,
    email VARCHAR(50) COLLATE pg_catalog."default" NOT NULL UNIQUE,
    password VARCHAR(50) COLLATE pg_catalog."default" NOT NULL,
    token VARCHAR(50) COLLATE pg_catalog."default",
    state "status" NOT NULL,
    CONSTRAINT clt_users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS clt_users
    OWNER to postgres;

-- SEQUENCE: clt_users_id_seq

-- DROP SEQUENCE IF EXISTS clt_users_id_seq;

CREATE SEQUENCE IF NOT EXISTS clt_users_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE clt_users_id_seq
    OWNER TO postgres;

ALTER TABLE IF EXISTS clt_users
    ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 );







-- Table: clt_brands

-- DROP TABLE IF EXISTS clt_brands;

CREATE TABLE IF NOT EXISTS clt_brands
(
    id integer NOT NULL,
    name VARCHAR(50) COLLATE pg_catalog."default" NOT NULL,
    state "status" NOT NULL,
    CONSTRAINT clt_brands_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS clt_brands
    OWNER to postgres;


-- SEQUENCE: clt_brands_id_seq

-- DROP SEQUENCE IF EXISTS clt_brands_id_seq;

CREATE SEQUENCE IF NOT EXISTS clt_brands_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE clt_brands_id_seq
    OWNER TO postgres;

ALTER TABLE IF EXISTS clt_brands
    ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 );





-- Table: clt_customers

-- DROP TABLE IF EXISTS clt_customers;

CREATE TABLE IF NOT EXISTS clt_customers
(
    id integer NOT NULL,
    user_id integer NOT NULL,
    firstname VARCHAR(50) COLLATE pg_catalog."default" NOT NULL,
    surname VARCHAR(50) COLLATE pg_catalog."default",
    phone numeric NOT NULL,
    CONSTRAINT clt_customers_pkey PRIMARY KEY (id),
    CONSTRAINT clt_constr_users_id FOREIGN KEY (user_id)
        REFERENCES clt_users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS clt_customers
    OWNER to postgres;       



-- SEQUENCE: clt_customers_id_seq

-- DROP SEQUENCE IF EXISTS clt_customers_id_seq;

CREATE SEQUENCE IF NOT EXISTS clt_customers_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE clt_customers_id_seq
    OWNER TO postgres;

ALTER TABLE IF EXISTS clt_customers
    ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 );




-- Table: clt_products

-- DROP TABLE IF EXISTS clt_products;

CREATE TABLE IF NOT EXISTS clt_products
(
    id integer NOT NULL,
    brand_id integer NOT NULL,
    model VARCHAR(50) COLLATE pg_catalog."default" NOT NULL,
    type "group",
    state "status" NOT NULL,
    CONSTRAINT clt_products_pkey PRIMARY KEY (id),
    CONSTRAINT constr_brand_id FOREIGN KEY (brand_id)
        REFERENCES clt_brands (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS clt_products
    OWNER to postgres;




-- SEQUENCE: clt_products_id_seq

-- DROP SEQUENCE IF EXISTS clt_products_id_seq;

CREATE SEQUENCE IF NOT EXISTS clt_products_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE clt_products_id_seq
    OWNER TO postgres;

ALTER TABLE IF EXISTS clt_products
    ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 );




-- Table: clt_addresses

-- DROP TABLE IF EXISTS clt_addresses;

CREATE TABLE IF NOT EXISTS clt_addresses
(
    id integer NOT NULL,
    user_id integer NOT NULL,
    address VARCHAR(100) COLLATE pg_catalog."default",
    postcode VARCHAR(50) COLLATE pg_catalog."default" NOT NULL,
    isdefault boolean NOT NULL,
    state "status" NOT NULL,
    CONSTRAINT clt_addresses_pkey PRIMARY KEY (id),
    CONSTRAINT constr_address_id FOREIGN KEY (user_id)
        REFERENCES clt_users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS clt_addresses
    OWNER to postgres;




-- SEQUENCE: clt_addresses_id_seq

-- DROP SEQUENCE IF EXISTS clt_addresses_id_seq;

CREATE SEQUENCE IF NOT EXISTS clt_addresses_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE clt_addresses_id_seq
    OWNER TO postgres;

ALTER TABLE IF EXISTS clt_addresses
    ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 );





-- Table: clt_orders

-- DROP TABLE IF EXISTS clt_orders;

CREATE TABLE IF NOT EXISTS clt_orders
(
    id integer NOT NULL,
    customer_id integer NOT NULL,
    date date NOT NULL DEFAULT now(),
    state "status" NOT NULL,
    address_id integer NOT NULL,
    CONSTRAINT clt_orders_pkey PRIMARY KEY (id),
    CONSTRAINT constr_address_id FOREIGN KEY (address_id)
        REFERENCES clt_addresses (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT constr_customer_id FOREIGN KEY (customer_id)
        REFERENCES clt_customers (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS clt_orders
    OWNER to postgres;




-- SEQUENCE: clt_orders_id_seq

-- DROP SEQUENCE IF EXISTS clt_orders_id_seq;

CREATE SEQUENCE IF NOT EXISTS clt_orders_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE clt_orders_id_seq
    OWNER TO postgres;

ALTER TABLE IF EXISTS clt_orders
    ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 );





-- Table: clt_stock

-- DROP TABLE IF EXISTS clt_stock;

CREATE TABLE IF NOT EXISTS clt_stock
(
    id integer NOT NULL,
    product_id integer NOT NULL,
    qty integer,
    size integer,
    state "status" NOT NULL,
    CONSTRAINT clt_stock_pkey PRIMARY KEY (id),
    CONSTRAINT constr_product_id FOREIGN KEY (product_id)
        REFERENCES clt_products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS clt_stock
    OWNER to postgres;





-- SEQUENCE: clt_stock_id_seq

-- DROP SEQUENCE IF EXISTS clt_stock_id_seq;

CREATE SEQUENCE IF NOT EXISTS clt_stock_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE clt_stock_id_seq
    OWNER TO postgres;

ALTER TABLE IF EXISTS clt_stock
    ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 );





-- Table: clt_prices

-- DROP TABLE IF EXISTS clt_prices;

CREATE TABLE IF NOT EXISTS clt_prices
(
    id integer NOT NULL,
    product_id integer NOT NULL,
    price numeric NOT NULL,
    range date NOT NULL,
    CONSTRAINT clt_prices_pkey PRIMARY KEY (id),
    CONSTRAINT constr_product_id FOREIGN KEY (product_id)
        REFERENCES clt_products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS clt_prices
    OWNER to postgres;




-- SEQUENCE: clt_prices_id_seq

-- DROP SEQUENCE IF EXISTS clt_prices_id_seq;

CREATE SEQUENCE IF NOT EXISTS clt_prices_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE clt_prices_id_seq
    OWNER TO postgres;

ALTER TABLE IF EXISTS clt_prices
    ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 );






-- Table: clt_order_items

-- DROP TABLE IF EXISTS clt_order_items;

CREATE TABLE IF NOT EXISTS clt_order_items
(
    id integer NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    qty integer NOT NULL,
    price numeric NOT NULL,
    state "status" NOT NULL,
    CONSTRAINT clt_order_items_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS clt_order_items
    OWNER to postgres; 







-- SEQUENCE: clt_order_items_id_seq

-- DROP SEQUENCE IF EXISTS clt_order_items_id_seq;

CREATE SEQUENCE IF NOT EXISTS clt_order_items_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE clt_order_items_id_seq
    OWNER TO postgres;

ALTER TABLE IF EXISTS clt_order_items
    ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 );



CREATE OR REPLACE PROCEDURE cltp_create_customer(
    _firstname VARCHAR(50),
    _surname VARCHAR(50),
    _email VARCHAR(50),
    _pass VARCHAR(50),
    _phone numeric,
    _address VARCHAR(100),
    _postcode VARCHAR(50),
    OUT _id integer
)
LANGUAGE 'plpgsql'
AS $$

BEGIN
    INSERT INTO clt_users(email, password, state) values (_email, (SELECT crypt(_pass, gen_salt('md5'))), 'Active') RETURNING id INTO _id;
    COMMIT;
    INSERT INTO clt_customers(user_id, firstname, surname, phone) values (_id, _firstname, _surname, _phone) RETURNING user_id INTO _id;
    COMMIT;
    INSERT INTO clt_addresses(user_id, address, postcode, isdefault, state) values (_id, _address, _postcode, true, 'Active') RETURNING user_id INTO _id;
    COMMIT;
END;
$$;


CREATE OR REPLACE PROCEDURE cltp_create_customer_address(
    _user_id integer,
    _address VARCHAR(100),
    _postcode VARCHAR(50),
    OUT _id integer
)
LANGUAGE 'plpgsql'
AS $$

BEGIN
    INSERT INTO clt_addresses(user_id, address, postcode, isdefault, state) values (_user_id, _address, _postcode, true, 'Active') RETURNING id INTO _id;
    COMMIT;
END;
$$;

CREATE OR REPLACE PROCEDURE cltp_create_brand(
    _name VARCHAR(50),
    OUT _id integer
)
LANGUAGE 'plpgsql'
AS $$

BEGIN
    INSERT INTO clt_brands(name, state) values (_name, 'Active') RETURNING id INTO _id;
    COMMIT;
END;
$$;

CREATE OR REPLACE PROCEDURE cltp_create_order(
    _customer_id integer,
    _address_id integer,
    OUT _id integer
)
LANGUAGE 'plpgsql'
AS $$

BEGIN
    INSERT INTO clt_orders(customer_id, state, address_id) values (_customer_id,  'Active', _address_id) RETURNING id INTO _id;
    COMMIT;
END;
$$;

CREATE OR REPLACE PROCEDURE cltp_create_order_item(
    _order_id integer,
    _product_id integer,
    _qty integer,
    OUT _id integer
)
LANGUAGE 'plpgsql'
AS $$

BEGIN
    INSERT INTO clt_order_items(order_id, product_id, qty, price, state) values (_order_id, _product_id, _qty, (SELECT price FROM clt_prices WHERE product_id = _product_id and range > now()), 'Active') RETURNING id INTO _id;
    COMMIT;
END;
$$;


CREATE OR REPLACE PROCEDURE cltp_create_price(
    _product_id integer,
    _price numeric,
    _range date,
    OUT _id integer
)
LANGUAGE 'plpgsql'
AS $$

BEGIN
    INSERT INTO clt_prices(product_id, price, range) values (_product_id, _price, _range) RETURNING id INTO _id;
    COMMIT;
END;
$$;

CREATE OR REPLACE PROCEDURE cltp_create_products(
    _brand_id integer,
    _model VARCHAR(50),
    _type "group",
    OUT _id integer
)
LANGUAGE 'plpgsql'
AS $$

BEGIN
    INSERT INTO clt_products(brand_id, model, type, state) values (_brand_id, _model, _type, 'Active') RETURNING id INTO _id;
    COMMIT;
END;
$$;

CREATE OR REPLACE PROCEDURE cltp_create_stock(
    _product_id integer,
    _qty integer,
    _size integer,
    OUT _id integer
)
LANGUAGE 'plpgsql'
AS $$

BEGIN
    INSERT INTO clt_stock(product_id, qty, size, state) values (_product_id, _qty, _size, 'Active') RETURNING id INTO _id;
    COMMIT;
END;
$$;





CREATE OR REPLACE PROCEDURE cltp_delete(
    _id integer,
    _table VARCHAR(20),
    OUT _res VARCHAR(10)
)
LANGUAGE 'plpgsql'
AS $$

BEGIN
    CASE _table
        WHEN '/api/user' THEN
            UPDATE clt_users SET state = 'Inactive' WHERE id = _id RETURNING 'OK' INTO _res;
        WHEN 'address' THEN
            UPDATE clt_addresses SET state = 'Inactive' WHERE id = _id RETURNING 'OK' INTO _res;
        WHEN 'brands' THEN
            UPDATE clt_brands SET state = 'Inactive' WHERE id = _id RETURNING 'OK' INTO _res;
        WHEN 'order_item' THEN
            UPDATE clt_order_items SET state = 'Inactive' WHERE id = _id RETURNING 'OK' INTO _res;
        WHEN 'order' THEN
            UPDATE clt_orders SET state = 'Inactive' WHERE id = _id RETURNING 'OK' INTO _res;
        WHEN 'product' THEN
            UPDATE clt_products SET state = 'Inactive' WHERE id = _id RETURNING 'OK' INTO _res;
        WHEN 'stock' THEN
            UPDATE clt_stock SET state = 'Inactive' WHERE id = _id RETURNING 'OK' INTO _res;
    END CASE;
    COMMIT;
END;
$$;



CREATE OR REPLACE PROCEDURE cltp_update_user(
    _id integer,
    _pass VARCHAR(50),
    _token VARCHAR(50),
    _state "status",
    OUT _res VARCHAR(10)
)
LANGUAGE 'plpgsql'
AS $$

BEGIN
    UPDATE clt_users SET password = _pass, token = _token, state = _state WHERE id = _id RETURNING 'OK' INTO _res;
    COMMIT;
END;
$$;


CREATE OR REPLACE PROCEDURE cltp_update_customer(
    _id integer,
    _pass VARCHAR(50),
    _token VARCHAR(50),
    _state "status",
    _firstname VARCHAR(50),
    _surname VARCHAR(50),
    _phone numeric,
    OUT _res VARCHAR(10)
)
LANGUAGE 'plpgsql'
AS $$

BEGIN
    UPDATE clt_users SET password = (SELECT crypt(_pass, gen_salt('md5'))), token = _token, state = _state WHERE id = _id RETURNING 'OK' INTO _res;
    UPDATE clt_customers SET firstname = _firstname, surname = _surname, phone = _phone WHERE user_id = _id RETURNING 'OK' INTO _res;
    COMMIT;
END;
$$;

CREATE OR REPLACE PROCEDURE cltp_update_address(
    _id integer,
    _user_id integer,
    _address VARCHAR(100),
    _postcode VARCHAR(50),
    _state "status",
    _isdefault boolean,
    OUT _res VARCHAR(10)
)
LANGUAGE 'plpgsql'
AS $$

BEGIN
    UPDATE clt_addresses SET address = _address, postcode = _postcode, state = _state, isdefault = _isdefault WHERE id = _id RETURNING 'OK' INTO _res;
    COMMIT;
END;
$$;


CREATE OR REPLACE PROCEDURE cltp_update_brand(
    _id integer,
    _name VARCHAR(50),
    _state "status",
    OUT _res VARCHAR(10)
)
LANGUAGE 'plpgsql'
AS $$

BEGIN
    UPDATE clt_brands SET name = _name, state = _state WHERE id = _id RETURNING 'OK' INTO _res;
    COMMIT;
END;
$$;


CREATE OR REPLACE PROCEDURE cltp_update_order_item(
    _id integer,
    _order_id integer,
    _qty integer,
    _state "status",
    OUT _res VARCHAR(10)
)
LANGUAGE 'plpgsql'
AS $$

BEGIN
    UPDATE clt_order_items SET qty = _qty, state = _state WHERE id = _id and order_id = _order_id RETURNING 'OK' INTO _res;
    COMMIT;
END;
$$;


CREATE OR REPLACE PROCEDURE cltp_update_order(
    _id integer,
    _customer_id integer,
    _address_id integer,
    _state "status",
    OUT _res VARCHAR(10)
)
LANGUAGE 'plpgsql'
AS $$

BEGIN
    UPDATE clt_orders SET address_id = _address_id, state = _state WHERE id = _id and customer_id = _customer_id RETURNING 'OK' INTO _res;
    COMMIT;
END;
$$;

CREATE OR REPLACE PROCEDURE cltp_update_price(
    _id integer,
    _product_id integer,
    _price numeric,
    _range date,
    OUT _res VARCHAR(10)
)
LANGUAGE 'plpgsql'
AS $$

BEGIN
    UPDATE clt_prices SET price = _price, range = _range WHERE id = _id and product_id = _product_id RETURNING 'OK' INTO _res;
    COMMIT;
END;
$$;

CREATE OR REPLACE PROCEDURE cltp_update_product(
    _id integer,
    _model VARCHAR(50),
    _type "group",
    _state "status",
    OUT _res VARCHAR(10)
)
LANGUAGE 'plpgsql'
AS $$

BEGIN
    UPDATE clt_products SET model = _model, type = _type, state = _state WHERE id = _id RETURNING 'OK' INTO _res;
    COMMIT;
END;
$$;

CREATE OR REPLACE PROCEDURE cltp_update_stock(
    _id integer,
    _product_id integer,
    _qty integer,
    _size integer,
    _state "status",
    OUT _res VARCHAR(10)
)
LANGUAGE 'plpgsql'
AS $$

BEGIN
    UPDATE clt_stock SET product_id = _product_id, qty = _qty, size = _size, state = _state WHERE id = _id RETURNING 'OK' INTO _res;
    COMMIT;
END;
$$;


CREATE OR REPLACE PROCEDURE cltp_login(
    _email VARCHAR(50),
    _pass VARCHAR(50),
    OUT _is_correct boolean
)
LANGUAGE 'plpgsql'
AS $$

BEGIN
    SELECT (password = crypt(_pass, password)) INTO _is_correct from clt_users WHERE email = _email;
END;
$$;

CREATE OR REPLACE PROCEDURE cltp_show_customer(
    _id integer,
    OUT _firstname VARCHAR(50),
    OUT _surname VARCHAR(50),
    OUT _phone numeric,
    OUT _email VARCHAR(50),
    OUT _state "status"
)
LANGUAGE 'plpgsql'
AS $$

BEGIN
    SELECT c.firstname, c.surname, c.phone, u.email, u.state INTO _firstname, _surname, _phone, _email, _state FROM clt_customers c, clt_users u WHERE u.id = c.user_id;
END;
$$;

CREATE OR REPLACE PROCEDURE cltp_show_address(
    _id integer,
    _user_id integer,
    OUT _address VARCHAR(100),
    OUT _postcode VARCHAR(50),
    OUT _isdefault boolean,
    OUT _state "status"
)
LANGUAGE 'plpgsql'
AS $$

BEGIN
    SELECT address, postcode, isdefault, state INTO _address, _postcode, _isdefault, _state FROM clt_customers c, clt_users u WHERE u.id = c.user_id;
END;
$$;

/*
CALL cltp_create_customer('Everton','Fraga', 'everton_ferpas@hotmail.com','123456', 07312415513, 0);

CALL cltp_create_customer_address(1, '7 Shaftsbury ave', 'L33 1ZR', 0);

CALL cltp_create_brand('Nike', 0);

CALL cltp_create_products( 1, 'Air Jordan', 'Men', 0);

CALL cltp_create_stock( 1, 20, 11 ,0);

CALL cltp_create_price( 1, 9.98, '2023/08/30',0);

CALL cltp_create_order( 1,  1 ,0);

CALL cltp_create_order_item( 1, 1, 7, 0);

CALL cltp_delete(1, 'order_item', 0);



CALL cltp_show_customer(1,null,null,null,null,null);
*/

