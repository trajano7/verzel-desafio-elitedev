# Teste Elite Dev Verzel - Aplicação De Lista de Filmes Integrada Com o The Movie Database (TMDb)

## Sobre

Este projeto é uma aplicação web desenvolvida como parte do **Desafio Verzel**, um teste técnico para avaliar habilidades em desenvolvimento web. O objetivo da aplicação é permitir que os usuários pesquisem filmes e gerenciem uma lista de favoritos, integrando-se com a API do The Movie Database (TMDb) para obter informações detalhadas sobre os filmes.

## Funcionalidades

- **Pesquisa de Filmes**: Interface para pesquisar filmes utilizando a API do TMDb.
- **Detalhes dos Filmes**: Exibição de detalhes dos filmes selecionados, incluindo a nota do TMDb (rating).
- **Gerenciamento de Favoritos**: Adicionar e remover filmes da lista de favoritos.
- **Compartilhamento de Lista**: Gerar um link para compartilhar a lista de filmes favoritos.
- **Integração com TMDb**: Gestão das chamadas para a API do TMDb.
- **Armazenamento de Dados**: Armazenamento seguro da lista de filmes favoritos.

## Tecnologias Utilizadas

- ReactJS,
- MUI
- React Router
- Node.js
- ExpressJS
- MySQL

## Como Executar o Projeto

### Pré-requisitos

Antes de iniciar, certifique-se de ter o seguinte instalado:

- [Node.js](https://nodejs.org/en/download/package-manager) (A partir da versão v12.22.9)
- [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (A partir da versão 10.1.0)
- MySQL (v8.0.39): é precisso fazer a instalação para seu sistema e fazer a configuração de um usuário mysql para executar a aplicação.

### Passo a Passo

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/trajano7/verzel-desafio-elitedev.git
   ```

2. **Navegue até a pasta do projeto:**

   ```bash
   cd verzel-desafio-elitedev
   ```

3. **Crie um arquivo .env no diretorio do Back-End:**

   ```bash
   cd backend
   touch .env
   ```

4. **Configure as variáveis de ambiente:**

   Para utilizar a API do TMDB e configurar o banco de dados, é necessário criar um arquivo `.env` na pasta `/backend` com o seguinte conteúdo:

   ```env
   SECRET_KEY=4ff359f5b881ed45d4407700571a082c7d59fb19371ad18e906507931044d09c
   TMDB_API_KEY=<Sua_Chave_da_API_TMDB>
   DB_HOST=localhost
   DB_USER=<Seu_User_MySql>
   DB_PASSWORD=<Sua_Senha_MySql>
   DB_NAME=movies_db
   DB_PORT=3306
   DB_DIALECT=mysql
   PORT=3000
   ```

   Onde,

   - SECRET_KEY: Chave aleatoria para gerar o token de autenticação.
   - TMDB_API_KEY: Chave para a API do TMDB.
   - DB_USER: Seu usuaŕio MySql
   - DB_PASSWORD: Senha do seu usuário MySql

   Você pode obter sua chave aqui: [Documentação API TMDB](https://developer.themoviedb.org/v4/reference/intro/getting-started).

5. **Instale as dependências do projeto:**

   ```bash
   npm install
   ```

6. **Execute as migrations para criar o banco de dados e as tabelas:**

   Primeiro, navegue até a pasta src:

   ```bash
   cd src
   ```
   
   Em seguinda, certifique-se de que o banco de dados esteja criado usando o comando:

   ```bash
   npx sequelize-cli db:create
   ```

   Por fim, execute as migrations para criar as tabelas definidas nas suas migrações:

   ```bash
   npx sequelize-cli db:migrate
   ```

   Isso aplicará todas as migrations pendentes e criará as tabelas no banco de dados.

7. **Volte para pasta root e execute o Back-End:**

   ```bash
   cd ..
   npm start
   ```

   O Back-End deve executar na porta 3000.

8. **Instale as dependências e execute o Front-End:**

   Abra outro terminal no diretorio root do projeto e execute:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   Usualmente o Vite irá executar o server na porta 5173. Nesse momento, a aplicação já estará em execução e pode ser acessada no link (http://localhost:5173/).

## Licença

Este projeto está licenciado sob a Licença MIT.
