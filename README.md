# Docker Task Manager

A full-stack task management application built to explore modern web development, containerization, CI/CD, and deployment practices.

The project uses **React** for the frontend, **Node.js + Express** for the backend, and **MySQL** for persistent data storage. The application is being progressively containerized and automated using Docker and GitHub Actions.

The primary goal of this project is to build a practical understanding of how a full-stack application moves from local development to a containerized, tested, and deployable system.

---

## 🚀 Tech Stack

### Frontend
- React
- Vite
- JavaScript

### Backend
- Node.js
- Express
- REST API
- `mysql2`

### Database
- MySQL

### DevOps / Infrastructure
- Docker
- Docker Compose
- GitHub Actions
- GitHub Container Registry
- Environment-based configuration

### Planned
- Automated testing
- CI/CD
- Production deployment
- Persistent Docker volumes
- Production-ready Docker images

---

## 📋 Project Overview

The application is a simple task management system that allows users to:

- Create tasks
- View tasks
- Update tasks
- Mark tasks as completed
- Delete tasks

The application follows a traditional client-server architecture:

```text
┌──────────────────┐
│                  │
│   React Client   │
│                  │
└────────┬─────────┘
         │
         │ HTTP / REST API
         ▼
┌──────────────────┐
│                  │
│  Node + Express  │
│                  │
└────────┬─────────┘
         │
         │ SQL
         ▼
┌──────────────────┐
│                  │
│      MySQL       │
│                  │
└──────────────────┘
