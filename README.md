# Sistema Escolar - Projeto Full Stack

## Descrição do Sistema

Este sistema foi desenvolvido com o objetivo de permitir o gerenciamento de turmas e atividades por professores.

O sistema realiza autenticação simples de usuários (professores) e permite operações de cadastro, listagem e exclusão de turmas e atividades.

---

## Requisitos de Infraestrutura

### Editor de Código (IDE)
- Visual Studio Code (VS Code)

### Banco de Dados (SGBD)
- MySQL 
- Utilizado via XAMPP (Apache + MySQL)

### Servidor de Aplicação
- Node.js v18 ou superior
- Express.js

### Linguagens Utilizadas
- JavaScript 
- HTML
- CSS

---

## Prints das Telas


### Tela de Login

![Login](./docs/login.png)

---

### Cadastro de Turmas

![Cadastro de Turmas](./docs/cadastro_turmas.png)

## Como executar 

1. Clonar o repositório
2. Instalar dependências do backend
cd api
npm init -y
npm install express cors mysql2 @prisma/client
3. Configurar banco de dados
Configurar arquivo .env

4. Prisma (configuração do banco)
npx prisma generate
npx prisma migrate dev
5. Iniciar servidor backend
npm run dev

---

### Cadastro de Atividades

![Cadastro de Atividades](./docs/cadastro_atividades.png)
