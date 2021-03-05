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
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP(),
    updated_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(),
    deleted_at DATETIME default NULL
);

CREATE TABLE products (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
    price DECIMAL UNSIGNED NOT NULL,
    introduction VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    weight_kg smallint UNSIGNED NOT NULL,
    size VARCHAR(255) NOT NULL,
    material VARCHAR(80) NOT NULL,
    category VARCHAR(20) NOT NULL,
    homepage TINYINT UNSIGNED NOT NULL,
    image VARCHAR(255) NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP(),
    updated_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(),
    deleted_at DATETIME default NULL
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
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP(),
    updated_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(),
    deleted_at DATETIME default NULL
);


CREATE TABLE contact (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    is_registered TINYINT UNSIGNED NOT NULL,
    user_id INT UNSIGNED,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP(),
    updated_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(),
    deleted_at DATETIME default NULL
);

CREATE TABLE user_product (    
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNSIGNED,
    product_id INT UNSIGNED,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP(),
    updated_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(),
    deleted_at DATETIME default NULL
);

CREATE TABLE user_rutine (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNSIGNED,
    rutine_id INT UNSIGNED,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP(),
    updated_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(),
    deleted_at DATETIME default NULL
);

CREATE TABLE items (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(20) NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL UNSIGNED NOT NULL,
    quantity tinyint unsigned NOT NULL,
    total DECIMAL UNSIGNED NOT NULL,
    image VARCHAR(255) NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    order_id INT UNSIGNED,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP(),
    updated_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(),
    deleted_at DATETIME default NULL
);

CREATE TABLE orders(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    order_number INT unsigned unique NOT NULL,
    total DECIMAL unsigned ,
    user_id INT UNSIGNED,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP(),
    updated_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(),
    deleted_at DATETIME default NULL
);


ALTER TABLE user_product
ADD FOREIGN KEY (product_id) REFERENCES products(id),
ADD FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE user_rutine
ADD FOREIGN KEY (rutine_id) REFERENCES rutines(id),
ADD FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE items
ADD FOREIGN KEY (user_id) REFERENCES users(id),
ADD FOREIGN KEY (order_id) REFERENCES orders(id);

ALTER TABLE orders
ADD FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE contact 
ADD FOREIGN KEY (user_id) REFERENCES users(id);

