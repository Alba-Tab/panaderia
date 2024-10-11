CREATE TABLE permiso(
	ide SERIAL PRIMARY KEY ,
	nombre VARCHAR(30) NOT NULL,
	descripcion VARCHAR(60) NOT NULL
);

CREATE TABLE rol(
    	ide VARCHAR (10) NOT NULL PRIMARY KEY ,
    	nombre VARCHAR(30) NOT NULL
);

CREATE TABLE rol_permiso(
ide_rol VARCHAR (10) NOT NULL,
ide_permiso INTEGER NOT NULL,
PRIMARY KEY (ide_rol,ide_permiso),
FOREIGN KEY (ide_rol) REFERENCES rol(ide)
ON UPDATE CASCADE 
ON DELETE CASCADE,
FOREIGN KEY (ide_permiso)references permiso(ide)
ON UPDATE CASCADE
ON DELETE CASCADE 
);

CREATE TABLE usuario (
codigo      VARCHAR     (10) NOT NULL PRIMARY KEY, 
nombre      VARCHAR     (30) NOT NULL,
sexo        CHAR    (1) NOT NULL CHECK (sexo IN ('M', 'F')),
contrasena  VARCHAR (30) NOT NULL,
telefono    VARCHAR (10) NOT NULL,
ide_rol     VARCHAR (10) ,
FOREIGN KEY (ide_rol)references rol(ide)
ON UPDATE CASCADE
ON DELETE CASCADE 
);

CREATE TABLE proveedor  (
codigo      VARCHAR     (10) NOT NULL PRIMARY KEY, 
nombre      VARCHAR     (30) NOT NULL,
sexo        CHAR    (1) NOT NULL CHECK (sexo IN ('M', 'F')),
telefono    VARCHAR (10) NOT NULL,
estado      VARCHAR(15) NOT NULL

);


CREATE TABLE factura_interna(
ide SERIAL PRIMARY KEY,
nombre varchar(30),
ci integer,

total DECIMAL(5,2),
fecha  DATE NOT NULL,
codigo_usuario VARCHAR(10) NOT NULL,
FOREIGN KEY (codigo_usuario) REFERENCES usuario(codigo)
ON UPDATE CASCADE 
ON DELETE CASCADE
);

CREATE TABLE categoria(
ide SERIAL PRIMARY KEY,
nombre VARCHAR(30)NOT NULL,
descripcion VARCHAR(60) NOT NULL
);


CREATE TABLE producto(
    ide SERIAL PRIMARY KEY,
   	nombre VARCHAR(20) NOT NULL,
   	precio DECIMAL (5,2) NOT NULL,
    stock  INTEGER  NOT NULL,
    stock_minimo  INTEGER  NOT NULL,
	ide_categoria INTEGER NOT NULL,
   	FOREIGN KEY (ide_categoria) REFERENCES categoria(ide)
  	ON UPDATE CASCADE 
    	ON DELETE CASCADE
	 
);

CREATE TABLE detalle_factura(
 ide_factura_interna  INTEGER NOT NULL,
 ide_producto         INTEGER NOT NULL,
 cantidad             INTEGER NOT NULL,
 precio               DECIMAL(5,2)  NOT NULL,
 Total                DECIMAL(5,2)  NOT NULL,
 PRIMARY KEY (ide_producto,ide_factura_interna),
 FOREIGN KEY (ide_producto) REFERENCES producto(ide)
 ON UPDATE CASCADE 
 ON DELETE CASCADE,
 FOREIGN KEY (ide_factura_interna)references factura_interna(ide)
 ON UPDATE CASCADE
 ON DELETE CASCADE
);

CREATE TABLE  receta(
ide SERIAL PRIMARY KEY, 
unidades INTEGER NOT NULL ,
tiempo   TIME NOT NULL,
ide_producto INTEGER NOT NULL, 
FOREIGN KEY (ide_producto) REFERENCES producto(ide)
ON UPDATE CASCADE 
ON DELETE CASCADE);

CREATE TABLE insumo(
    	ide SERIAL PRIMARY KEY,
    	nombre VARCHAR(30) NOT NULL,
    	medida           CHAR(2) NOT NULL,
       stock  INTEGER NOT NULL,
   	stock_minimo INTEGER NOT NULL
    	 
);

CREATE TABLE detalle_receta(
 ide_receta INTEGER NOT NULL, 
 ide_insumo INTEGER NOT NULL,
 cantidad   DECIMAL(7,4) NOT NULL,
 medida   char    (2)  NOT NULL,
 PRIMARY KEY (ide_receta,ide_insumo),
 FOREIGN KEY (ide_receta) REFERENCES receta(ide)
 ON UPDATE CASCADE 
 ON DELETE CASCADE,
 FOREIGN KEY (ide_insumo)references insumo(ide)
 ON UPDATE CASCADE
 ON DELETE CASCADE 
);


