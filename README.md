# 🍬 Candly

Sistema de gerenciamento de doceria desenvolvido para controlar o cadastro de doces, autenticação de usuários e gerenciamento de exclusões.

## Sobre o Projeto

O Candy Manager é uma aplicação web criada para auxiliar no gerenciamento de uma doceria. A plataforma permite que usuários autenticados realizem o cadastro e a administração de doces, incluindo o controle de validade dos produtos e o registro de exclusões para melhor rastreabilidade das operações realizadas.

## Funcionalidades

### Autenticação
- Login de usuários
- Controle de acesso às funcionalidades do sistema
- Proteção de rotas

### Gerenciamento de Doces
- Cadastro de novos doces
- Consulta de doces cadastrados
- Atualização de informações dos produtos
- Controle de validade dos doces

### Registro de Exclusões
- Exclusão de produtos cadastrados
- Registro das exclusões realizadas
- Histórico para acompanhamento das operações

## Tecnologias Utilizadas

### Front-End
- React
- TypeScript
- React Router
- Axios

### Back-End
- Node.js
- Express
- Knex.js

### Banco de Dados
- SQL

## ⚙️ Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/JoaoMoraes28/candly
```

### 2. Entre na pasta do projeto

```bash
cd candly
```

### 3. Instale as dependências

#### Front-End

```bash
cd frontend
npm install
```

#### Back-End

```bash
cd backend
npm install
```

## Configuração

Crie um arquivo `.env` no diretório do back-end contendo as variáveis necessárias:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=usuario
DB_PASSWORD=senha
DB_NAME=db_candy
```

## Executando as Migrations

```bash
npx knex migrate:latest
```

## Executando o Projeto

### Back-End

```bash
node app.js
```

### Front-End

```bash
npm run dev
```

## Objetivos do Projeto

Este projeto foi desenvolvido com o objetivo de praticar conceitos de:

- Desenvolvimento Full Stack
- React com TypeScript
- APIs REST
- Autenticação de usuários
- Modelagem de banco de dados
- Utilização do Knex.js
- Integração entre Front-End e Back-End

## Autor

João Victor Santos de Moraes