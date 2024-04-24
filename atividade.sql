CREATE TABLE IF NOT EXISTS usuarios (
	id INTEGER auto_increment,
    nome VARCHAR(100),
    email VARCHAR(200),
    senha VARCHAR(200),
    primary key (id)
);

CREATE TABLE IF NOT EXISTS atividades (
	id INTEGER auto_increment,
    titulo VARCHAR(200),
    descricao VARCHAR(500),
    data date,
    primary key (id)
);

CREATE TABLE IF NOT EXISTS usuario_atividade (
	usuario_id INTEGER,
    atividade_id INTEGER,
    entrega date default null,
    nota DOUBLE default null,
    primary key (usuario_id, atividade_id),
    foreign key (usuario_id) references usuarios (id),
    foreign key (atividade_id) references atividades (id)
);