CREATE TABLE nota_compra(
 ide SERIAL PRIMARY KEY, 
 fecha_pedido DATE NOT NULL ,
 fecha_entrega DATE NOT NULL ,
 codigo_usuario VARCHAR(10) NOT NULL,
 codigo_proveedor VARCHAR(10) NOT NULL,
 	 FOREIGN KEY (codigo_usuario)references usuario(codigo)
 	 ON UPDATE CASCADE
 	 ON DELETE CASCADE,
 	 FOREIGN KEY (codigo_proveedor)references proveedor(codigo)
 	 ON UPDATE CASCADE
 	 ON DELETE CASCADE
);



CREATE TABLE compra_insumo(
  	ide_nota_compra INTEGER NOT NULL,
  	ide_insumo INTEGER NOT NULL,
  	cantidad   INTEGER NOT NULL,
  	unidad_medida CHAR(2),
  	precio     DECIMAL(5,2)   NOT NULL,
  	total      DECIMAL(5,2)   NOT NULL,
  	PRIMARY KEY (ide_nota_compra,ide_insumo),
  	FOREIGN KEY (ide_nota_compra) REFERENCES nota_compra(ide)
  	ON UPDATE CASCADE 
  	ON DELETE CASCADE,
  	FOREIGN KEY (ide_insumo)references insumo(ide)
  	ON UPDATE CASCADE
  	ON DELETE CASCADE  
);

CREATE TABLE compra_producto(
ide_nota_compra INTEGER NOT NULL,
ide_producto INTEGER NOT NULL,
cantidad     INTEGER NOT NULL,
precio       DECIMAL(5,2) NOT NULL,
total        DECIMAL(5,2) NOT NULL,
PRIMARY KEY (ide_nota_compra,ide_producto),
  	FOREIGN KEY (ide_nota_compra) REFERENCES nota_compra(ide)
 	ON UPDATE CASCADE 
  	ON DELETE CASCADE,
  	FOREIGN KEY (ide_producto)references producto(ide)
  	ON UPDATE CASCADE
  	ON DELETE CASCADE 
);

CREATE TABLE produccion(
ide SERIAL PRIMARY KEY,
descripcion VARCHAR(30) NOT NULL,
hora_inicio TIME NOT NULL,
fecha       DATE ,
terminado   BOOLEAN NOT NULL,
ide_receta INTEGER NOT NULL,
FOREIGN KEY (ide_receta)references receta(ide)
ON UPDATE CASCADE
ON DELETE CASCADE 
);

CREATE TABLE participa(
  	codigo_usuario VARCHAR(10) NOT NULL,
 	ide_produccion INTEGER NOT NULL,
  	fecha          DATE    NOT NULL,
  	PRIMARY KEY (codigo_usuario,ide_produccion),
  	FOREIGN KEY (codigo_usuario) REFERENCES usuario(codigo)
  	ON UPDATE CASCADE 
  	ON DELETE CASCADE,
  	FOREIGN KEY (ide_produccion)references produccion(ide)
 	ON UPDATE CASCADE
  	ON DELETE CASCADE
);

CREATE TABLE bitacora (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metodo VARCHAR(10),
    ruta VARCHAR(255),
    ip VARCHAR(45),
    usuario VARCHAR(255),
    mensaje TEXT
);

INSERT INTO categoria (nombre, descripcion) VALUES
('BEBIDAS', 'BEBIDAS A BASE DE AGUA O LECHE'),
('GASEOSAS', 'BEBIDAS GASIFICADAS SERVIDAS FRIAS'),
('AGUA', 'AGUA'),
('EMPANADAS', 'MASA RELLENA'),
('MASITAS', 'MASAS NO RELLENAS'),
('PANES', 'PAN'),
('PRODUCTOS TIPICOS', 'PRODUCTOS TIPICOS DE LA REGION TALES COMO CUÑAPE');


INSERT INTO producto ( nombre, precio, stock, stock_minimo, ide_categoria) VALUES
( 'Sonso', 6, 20, 10, 7),
( 'Empanada de Pollo', 4, 25, 15, 4),
( 'Empanada de queso', 4, 25, 15, 4),
( 'cuñape frito', 4, 50, 5, 7),
( 'Empanada maiz', 3, 25, 15, 4),
( 'Empanada de arroz', 3, 25, 15, 4),
( 'cuñape horno', 3, 70, 60, 7),
( 'Pan casero', 1, 80, 60, 7),
( 'Panes especiales', 2, 40, 30, 6),
( 'Pan frances', 1, 40, 30, 6),
( 'Pan casero integral', 2, 60, 30, 6),
( 'Jugo de guineo', 7, 30, 25, 1),
( 'Jugo de durazno', 7, 30, 25, 1),
( 'Jugo de frutilla', 7, 30, 25, 1),
( 'Soda', 12, 20, 10, 2),
( 'Jugo del valle', 12, 20, 10, 1);

