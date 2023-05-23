/*
	Laboratorio de Análisis y Diseño de Sistemas I 
    Proyecto No. 2
    Grupo No. 7
    Junio, 2021
*/
DROP DATABASE marketplace;
CREATE DATABASE marketplace;

USE marketplace;

CREATE TABLE categoria (
    categoria  INTEGER 		NOT NULL	AUTO_INCREMENT	,
    nombre     VARCHAR(50)	NOT NULL					,
    PRIMARY KEY (categoria)
);

CREATE TABLE producto (
    producto	INTEGER 		NOT NULL	AUTO_INCREMENT	,
    nombre      VARCHAR(50) 	NOT NULL					,
    descripcion	VARCHAR(200) 	NOT NULL					,
    precio      DECIMAL(8, 2) 	NOT NULL					,
    imagen   	VARCHAR(600) 		NOT NULL					,
    existencia 	INTEGER 		NOT NULL					,
    categoria  	INTEGER 		NOT NULL					,
    PRIMARY KEY	(producto)									,
    FOREIGN KEY (categoria) 	REFERENCES categoria (categoria) 	
    ON DELETE CASCADE	
    ON UPDATE CASCADE
);

CREATE TABLE metodo_pago (
    metodo_pago	INTEGER 		AUTO_INCREMENT	,
    nombre  	VARCHAR(50) 	NOT NULL		,
    PRIMARY KEY	(metodo_pago)
);

CREATE TABLE usuario (
    usuario   	INTEGER 		NOT NULL	AUTO_INCREMENT	,
    nombre    	VARCHAR(50) 	NOT NULL					,
    apellido  	VARCHAR(50) 	NOT NULL					,
    dpi       	VARCHAR(13) 	NOT NULL					,
    correo   	VARCHAR(100)	NOT NULL	UNIQUE			,
    contrasenia	VARCHAR(25) 	NOT NULL					,
    direccion 	VARCHAR(100) 	NOT NULL					,
    PRIMARY KEY (usuario)
);

CREATE TABLE carrito (
    producto  INTEGER NOT NULL		,
    usuario   INTEGER NOT NULL		,
    cantidad  INTEGER NOT NULL		,
    PRIMARY KEY (producto, usuario)	,
    FOREIGN KEY (producto)	REFERENCES producto (producto) 	ON DELETE CASCADE ON UPDATE CASCADE	,
    FOREIGN KEY (usuario)	REFERENCES usuario  (usuario)	ON DELETE CASCADE ON UPDATE CASCADE	
);

CREATE TABLE factura (
    factura         INTEGER 		NOT NULL	AUTO_INCREMENT	,
    fecha           DATE 			NOT NULL					,
    nombrefacturar  VARCHAR(100)	NOT NULL					,
    nit             VARCHAR(10) 	NOT NULL					,
    correofacturar  VARCHAR(100) 	NOT NULL					,
    telefono        VARCHAR(25) 	NOT NULL					,
    total           VARCHAR(15) 	NOT NULL					,
    usuario         INTEGER 		NOT NULL					,
    metodo_pago     INTEGER 		NOT NULL					,
    tarjeta         VARCHAR(16)									,
    PRIMARY KEY (factura)										,
    FOREIGN KEY (usuario) 		REFERENCES usuario 		(usuario) 		ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (metodo_pago) 	REFERENCES metodo_pago 	(metodo_pago) 	ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE venta (
    producto  	INTEGER NOT NULL	,
    factura    	INTEGER NOT NULL	,
    cantidad  	INTEGER NOT NULL	,
    PRIMARY KEY (producto, factura)	,
    FOREIGN KEY (factura)	REFERENCES factura	(factura)	ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (producto)	REFERENCES producto	(producto)	ON DELETE CASCADE ON UPDATE CASCADE
);

