CREATE DATABASE db_candy;
use db_candy;
-- DROP DATABASE db_candy;

CREATE TABLE tbl_user (
	id_user INT auto_increment PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(10) NOT NULL
);

CREATE TABLE tbl_candy (
	id_candy INT auto_increment PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    quantity INT(3) NOT NULL,
    expiration_date DATE NOT NULL,
    active BOOLEAN NOT NULL default TRUE
);

CREATE TABLE tbl_trash_candy (
	id_trash INT auto_increment PRIMARY KEY,
    fk_user INT NOT NULL,
    fk_candy INT NOT NULL,
    date DATE NOT NULL DEFAULT (NOW()),
	CONSTRAINT fk_user_trash
    FOREIGN KEY (fk_user)
    REFERENCES tbl_user(id_user),
	CONSTRAINT fk_candy_trash
    FOREIGN KEY (fk_candy)
    REFERENCES tbl_candy(id_candy)
);

CREATE VIEW vw_trash AS
SELECT
	u.name as name_user,
    c.name as candy,
    t.date as date_trash,
    t.id_trash as id
FROM tbl_trash_candy t
INNER JOIN tbl_candy c
	ON c.id_candy = t.fk_candy
INNER JOIN tbl_user u
	ON u.id_user = t.fk_user;
    
INSERT INTO tbl_user (name, email, password) VALUES (
	"Matheus Pereira", "matheusP29@gmail.com", "Mp2901"
);

INSERT INTO tbl_candy (name, quantity, expiration_date) VALUES 
	("Cocada", 7, "2026-11-19"), 
	("Brigadeiro", 4, "2027-09-01"), 
	("Bolo de laranja", 1, "2026-05-12");
    
    

	