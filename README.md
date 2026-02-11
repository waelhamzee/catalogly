# Catalogly Setup

## Prerequisites

- Docker and Docker Compose
- Node.js 22 (for local development without Docker)
- PostgreSQL 16 (for local development without Docker)
- AWS account with S3 bucket (for book cover uploads)

## Quick Start with Docker

### 1. Environment variables

Create a `.env` file in the project root with the following variables:

```
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=eu-central-1
AWS_S3_BUCKET=your-bucket-name
```

For production, also set `JWT_SECRET` and `ENCRYPTION_KEY` with secure values.

### 2. Start the application

```bash
docker compose -f docker-compose.dev.yml up --build
```

This starts:
- PostgreSQL on port 5432
- API server on port 8080
- Web client on port 5173

### 3. Seed the database (first run)

The database is empty at first, run the seed:

```bash
docker compose -f docker-compose.dev.yml run --rm seed
```

### 4. Access the application

- Client: http://localhost:5173
- API: http://localhost:8080
- API docs: http://localhost:8080/api-docs

## Local Development (without Docker)

### Backend

Create a `.env` file in `catalogly-server` with your database and AWS credentials.

```bash
cd catalogly-server
npm install
npm run dev
```

Ensure PostgreSQL is running and the database exists. The server uses `sequelize.sync({ alter: true })` in development to create or update tables.

To seed:

```bash
npm run seed
```

### Frontend

```bash
cd catalogly-client
npm install
npm run dev
```

Set `VITE_API_URL` in `.env` if the API runs on a different port.

## Production

Build and run with the production compose file:

```bash
docker compose -f docker-compose.yml up --build -d
```

Before running, set these environment variables (via `.env` or your deployment environment):

- `JWT_SECRET`
- `ENCRYPTION_KEY`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_S3_BUCKET`
- `CLIENT_URL` (base URL of the deployed frontend)
- `VITE_API_URL` (API URL for the client build)

The production client is built at image build time with the provided `VITE_*` variables. The client is served by nginx on port 80.

## Database Volumes

PostgreSQL data is stored in the `postgres_data` volume. To remove all data and start fresh:

```bash
docker compose -f docker-compose.dev.yml down -v
```

Note: This removes the database volume.

## Rebuilding Images

To force a full rebuild without cache:

```bash
docker compose -f docker-compose.dev.yml build --no-cache
docker compose -f docker-compose.dev.yml up
```