INSERT INTO products values (default,"Barra Extensible",1900,"Adaptable al marco de la puerta, ideal para dominadas","Barra de dominadas para marco de puerta extensible hasta 90 cm de ancho. Puede soportar más de 100kg, incluye agarres ergonómicos para ejercitarte con la comodidad y la seguridad necesaria.",3,"63 a 95 cm de ancho","Metal","products",1,"product-barra-extensible.jpg",default,default,default);
INSERT INTO products values (default,"Colchoneta Flex",2000,"Elástica y duradera, perfecta para llevarla a donde quieras","Colchoneta flexible de gran resistencia, ideal para hacer cualquier tipo de ejercicio físico. Su superficie tramada evita que la colchoneta se deslice a la hora de realizar todos los ejercicios.",1,"50 x 100 cm","Goma","products",1,"product-colchoneta.jpg",default,default,default);
INSERT INTO products values (default,"Disco de fundición",3000,"Disco de 20kg con agarre y recubrimiento para barra","Disco de 20kg de acero inoxidable con agarre, ideal para ejercitar los hombros, bíceps, piernas y pecho. Cuenta con un recubrimiento de metal para barras de hasta 10 centímetros de diámetro.",20,"30 centímetros de diámetro","Acero","products",0,"product-disco.jpg",default,default,default);
INSERT INTO products values (default,"Rueda Abdominal",800,"Con doble rueda y mango antideslizante","Ejercita tus abdominales, hombros y brazos con nuestra rueda abdominal con mango antideslizante. Su doble rueda y sus cómodas empuñaduras te permitirán ejercitarte de forma cómoda y segura.",2,"30 centímetros de ancho","PVC","products",0,"product-rueda-abdominales.jpg",default,default,default);
INSERT INTO products values (default,"Mancuernas Hexagonales",7100,"De 25Kg con grip cromado y antideslizante","Par de mancuernas de 25kg, con grip cromado y antideslizante, proporcionando una máxima comodidad a la hora de realizar los ejercicios. Son ideales para rutinas de bíceps, tríceps y pecho.",25,"50 x 10 cm","Caucho","products",1,"product-mancuernas.jpg",default,default,default);
INSERT INTO products values (default,"Bandas Elásticas",1200,"Cinta de entrenamiento de látex resistente y circular","Cinta de látex flexible, resistente y altamente duradera, disponible en distintos colores y tensiones: alta, media y baja. Ideales para realizar ejercicios de elongación y tonificación.",1,"15 x 120 cm","Látex","products",0,"product-bandas-elastica.jpg",default,default,default);
INSERT INTO products values (default,"Tobilleras con cierre",1100,"De 2kg con diseño ergo-métrico anatómico","Par de tobilleras de 2Kg cada una con diseño ergo-métrico anatómico. Rellenas de arena, reforzadas con costura de hilo y confeccionadas en tela plástica. El cierre es de tipo abrojo, lavable.",2,"80 x 60 cm","Bagun y tela de plástico","products",1,"product-tobillera.jpg",default,default,default);
INSERT INTO products values (default,"Mancuerna Rusa",1700,"De 4Kg, recubierta en PVC, agradable al tacto","Mancuerna del tipo Kettlebel de 4kg hecha de acero inoxidable y recubierta en PVC, de fácil agarre y agradable al tacto. Recomendada para ejercitar los hombros, tríceps, piernas y bíceps.",4,"70 x 30 cm","Hierro","products",0,"product-mancuera-rusa.jpg",default,default,default);
INSERT INTO products values (default,"Banda elástica con manijas",1080,"Ultra resistente, confeccionada con látex de primera calidad","De máxima tensión, ideal para realizar ejercicios de tonificación y estiramiento en actividades de Yoga, Pilates y Fitness. Posee puños ergonómicos en los extremos con uniones y costuras reforzadas.",2,"140 x 12 cm","Látex","products",1,"product-banda.jpg",default,default,default);
INSERT INTO products values (default,"Barra Push-up",2100,"Confeccionado en hierro con base y manopla de goma antideslizante","Par de manoplas confeccionadas en hierro en forma de U con goma antideslizante en los agarres y en el apoyo. Es Ideal para el trabajo aeróbico de pectorales y tríceps. Muy fáciles de transportar.",4,"50 x 40 cm","Hierro, goma, plástico","products",0,"product-manopla.jpg",default,default,default);
INSERT INTO products values (default,"Mancuerna con topes",2400,"De acero inoxidable, ideal para ejercitar bíceps y tríceps","Barra de acero inoxidable para discos de 25mm de diámetro como máximo. Puede cargar hasta 80kg de cada lado, es recomendable cargarla con discos hechos de goma. Con topes de metal incluidos.",1,"40cm de ancho y 25mm de diámetro","Acero","products",0,"product-mancuerna-tope.jpg",default,default,default);
INSERT INTO products values (default,"Barra de dominadas",9200,"De acero forjado, soporta hasta 150kg","Barra de acero forjado anti-oxido, puede soportar hasta 150kg de peso. Posee topes de goma antideslizantes y agarres anatómicos de neoprene anti-sudor. Ideal para ejercitarte con tu propio peso.",2,"30 x 93 cm","Acero","products",1,"product-barra.jpg",default,default,default);

