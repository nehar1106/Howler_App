# Howler_App

Howler is a basic client-side social networking app, inspired by Twitter, where users can log in, post messages ("howls"), and follow others. The project includes a RESTful API for data access and a responsive frontend built with Bootstrap. It simulates real-time interactions using mock data stored in memory and resets on each server restart.

## Components

### Backend
- Built with Node.js and Express.
- REST API endpoints include:
  - User authentication
  - Posting and retrieving howls
  - Viewing followers and following users
  - Follow/unfollow functionality
- Uses in-memory data from JSON files: `users.json`, `howls.json`, `follows.json`.
- All routes are mounted under `/api`.

### Frontend
- Fully client-side rendered using Bootstrap 5.
- Pages include:
  - Login page
  - Main feed of followed users’ howls
  - User profile pages with follow/unfollow buttons
- Uses JavaScript to fetch and display dynamic data from the backend API.

##  Deployment

### Docker Setup
- `Dockerfile`: Builds the Node.js app for containerized deployment.
- `docker-compose.yml`: Adds a `howler` service for the Howler app.
- `default.conf.template`: Proxies `/` and `/howler/` routes to the Howler container.

### To Deploy Locally:
```bash
docker-compose build hw4
docker-compose up

Usage:
http://localhost/howler/