INSERT INTO insumo ( nombre,  medida,stock, stock_minimo) VALUES
( 'Harina de trigo',  'kg',20, 10),
( 'Harina de maiz',  'kg',20, 10),
( 'harina de arroz',  'kg',20, 10),
( 'manteca', 'kg', 15, 5),
( 'Almidon', 'kg', 10, 5),
( 'Azucar', 'kg', 20, 10),
( 'sal', 'kg', 15, 5),
( 'agua', 'lt', 50, 20),
( 'huevo', 'u', 120, 30),
( 'Leche', 'lt', 50, 20),
( 'Mantequilla', 'kg', 15, 5),
( 'Queso', 'kg', 20, 10),
('levadura', 'kg', 10, 5),
( 'Yuca', 'kg', 10, 5),
('Polvo de hornear', 'u', 20, 5);


INSERT INTO receta (unidades, tiempo, ide_producto) VALUES
(25, '02:00', 6),
(25, '02:00', 5),
(50, '04:00', 7),
(20, '01:30', 8),
(20, '03:00', 1);

INSERT INTO detalle_receta (ide_receta, ide_insumo, cantidad, medida) VALUES
(1, 3, 1.0, 'kg'),   -- 1000 gramos = 1 kilogramo
(1, 4, 0.25, 'kg'),  -- 250 gramos = 0.25 kilogramos
(1, 6, 0.1, 'kg'),   -- 100 gramos = 0.1 kilogramos
(1, 7, 0.05, 'kg'),  -- 50 gramos = 0.05 kilogramos
(1, 12, 0.5, 'kg'),   -- 500 gramos = 0.5 kilogramos
(1, 10, 0.25, 'l'),   -- 250 mililitros = 0.25 litros
(2, 2, 1.0, 'kg'),   -- 1000 gramos = 1 kilogramo
(2, 4, 0.25, 'kg'),  -- 250 gramos = 0.25 kilogramos
(2, 6, 0.1, 'kg'),   -- 100 gramos = 0.1 kilogramos
(2, 7, 0.05, 'kg'),  -- 50 gramos = 0.05 kilogramos
(2, 12, 0.5, 'kg'),   -- 500 gramos = 0.5 kilogramos
(2, 10, 0.25, 'l'),   -- 250 mililitros = 0.25 litros
(3, 5, 1.0, 'kg'),   -- 1000 gramos = 1 kilogramo
(3, 11, 0.25, 'kg'),  -- 250 gramos = 0.25 kilogramos
(3, 9, 2, 'u'),
(3, 12, 1.0, 'kg'),   -- 1000 gramos = 1 kilogramo
(3, 6, 0.1, 'kg'),   -- 100 gramos = 0.1 kilogramos
(4, 1, 0.05, 'kg'),  -- 50 gramos = 0.05 kilogramos
(4, 13, 0.04, 'kg'),  -- 40 gramos = 0.04 kilogramos
(4, 6, 0.15, 'kg'),  -- 150 gramos = 0.15 kilogramos
(4, 7, 0.005, 'kg'), -- 5 gramos = 0.005 kilogramos
(4, 4, 0.2, 'kg'),   -- 200 gramos = 0.2 kilogramos
(5, 14, 2.0, 'kg'),   -- 2000 gramos = 2 kilogramos
(5, 12, 1.0, 'kg'),   -- 1000 gramos = 1 kilogramo
(5, 11, 0.25, 'kg'),  -- 250 gramos = 0.25 kilogramos
(5, 7, 0.05, 'kg'),  -- 50 gramos = 0.05 kilogramos
(5, 6, 0.1, 'kg');   -- 100 gramos = 0.1 kilogramos


INSERT INTO rol (ide,nombre) VALUES
('RL01','Administrador'),
('RL02','Empleado');

INSERT INTO permiso (nombre, descripcion) VALUES
('Ver reportes', 'Permite visualizar reportes generales del sistema'),
('Editar datos', 'Permite editar información de usuarios y productos'),
('Eliminar datos', 'Permite eliminar registros del sistema'),
('Crear Nuevos registros', 'Permite añadir nuevos registros a la base de datos'),
('Gestionar compras', 'Permite pedir nuevos productos e insumos');


INSERT INTO rol_permiso (ide_rol, ide_permiso) VALUES
('RL01', 1),
('RL01', 2),
('RL01', 3),
('RL01', 4),
('RL01', 5),
('RL02', 1),
('RL02', 4),
('RL02', 5);