INSERT INTO rutines values (default,"Abdominales ",3500,"Obtené abdominales increíbles de forma rápida y sencilla","Marca tus abdominales con esta rutina práctica que incluye más de 20 ejercicios. Dividida en distintos módulos, la rutina permite trabajar todos los abdominales en tan solo 30 minutos",8,"rutines",1,"rutine-abs.jpg",default,default,default);
INSERT INTO rutines values (default,"Potencia",2700,"Aumenta la fuerza, resistencia y velocidad de tus piernas","Ejercita y aumenta tu potencia de forma dinámica y obtené los resultados que siempre deseaste. Los beneficios de entrenar potencia se ven reflejados en una mejor zancada, menos lesiones y mayor velocidad",12,"rutines",0,"rutine-potencia.jpg",default,default,default);
INSERT INTO rutines values (default,"Bíceps ",5100,"Dale volumen y forma a tus bíceps en pocas semanas","Agranda y tonifica tus bíceps con esta rutina dinámica con más de 20 tipos de ejercicios. Los mismos se pueden llevar a cabo con mancuernas, barra o incluso con tu propio peso corporal, dándole volumen y pico a tus músculos",4,"rutines",1,"rutine-biceps.jpg",default,default,default);
INSERT INTO rutines values (default,"Elongación ",2400,"Prevení lesiones y relaja tus músculos luego del ejercicio","Esta es la rutina base que no te puede faltar en tu entrenamiento ya que la elongación ayuda a disminuir el riesgo de lesiones, prevenir inflamaciones y disminuir el dolor después de haber realizado ejercicio",52,"rutines",0,"rutine-elongacion.jpg",default,default,default);
INSERT INTO rutines values (default,"Espalda ",4000,"Ensancha, marca y dale fuerza a todos los músculos de tu espalada","Obtené una espalda ancha, fuerte, y en forma de V, realizando esta rutina que está enfocada en los tres principales y más importantes músculos de la espalda: los trapecios, los romboides, los dorsales",6,"rutines",0,"rutine-espalda.jpg",default,default,default);
INSERT INTO rutines values (default,"Resistencia ",2500,"Mejora tu ritmo cardiaco y tu respiración para llegar más allá","Aumenta tu capacidad aeróbica y mejora tu estado físico con esta rutina de 12 semanas. Además de ejercicios físicos y consejos de especialistas, incluye ejercicios de respiración que son indispensables a la hora del ejercicio",12,"rutines",1,"rutine-resistencia.jpg",default,default,default);
INSERT INTO rutines values (default,"Pecho ",5300,"Infla y tonifica tus pectorales en tan solo 8 semanas","Dale volumen, definición y simetría a tus pectorales, con esta rutina que combina ejercicios multiarticulares y de aislamiento, potenciando y dándole forma a los músculos del pecho",8,"rutines",0,"rutine-pecho.jpg",default,default,default);
INSERT INTO rutines values (default,"Piernas ",3000,"Trabaja una de las partes más importantes del cuerpo","Potencia tus piernas y lleva tu cuerpo hacia el próximo nivel con esta rutina. Las piernas son la base de todo ejercicio, por lo que un buen entrenamiento de las mismas aumenta tu desempeño a la hora del entrenamiento físico",4,"rutines",1,"rutine-piernas.jpg",default,default,default);

