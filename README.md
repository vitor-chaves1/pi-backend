
# API Projeto Backend

Essa API permite o registro e gerenciamento eficiente de alunos e cursos. Com uma estrutura flexível, ela suporta que cada aluno seja associado a múltiplos cursos, enquanto cada curso pode acolher diversos alunos. Além disso, a API oferece funcionalidades CRUD (Criar, Ler, Atualizar e Deletar), possibilitando um controle completo sobre os dados acadêmicos, garantindo assim uma administração ágil e simplificada de informações educacionais vitais


## Run Locally

Clone o projeto

```bash
  git clone https://github.com/vitor-chaves1/pi-backend/
```

Acesse o diretório do projeto

```bash
  cd pi-backend
```

Instale dependencias

```bash
  npm install
```

Crie um arquivo .env com as informaçoes de conexao com o banco de dados [MongoDB Atlas](https://account.mongodb.com/account/login). Exemplo:

```bash
  MONGODB_URL=mongodb+srv://<usuario>:<senha>@<dados>.mongodb.net/
  PORT = 3000
```

Inicie o servidor

```bash
  npm run start
```


## Documentação

[localhost:3000/api-docs](http://localhost:3000/api-docs)


## Running Tests

To run tests, run the following command

```bash
  npm run test
```
