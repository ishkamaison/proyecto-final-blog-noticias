CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL, -- Límite de la pauta
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE noticias (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(60) NOT NULL,    -- Máximo 60 caracteres
    contenido VARCHAR(4000) NOT NULL, -- Máximo 4000 caracteres
    imagen_url TEXT NOT NULL,       -- Para la URL de la imagen (máx 2mb se valida en el envío)
    categoria_id INTEGER REFERENCES categorias(id),
    autor_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE votos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    noticia_id INTEGER REFERENCES noticias(id) ON DELETE CASCADE,
    tipo VARCHAR(10) CHECK (tipo IN ('like', 'dislike')),
    UNIQUE(usuario_id, noticia_id) -- Un voto por usuario por noticia
);

CREATE TABLE comentarios (
    id SERIAL PRIMARY KEY,
    contenido TEXT NOT NULL,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    noticia_id INTEGER REFERENCES noticias(id) ON DELETE CASCADE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO categorias (nombre) VALUES ('Turismo'), ('Tecnología'), ('Cultura'), ('Deportes');