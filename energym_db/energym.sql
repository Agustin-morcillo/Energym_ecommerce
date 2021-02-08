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

INSERT INTO products values (default,"Barra Extensible",1900,"Adaptable al marco de la puerta, ideal para dominadas","Barra de dominadas para marco de puerta extensible hasta 90 centímetros de ancho. Puede soportar más de 100kg de carga, los agarres ergonómicos de neoprene y los topes de goma antideslizante permiten que te ejercites con la comodidad y la seguridad necesaria",3,"63 a 95 cm de ancho","Metal","products",0,"product-barra-extensible.jpg",default,default,default);
INSERT INTO products values (default,"Colchoneta Flex",2000,"Elástica y duradera, perfecta para llevarla a donde quieras","Colchoneta flexible de gran resistencia, ideal para hacer cualquier tipo de ejercicio físico como: abdominales, espinales, puente, entre otros. Su superficie tramada evita que la colchoneta se deslice a la hora de hacer los ejercicios",1,"50 x 100 cm","Goma","products",1,"product-colchoneta.jpg",default,default,default);
INSERT INTO products values (default,"Disco de fundición",3000,"Disco de 20kg con agarre y recubrimiento para barra","Disco de 20kg de acero inoxidable con agarre para realizar toda clase de ejercicios. También cuenta con un recubrimiento de metal para barras de hasta 10 centímetros de diámetro",20,"30 centímetros de diámetro","Acero","products",0,"product-disco.jpg",default,default,default);
INSERT INTO products values (default,"Rueda Abdominal",800,"Con doble rueda y mango antideslizante","Ejercita tus abdominales, muslos, hombros y brazos con nuestra rueda abdominal con mango antideslizante. Su doble rueda y sus cómodas empuñaduras te permitirán ejercitarte de forma cómoda y segura",2,"30 centímetros de ancho","PVC","products",0,"product-rueda-abdominales.jpg",default,default,default);
INSERT INTO products values (default,"Mancuernas Hexagonales",6000,"De 25Kg con grip cromado y antideslizante","Par de mancuernas de 25kg cada una. Cuenta con un grip cromado y antideslizante, proporcionando una máxima comodidad a la hora de hacer los ejercicios. Son ideales para rutinas de musculación, funcional y crossfit",25,"50 x 10 cm","Caucho","products",1,"product-mancuernas.jpg",default,default,default);
INSERT INTO products values (default,"Bandas Elásticas",800,"Cinta de entrenamiento de látex resistente y circular","Cinta de látex flexible, resistente y altamente duradera, disponible en distintos colores y tensiones: alta, media y baja. Ideales para realizar ejercicios de coordinación, musculación o tonificación",1,"15 x 120 cm","Látex","products",0,"product-bandas-elastica.jpg",default,default,default);
INSERT INTO products values (default,"Tobilleras con cierre",1400,"De 2kg con diseño ergo-métrico anatómico","Par de tobilleras de 2Kg cada una con diseño ergo-métrico anatómico. Rellenas de arena, reforzadas con costura de hilo y confeccionadas en tela plástica. El cierre es de tipo abrojo, lavable",2,"80 x 60 cm","Bagun y tela de plástico","products",1,"product-tobillera.jpg",default,default,default);
INSERT INTO products values (default,"Mancuerna Rusa",1700,"De 4Kg, recubierta en PVC, agradable al tacto","Mancuerna del tipo Kettlebel, recubierta en PVC, agradable al tacto, no marca ni mancha el piso. Hecho de material inoxidable",4,"70 x 30 cm","Hierro","products",0,"product-mancuera-rusa.jpg",default,default,default);
INSERT INTO products values (default,"Banda elástica con manijas",1500,"Ultra resistente, confeccionada con látex de primera calidad","De máxima tensión, ideal para estiramiento, fortalecimiento, tonificación, rehabilitación en actividades de Yoga, Pilates y Fitness. Posee puños ergonómicos en los extremos con uniones y costuras reforzadas",2,"140 x 12 cm","Látex","products",1,"product-banda.jpg",default,default,default);
INSERT INTO products values (default,"Barra Push-up",2400,"Confeccionado en hierro con base y manopla de goma antideslizante","Par de manoplas confeccionadas en hierro en forma de U con goma antideslizante en los agarres y en el apoyo. Es Ideal para el trabajo aeróbico de pectorales y tríceps",4,"50 x 40 cm","Hierro, goma, plástico","products",0,"product-manopla.jpg",default,default,default);
INSERT INTO products values (default,"Mancuerna con topes",3000,"De acero inoxidable, ideal para ejercitar bíceps y tríceps","Barra hueca de acero inoxidable para discos de 25mm de diámetro como máximo. Puede ser cargada hasta 80kg en total. Incluye topes de metal",1,"40cm de ancho y 25mm de diámetro","Acero","products",1,"product-mancuerna-tope.jpg",default,default,default);
INSERT INTO products values (default,"Barra de dominadas",3100,"De acero forjado, soporta hasta 150kg","Barra de acero forjado muy resistente y anti-oxido, soporta hasta 150kg de peso. Posee topes de goma antideslizantes y Agarres anatómicos de neoprene anti-sudor. Ideal para ejercitar Biceps, Tricecps, Pectorales, Dorsales, Abdominales",2,"30 x 93 cm","Acero","products",1,"product-barra.jpg",default,default,default);

