# Docker Task Manager

A full-stack task management application built with React, Node.js, Express, and MySQL. The project is also being used to explore containerization, CI/CD, and production deployment practices.

## Tech Stack

- React + Vite
- Node.js + Express
- MySQL
- Docker
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
API
Method	Endpoint	Description
GET	/api/tasks	Get all tasks
POST	/api/tasks	Create a task
PATCH	/api/tasks/:id	Update a task
DELETE	/api/tasks/:id	Delete a task
GET	/api/health	API health check

The backend uses parameterized SQL queries when interacting with MySQL.

Docker

The frontend and backend are containerized using Docker.

Current architecture:

React Container
       |
       v
Express Container
       |
       v
MySQL

The project is being developed toward a fully containerized setup using Docker Compose:

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

The Docker portion of the project focuses on understanding:

Dockerfiles and image creation
Containers and container lifecycle
Port mapping
Container networking
Environment variables
Docker volumes
Docker Compose
Production containerization
Multi-stage builds
Configuration

Environment-specific configuration is handled through environment variables.

Example:

DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=

Sensitive configuration is excluded from version control through .gitignore.

CI/CD

GitHub Actions is being used to automate the project's development workflow.

The planned CI pipeline will:

Install dependencies
Run linting and tests
Build the frontend
Build Docker images
Validate changes on pushes and pull requests

The project will eventually be extended with continuous deployment and automated container image publishing.

Roadmap
 React frontend
 Express REST API
 MySQL integration
 Task CRUD operations
 Dockerize backend
 Dockerize frontend
 Environment-based configuration
 GitHub repository
 Dockerize MySQL
 Docker Compose
 Persistent MySQL volumes
 Automated API tests
 Integration tests
 Production Docker images
 Multi-stage Docker builds
 GitHub Actions CI pipeline
 Publish images to GitHub Container Registry
 Continuous deployment
 Cloud deployment
Project Goals

The main goal of this project is to gain practical experience taking a full-stack application from local development to a containerized and automated deployment workflow.

The project focuses on:

Full-stack application development
REST API design
Relational database integration
Docker and container networking
CI/CD automation
Production-oriented deployment practices

The application itself is intentionally simple so that the focus can remain on the engineering and infrastructure surrounding it.
