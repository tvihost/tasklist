# Tasks List - Backend

Backend em NodeJS, utilizando Typescript, Fastify, Persistência em banco Mysql, Utilizando Nodemailer para envio de e-mail.

[Procedimentos para teste]
- Utilizar o git para clonar o repositório. ( git clone https://github.com/tvihost/tasklist.git )
- Após clonado o repositório, entrar no diretório tasklist-frontend, rodar: npm install
- Rodar o comando: npm install knex -g
- Com o gerenciador de banco de dados mysql de preferência, criar um banco com o nome: db_tasks
- Na raiz do projeto, no arquivo .env.example, renomear para .env e inserir os dados de conexão do banco e smtp
- Rodar o comando: knex migrate:latest
- Para executar, rodar o comando: npm run start
- Aparecerá: Server running. Sinal que o serviço está rodando no endpoint: http://localhost:3000

Usuários gerados para teste:
Email: a@usuario.com - Senha: 123456
Email: b@usuario.com - Senha: 654321