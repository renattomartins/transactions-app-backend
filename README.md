# Transactions App Backend

**Transactions App** is a simple Financial tracking tool made with love from Belo Horizonte, Brazil. It is **not** a complete application and it has the objetive to be an instructional repository to learn and teach backend development with JavaScript technologies, design patterns and clean architecture principles.

Related repositories:

- [Transactions App Frontend (Mobile)](https://github.com/renattomartins/transactions-app-frontend-mobile)

### Diagram
TBD

## Technologies

Feel free to explore package.json dependencies and devDependencies to learn more. But in summary we have:

- Node.js, Express.js as core tecnologies
- Jest and Supertest for testing
- MariaDB (MySQL) with Sequelize at persistence layer
- And more

### Design patterns covered

- The core objects is represented with Domain model pattern
- For object relational mapping was chose Sequelize ORM
- The application is organized in layers (routes, controller, models)

## Before you start
Before you starting clone this repository, make sure that you've already done the following steps:

1. Install [nvm](https://github.com/nvm-sh/nvm):

   ```bash
   $ brew install nvm
   ```

2. After **nvm** installation, use it to install the proper version of **node.js**:

   ```bash
   $ nvm use
   ```

3. Considering MAC OS, you may use homebrew to install a local MariaDB Server (Mysql) and then opt to start server as a service or manually. Installation and some security configurations:

   ```
   $ brew install mariadb
   $ mysql_secure_installation
   ```

## Running the app locally

1. Install dependencies:

   ```
   $ npm i
   ```

2. Create a `.env` file (you can duplicate `.env.sample`) and configure your local dev environment varaibles. Remember that you should never commit this file.

3. Execute the project:

   ```
   $ npm run start:local
   ```

4. You can access the API in: http://localhost:3000/

_Ps. The first time you run, make sure your database server is running and that all the migrations are up. More info bellow._

### Database server

   Start MariaDB server (Mac will re-start it at reboot)
   ```
   $ brew services start mariadb
   $ brew service list
   $ brew services stop mariadb
   ```

   Start MariaDB server (Mac will not re-start it at reboot)
   ```
   $ mysql.server start
   $ mysql.server status
   $ mysql.server stop
   ```

   To login on MariaDB server with/without password
   ```
   $ mysql -u root -p
   $ mysql -uroot
   ```

### Migrations

To create database and schema:
```
$ npm run db:create
$ npm run db:migrate
$ npm run db:migrate:status
```



## Test
To execute all unit tests:
```
$ npm run test
$ npm run test:watch
```

To execute all unit tests with coverage:
```
$ npm run test:coverage
```
