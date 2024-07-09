# Transaction App Backend

**Transaction App** is a simple Financial tracking tool made with love from Belo Horizonte, Brazil. It is **not** a complete application and it has the objetive to be an instructional repository to learn and teach backend development with JavaScript technologies, design patterns and clean architecture principles.

Related repositories:

- [Transaction App Frontend (Mobile)](https://github.com/renattomartins/transactions-app-frontend-mobile)

## About the development environment and technologies

Feel free to explore package.json dependencies and devDependencies to learn more. But in summary we have:

- Node.js, Express.js as core tecnologies
- Jest and Supertest for testing
- MySQL with Sequelize at persistence layer
- And more

## Design patterns covered

- The core objects is represented with Domain model pattern
- For object relational mapping was chose Sequelize ORM
- The application is organized in layer (routes, controller, models)

## Installation

### Local environment - Database
Considering MAC OS, you may use homebrew do install a local Mysql Server and then opt to start server as a service or manually.

Commands:
```
$ brew install mysql
$ brew services start mysql (Mac will re-start it at reboot)
$ mysql_secure_installation (some security configurations)
$ brew services stop mysql
$ mysql.server start (Mac will not re-start it at reboot)
$ mysql.server status
$ mysql.server stop
$ mysql -u root -p (to login on Mysql server with password)
$ mysql -uroot
```