INSERT INTO users values (default,"Gonzalo","Zevallos","gonza@gonza.com","$2a$10$SYN5.ZhuQoAfV7VJod28QODfWYh4qVoIEmNgrowSnJSOkzvwB9ME2","default_avatar.jpg",30,default,default,default);
INSERT INTO users values (default,"Joaquin","Di Toma","joaco@joaco.com","$2a$10$SYN5.ZhuQoAfV7VJod28QODfWYh4qVoIEmNgrowSnJSOkzvwB9ME2","1608404004062-1608063707830-1366_2000.jpeg",30,default,default,default);
INSERT INTO users values (default,"Pablo","Bacchetta","pablo@pablo.com","$2a$10$SYN5.ZhuQoAfV7VJod28QODfWYh4qVoIEmNgrowSnJSOkzvwB9ME2","1613953001533-user_image.jpg",30,default,default,default);
INSERT INTO users values (default,"Agustin","Morcillo","agustin@agustin.com","$2a$10$SYN5.ZhuQoAfV7VJod28QODfWYh4qVoIEmNgrowSnJSOkzvwB9ME2","1608404035569-1608063773535-9202af0d723d0b09d5d434eea53f92dd.jpg",30,default,default,default);
INSERT INTO users values (default,"Damian","Mugnolo","damian@damian.com","$2a$10$SYN5.ZhuQoAfV7VJod28QODfWYh4qVoIEmNgrowSnJSOkzvwB9ME2","1608404063362-1608063802795-13615.jpg",30,default,default,default);
INSERT INTO users values (default,"Santiago","Ruiz","santiago@santiago.com","$2a$10$SYN5.ZhuQoAfV7VJod28QODfWYh4qVoIEmNgrowSnJSOkzvwB9ME2","1608404090712-1608063826020-a34557edb440b87588943994469f9aea.jpg",30,default,default,default);
INSERT INTO users values (default,"Pedro","Mancera","pedro@pedro.com","$2a$10$SYN5.ZhuQoAfV7VJod28QODfWYh4qVoIEmNgrowSnJSOkzvwB9ME2","1613953117979-user_image_2.jpg",20,default,default,default);
INSERT INTO users values (default,"Jorge","Zapiola","jorge@jorge.com","$2a$10$SYN5.ZhuQoAfV7VJod28QODfWYh4qVoIEmNgrowSnJSOkzvwB9ME2","1613953158279-user_image_3.jpg",20,default,default,default);
INSERT INTO users values (default,"Federico","Valverde","federico@federico.com","$2a$10$SYN5.ZhuQoAfV7VJod28QODfWYh4qVoIEmNgrowSnJSOkzvwB9ME2","avatar_img.jpg",20,default,default,default);
INSERT INTO users values (default,"Juan","Cabrera","juan@juan.com","$2a$10$SYN5.ZhuQoAfV7VJod28QODfWYh4qVoIEmNgrowSnJSOkzvwB9ME2","1613953216285-user_image_4.jpg",10,default,default,default);
INSERT INTO users values (default,"Lucas","Rojas","lucas@lucas.com","$2a$10$SYN5.ZhuQoAfV7VJod28QODfWYh4qVoIEmNgrowSnJSOkzvwB9ME2","1613953243512-user_image_5.jpg",10,default,default,default);
INSERT INTO users values (default,"Guillermo","Sanchez","guillermo@guillermo.com","$2a$10$SYN5.ZhuQoAfV7VJod28QODfWYh4qVoIEmNgrowSnJSOkzvwB9ME2","avatar_img2.jpeg",10,default,default,default);

INSERT INTO contact values (default,1,1,"gonza@gonza.com","Feedback de la página","Chicos, la página esta muy buena.",default,default,default);
INSERT INTO contact values (default,1,2,"joaco@joaco.com","Opinión sobre la página","Esta bien, aunque tiene cosas para mejorar.",default,default,default);
INSERT INTO contact values (default,1,3,"pablo@pablo.com","Referencias","Hola chicos, les paso un link de donde pueden sacar buenas practicas para mejorar el código.",default,default,default);
INSERT INTO contact values (default,1,4,"agustin@agustin.com","Test","Probando el formulario",default,default,default);
INSERT INTO contact values (default,1,5,"damian@damian.com","Test","Probando el formulario",default,default,default);
INSERT INTO contact values (default,1,6,"santiago@santiago.com","Test","Probando el formulario",default,default,default);
INSERT INTO contact values (default,0,null,"valentin@valentin.com","No register","Hola, no estoy registrado pero me gusta la página",default,default,default);
INSERT INTO contact values (default,0,null,"pilar@pilar.com","No register","Hola, no estoy registrado pero me gusta la página",default,default,default);
INSERT INTO contact values (default,0,null,"juanpedro@juanpedro.com","No register","Hola, no estoy registrado pero me gusta la página",default,default,default);