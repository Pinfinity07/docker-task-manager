# Docker Task Manager

A full-stack task management application built with React, Node.js, Express, and MySQL.

The project is also being used as a practical learning project for containerization, automated testing, CI/CD, and production deployment practices.

## Tech Stack

- React + Vite
- Node.js
- Express
- MySQL 8.4
- Knex
- Docker
- Docker Compose
- Jest
- Supertest
- GitHub Actions

## Overview

The application provides a REST API and React interface for managing tasks.

Current functionality:

- Create tasks
- View tasks
- Update tasks
- Mark tasks as completed
- Delete tasks

The application follows a traditional client-server architecture:

```text
React
  |
  | HTTP / REST API
  v
Node.js + Express
  |
  | SQL
  v
MySQL
```

The application itself is intentionally simple so that the focus can remain on the engineering and infrastructure surrounding it.

## API

| Method | Endpoint         | Description         |
|--------|------------------|----------------------|
| GET    | `/api/tasks`     | Get all tasks        |
| POST   | `/api/tasks`     | Create a task         |
| PATCH  | `/api/tasks/:id` | Update a task         |
| DELETE | `/api/tasks/:id` | Delete a task         |
| GET    | `/api/health`    | API health check      |

The backend uses parameterized SQL queries when interacting with MySQL.

## Database

MySQL is used as the application's relational database.

Database schema changes are managed using Knex migrations rather than manually modifying the database schema.

The project also uses a separate test database for integration testing.

## Testing

The backend is tested using Jest and Supertest.

The current test suite covers:

- API health check
- Fetching tasks
- Creating tasks
- Validation for invalid task creation
- Updating tasks
- Handling updates for nonexistent tasks
- Deleting tasks
- Handling deletion of nonexistent tasks

The integration tests run against a real MySQL database rather than mocked database calls.

Before each test, the task table is cleared to keep tests isolated from one another.

## Docker

The application is fully containerized for development and production-style local deployment.

The development stack consists of:

```text
React Container
       |
       v
Express Container
       |
       v
MySQL Container
       |
       v
Persistent Docker Volume
```

Docker is used to provide:

- Dockerfiles and image creation
- Container lifecycle management
- Port mapping
- Container networking
- Environment variables
- Docker volumes
- Docker Compose
- Production containerization
- Multi-stage builds

### Frontend Container

The frontend uses a multi-stage Docker build.

The first stage:

- Installs Node.js dependencies
- Builds the React application with Vite

The final stage uses Nginx to serve the generated static files.

This keeps the production frontend image separate from the Node/Vite development environment.

### Backend Container

The backend uses a production-oriented Node.js image.

Development dependencies are omitted from the production installation.

Database migrations are not executed automatically when the API server starts.

### Database Container

MySQL runs in its own container and stores database files in a persistent Docker volume.

The production-style Compose configuration does not expose MySQL directly to the host.

## Docker Compose

The project uses separate Compose configurations for development and production-style deployment.

### Development

```text
React
  |
  v
Express
  |
  v
MySQL
```

The development configuration exposes the services needed for local development.

### Production

```text
              ┌──────────────┐
              │    Nginx     │
              │ React build  │
              └──────┬───────┘
                     |
                     v
              ┌──────────────┐
              │   Express    │
              │    API       │
              └──────┬───────┘
                     |
                     v
              ┌──────────────┐
              │    MySQL     │
              └──────┬───────┘
                     |
                     v
              Persistent Volume
```

Production database migrations run through a dedicated one-shot migration container before the API server starts.

This keeps schema changes separate from application startup.

## Configuration

Environment-specific configuration is handled through environment variables.

Example:

```env
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=
```

Sensitive configuration is excluded from version control through `.gitignore`.

## CI

GitHub Actions is used to automatically validate changes.

The current CI pipeline:

1. Checks out the repository
2. Sets up Node.js
3. Installs dependencies using `npm ci`
4. Starts a MySQL service
5. Runs database migrations
6. Runs the integration test suite

The CI workflow runs on pushes to `main` and pull requests targeting `main`.

This ensures that changes are tested in a clean CI environment before being considered ready.

## Production Deployment

The project includes a production-style Docker Compose configuration.

The production stack contains:

- Nginx serving the built React application
- Express API
- MySQL
- Dedicated database migration job
- Persistent MySQL storage

The production configuration has been tested locally using Docker Compose before cloud deployment.

The next deployment target is AWS.

## Roadmap

### Application
- [x] React + Vite frontend
- [x] Express REST API
- [x] MySQL integration
- [x] Task CRUD operations
- [x] API health check

### Database
- [x] Knex migration tooling
- [x] Tasks database migration
- [x] Separate test database
- [x] Persistent MySQL volume
- [x] Environment-based database configuration

### Docker
- [x] Dockerize backend
- [x] Dockerize frontend
- [x] Dockerize MySQL
- [x] Docker Compose development environment
- [x] Container networking
- [x] Environment variables
- [x] Persistent Docker volumes
- [x] Production Docker configuration
- [x] Production backend image
- [x] Production frontend image
- [x] Multi-stage frontend build
- [x] Production database migration container
- [ ] MySQL health check

### Testing
- [x] Jest test setup
- [x] Supertest API testing
- [x] Automated API tests
- [x] Integration tests against MySQL
- [x] Test database isolation

### CI/CD
- [x] GitHub repository
- [x] GitHub Actions CI pipeline
- [x] Automated database migrations in CI
- [x] Automated integration tests in CI
- [ ] Publish images to GitHub Container Registry
- [ ] Continuous deployment

### Cloud Deployment
- [ ] Create AWS infrastructure
- [ ] Create EC2 instance
- [ ] Configure security groups
- [ ] Install Docker on EC2
- [ ] Deploy production Compose stack to AWS
- [ ] Configure production environment variables
- [ ] Configure domain name
- [ ] Configure HTTPS
- [ ] Configure production backups
- [ ] Add deployment automation

## Project Goals

The main goal of this project is to gain practical experience taking a full-stack application from local development to a containerized and automated deployment workflow.

The project focuses on:

- Full-stack application development
- REST API design
- Relational database integration
- Database migrations
- Integration testing
- Docker and container networking
- Persistent data storage
- Production containerization
- CI/CD automation
- Cloud deployment
- Production-oriented operational practices