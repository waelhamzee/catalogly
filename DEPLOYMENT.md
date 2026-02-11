# Deployment

## Backend (EC2)

- EC2 instance with SSH key authentication
- PostgreSQL installed and running
- Repo cloned, dependencies installed, server started via PM2
- Nginx as reverse proxy on port 443 with TLS (Let's Encrypt)

## Frontend

- Vercel

## Note

The containerized setup (Docker Compose) was not used for deployment to avoid the extra overhead of orchestrating containers in production.