INSERT INTO usuario (codigo, nombre, sexo, contrasena, telefono, ide_rol) VALUES
('US01', 'Añez Moren Ana', 'F', 'ana123', '68643834', 'RL01'),
('US02', 'Balderrama Mendes Jose Manuel', 'M', 'jose456', '60901854','RL01'),
('US03', 'Moreno Garcia Valeria', 'F', 'valeria789', '77311876', 'RL02'),
('US04', 'Peñaloza Zeballos Crishthian', 'M', 'cristhian321', '72666475', 'RL02'),
('US05', 'Puma Menchaca Fabio', 'M', 'fabio654', '61320208', 'RL02'),
('US06', 'Pinto Alba Andrea', 'F', 'Pintame123', '71666743', 'RL02');

INSERT INTO proveedor (codigo, nombre, sexo, telefono, estado) VALUES
('PV01', 'EMANUEL LOPEZ GUTIERREZ', 'M', '78598407', 'Disponible'),
('PV02', 'FLORES QUISPE NATHALY', 'F', '63502731', 'Disponible'),
('PV03', 'BARRIOS MAYORGA CARLOS', 'M', '72667023', 'Disponible'),
('PV04', 'HUARACHI LAYME EVA', 'F', '61182379', 'Disponible');


ALTER SEQUENCE nota_compra_ide_seq RESTART WITH 1;

INSERT INTO nota_compra (fecha_pedido, fecha_entrega, codigo_usuario,codigo_proveedor) VALUES
('2024-03-30', '2024-04-01', 'US01','PV01'),
('2024-03-30', '2024-04-01', 'US01','PV01'),
('2024-04-01', '2024-04-02', 'US02','PV02'),
('2024-04-04', '2024-04-05', 'US02','PV04'),
('2024-05-06', '2024-05-07', 'US01','PV03'),
('2024-05-06', '2024-05-07', 'US02','PV04');

INSERT INTO compra_insumo (ide_nota_compra, ide_insumo, cantidad, unidad_medida, precio, total) VALUES
(1, 1, 15, 'kg', 6, 90),
(1, 2, 15, 'kg', 7, 105),
(1, 4, 4, 'kg', 16, 64),
(1, 6, 3, 'kg', 5, 15),
(4, 12, 4, 'kg', 25, 100),
(4, 10, 5, 'lt', 5, 25),
(4, 11, 3, 'kg', 30, 90),
(5, 11, 15, 'kg', 6, 90),
(5, 12, 15, 'kg', 7, 105),
(5, 14, 4, 'kg', 16, 64),
(5, 13, 3, 'kg', 5, 15);

INSERT INTO compra_producto (ide_nota_compra, ide_producto, cantidad, precio, total) VALUES
(2, 10, 30, 0.5, 15),
(2, 2, 30, 3, 90),
(3, 2, 30, 0.5, 15),
(3, 10, 30, 3, 90),
(6, 15, 10, 10, 100),
(6, 16, 10, 10, 100);

INSERT INTO produccion (descripcion, hora_inicio, fecha, terminado, ide_receta) VALUES
('Producción de Sonso', '08:00:00', NULL, FALSE, 5),
('Producción de Cuñape', '09:00:00', '2024-08-18', TRUE, 3),
('Producción de Empanada Arroz', '13:00:00', NULL, FALSE, 1),
('Producción de Empanada Maíz', '11:00:00', '2024-08-20', TRUE, 2),
('Producción de Pan Casero', '08:00:00', '2024-08-21', TRUE, 4),
('Producción de Sonso', '08:00:00', NULL, FALSE, 5),
('Producción de Empanada Maíz', '11:00:00', NULL, FALSE, 2);

INSERT INTO participa (codigo_usuario, ide_produccion, fecha) VALUES
('US03', 1, '2024-08-17'),
('US04', 2, '2024-08-18'),
('US03', 3, '2024-08-19'),
('US04', 4, '2024-08-21'),
('US03', 5, '2024-08-22');

INSERT INTO factura_interna (nombre, ci, fecha, total, codigo_usuario) VALUES
('elver parada',2848582,'2024-04-01', 294.00, 'US05'),
('alan brito',4522445,'2024-04-02', 114.00, 'US06'),
('fernando ramirez',4124544,'2024-03-04', 184.00, 'US06');

INSERT INTO detalle_factura (ide_factura_interna, ide_producto, cantidad, precio, total) VALUES
(1, 1, 15, 6, 90),
(1, 7, 30, 3, 90),
(1, 6, 20, 3, 60),
(1, 5, 18, 3, 54),
(1, 8, 1, 20, 20),
(2, 12, 10, 7, 70),
(2, 11, 12, 2, 24),
(2, 10, 20, 1, 20),
(3, 1, 10, 6, 60),
(3, 4, 5, 4, 20),
(3, 15, 7, 12, 84),
(3, 8, 1, 20, 20);