INSERT INTO rutines values (default,"Abdominales ",3000,"Obtené abdominales increíbles de forma rápida y sencilla","Marca tus abdominales con esta rutina práctica que incluye más de 20 ejercicios. Dividida en distintos módulos, la rutina permite trabajar todos los abdominales en tan solo 30 minutos",8,"rutines",1,"rutine-abs.jpg",default,default,default);
INSERT INTO rutines values (default,"Potencia",2500,"Aumenta la fuerza, resistencia y velocidad de tus piernas","Ejercita y aumenta tu potencia de forma dinámica y obtené los resultados que siempre deseaste. Los beneficios de entrenar potencia se ven reflejados en una mejor zancada, menos lesiones y mayor velocidad",12,"rutines",0,"rutine-potencia.jpg",default,default,default);
INSERT INTO rutines values (default,"Bíceps ",4000,"Dale volumen y forma a tus bíceps en pocas semanas","Agranda y tonifica tus bíceps con esta rutina dinámica con más de 20 tipos de ejercicios. Los mismos se pueden llevar a cabo con mancuernas, barra o incluso con tu propio peso corporal, dándole volumen y pico a tus músculos",4,"rutines",1,"rutine-biceps.jpg",default,default,default);
INSERT INTO rutines values (default,"Elongación ",2000,"Prevení lesiones y relaja tus músculos luego del ejercicio","Esta es la rutina base que no te puede faltar en tu entrenamiento ya que la elongación ayuda a disminuir el riesgo de lesiones, prevenir inflamaciones y disminuir el dolor después de haber realizado ejercicio",52,"rutines",0,"rutine-elongacion.jpg",default,default,default);
INSERT INTO rutines values (default,"Espalda ",3000,"Ensancha, marca y dale fuerza a todos los músculos de tu espalada","Obtené una espalda ancha, fuerte, y en forma de V, realizando esta rutina que está enfocada en los tres principales y más importantes músculos de la espalda: los trapecios, los romboides, los dorsales",6,"rutines",0,"rutine-espalda.jpg",default,default,default);
INSERT INTO rutines values (default,"Resistencia ",2500,"Mejora tu ritmo cardiaco y tu respiración para llegar más allá","Aumenta tu capacidad aeróbica y mejora tu estado físico con esta rutina de 12 semanas. Además de ejercicios físicos y consejos de especialistas, incluye ejercicios de respiración que son indispensables a la hora del ejercicio",12,"rutines",1,"rutine-resistencia.jpg",default,default,default);
INSERT INTO rutines values (default,"Pecho ",4000,"Infla y tonifica tus pectorales en tan solo 8 semanas","Dale volumen, definición y simetría a tus pectorales, con esta rutina que combina ejercicios multiarticulares y de aislamiento, potenciando y dándole forma a los músculos del pecho",8,"rutines",0,"rutine-pecho.jpg",default,default,default);
INSERT INTO rutines values (default,"Piernas ",3000,"Trabaja una de las partes más importantes del cuerpo","Potencia tus piernas y lleva tu cuerpo hacia el próximo nivel con esta rutina. Las piernas son la base de todo ejercicio, por lo que un buen entrenamiento de las mismas aumenta tu desempeño a la hora del entrenamiento físico",4,"rutines",1,"rutine-piernas.jpg",default,default,default);

INSERT INTO users values (default,"Gonzalo ","Zeballos","gonza@gonza.com","$2a$10$SYN5.ZhuQoAfV7VJod28QODfWYh4qVoIEmNgrowSnJSOkzvwB9ME2","default_avatar.jpg",30,default,default,default);
INSERT INTO users values (default,"Joaquin ","Di Toma","joaco@joaco.com","$2a$10$31BxZNeOkaIbWv8R.GpaROEJzYVfouyOw7U0av.L2lFhycqTkqk8K","1608404004062-1608063707830-1366_2000.jpeg",20,default,default,default);
INSERT INTO users values (default,"Agustin ","Morcillo","agustin@agustin.com","$2a$10$.fbyfEHUPeuXG/BnPCrjNuABrsYAjnfZnaO185rofe1k9tou34A7S","1608404035569-1608063773535-9202af0d723d0b09d5d434eea53f92dd.jpg",default,default,default,default);
INSERT INTO users values (default,"Damian ","Mugnolo","damian@damian.com","$2a$10$38wkjk8jJ3DCxRyvaYGgi.djwmWd3zVBWso26weWI0tF/gVw.UBOW","1608404063362-1608063802795-13615.jpg",default,default,default,default);
INSERT INTO users values (default,"Santiago ","Ruiz","santiago@santiago.com","$2a$10$BSZS4tlZGlmNfHT6KG6PjOtHTklOcZAbC0Yg4FScQmCDC62ZdPEHG","1608404090712-1608063826020-a34557edb440b87588943994469f9aea.jpg",default,default,default,default);

