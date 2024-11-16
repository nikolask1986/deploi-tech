<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

A NestJS application with user authentication, product management, and PostgreSQL database integration.

The application follows key architectural principles focused on scalability and maintainability through a modular design pattern. It leverages Domain-Driven Design by separating features into independent modules (Users, Products, Auth), implements the Repository Pattern for database abstraction, and uses Dependency Injection for loose coupling. Security is handled through JWT authentication, role-based authorization, and bcrypt password hashing with salt rounds for secure password storage, while Docker containerization ensures consistent deployment environments.


The system's scalability is supported by stateless authentication, efficient database design with TypeORM, and environment-based configuration management. Data integrity and validation are maintained through DTOs and TypeScript type safety, while error handling is standardized across the application. Password security is enhanced by automatically hashing passwords before storage and comparing hashed values during authentication, ensuring that plain-text passwords are never stored or transmitted. This architecture allows for easy horizontal scaling, simplified testing, and the future addition of features like caching, monitoring, and API documentation without significant restructuring.

## Features

- User authentication with JWT
- Role-based authorization (Admin/User)
- Product management system
- PostgreSQL database integration
- Docker containerization

## Prerequisites

- Docker and Docker Compose installed on your machine
- Node.js (recommended for local development)

## Environment Setup

1. Clone the repository:
```bash
git clone https://github.com/nikolask1986/deploi-tech
cd deploi-tech
```

2. Create a `.env` file in the root directory:
```bash
JWT_SECRET=your-secret-key-here
PORT=3000
```

## Running with Docker

1. Build and start the containers:
```bash
docker-compose up
```

2. Check the logs:
```bash
docker-compose logs -f api
```

3. Stop the containers:
```bash
docker-compose down
```

## API Endpoints

### Authentication
- POST /auth/login - Login user
- POST /users - Create new user
- GET /users - Get all users (admin only)
- GET /users/:id - Get user by ID

### Products
- GET /products - Get all products (user: own products, admin: all products)
- POST /products - Create a new product
- GET /products/:id - Get product by ID

A postman collection is included in the root directory called `deploi-tech-test.json`.
## Local Development

```bash
# installation
$ npm install

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Unit Tests

Basic unit testing is implemented for the Users module. To run the tests, use the command `npm run test`.

## Database

The application uses PostgreSQL as its database. When running with Docker, the database is automatically set up with the following default credentials:
- Host: postgres
- Port: 5432
- Username: postgres
- Password: postgres
- Database: deploi_db

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
