CREATE DATABASE warehouse;

use warehouse;

CREATE TABLE cities(
    cid INT,
    city CHAR(20),
    state CHAR(20),
    PRIMARY KEY(cid)
);

CREATE TABLE warehouses(
    wid INT,
    wname CHAR(30),
    location CHAR(20),
    extra_context JSON,
    cid INT,
    PRIMARY KEY(wid),
    FOREIGN KEY(cid) REFERENCES cities(cid)
);

CREATE TABLE stores(
    sid INT,
    store_name CHAR(20),
    location_city CHAR(20),
    wid INT,
    PRIMARY KEY (sid),
    FOREIGN KEY (wid) REFERENCES warehouses(wid)
);

CREATE TABLE customer(
    cno INT,
    cname CHAR(50),
    address VARCHAR(50),
    c_city CHAR(20),
    PRIMARY KEY (cno)
);

CREATE TABLE orders(
    ono INT,
    odate DATE,
    oquantity INT,
    cno INT,
    PRIMARY KEY (ono),
    FOREIGN KEY (cno) REFERENCES customer(cno)
);

CREATE TABLE items(
    ino INT,
    idescription TEXT,
    iweight DECIMAL(5, 2),
    icost DECIMAL(5, 2),
    PRIMARY KEY (ino)
);

CREATE TABLE items_orders(
    ono INT,
    ino INT,
    FOREIGN KEY (ono) REFERENCES orders(ono),
    FOREIGN KEY (ino) REFERENCES items(ino)
);

CREATE TABLE stores_items(
    sid INT,
    ino INT,
    FOREIGN KEY (sid) REFERENCES stores(sid),
    FOREIGN KEY (ino) REFERENCES items(ino)
);