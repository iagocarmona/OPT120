CREATE SCHEMA IF NOT EXISTS opt120; 
CREATE DATABASE IF NOT EXISTS opt120;

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
    entrega date,
    nota DOUBLE,
    primary key (usuario_id, atividade_id),
    foreign key (usuario_id) references usuarios (id),
    foreign key (atividade_id) references atividades (id)
);

INSERT INTO usuarios (nome, email, senha) values ('iago', 'teste@gmail.com', '123123');
INSERT INTO usuarios (nome, email, senha) values ('joao', 'joao@gmail.com', '123222');
INSERT INTO usuarios (nome, email, senha) values ('pedro', 'pedro@gmail.com', '222222');
INSERT INTO atividades (titulo, descricao, data) values ('tarefa 1', 'tarefa teste 1', '2023-03-25');
INSERT INTO usuario_atividade (usuario_id, atividade_id, entrega, nota) values (1, 1, '2024-03-22', 10.00);

SELECT * FROM usuarios u, usuario_atividade ua 
WHERE u.id = ua.usuario_id 
AND ua.nota > 5.00;

SELECT * FROM atividades;
select * from usuario_atividade;




