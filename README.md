# Charity Fundraiser Management – Full Stack

- **Student ID:** 2400032790
- **Base package:** `com.klef.soa.docker`
- **Database table:** `exam_2400032790` (PostgreSQL)

A full-stack web app for managing charity fundraisers. You can add, view, edit and delete records.
The frontend is React with Bootstrap, and the backend is Spring Boot with a REST API and Swagger UI.
Both run as Docker containers.

## Project structure

```text
.github/workflows/docker-build-push.yml   GitHub Actions: build and push both images
backend/                                  Spring Boot app + Dockerfile
  src/main/java/com/klef/soa/docker/
    configuration/    Swagger and CORS config
    controller/       REST endpoints and error handler
    dto/              CharityDTO (request/response), ErrorResponse
    entity/           CharityEntity (auto-generated id)
    repository/       CharityRepository (Spring Data JPA)
    service/          CharityService interface
    service/impl/     CharityServiceImpl
frontend/                                 React + Vite + Bootstrap app + Dockerfile
docker-compose.yml                        Runs postgres, backend and frontend together
```

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Home check |
| POST | `/Add` | Add a fundraiser (no id in the request, the database generates it) |
| GET | `/DisplayAll` | List all fundraisers |
| GET | `/Display/{id}` | Get one fundraiser |
| PUT | `/Update/{id}` | Update a fundraiser |
| DELETE | `/Delete/{id}` | Delete a fundraiser |

Sample request body:

```json
{ "fundraiserName": "School Books Drive", "targetAmount": 50000, "amountRaised": 12000, "completed": false }
```

## Validation

The same rules apply in the frontend form and in the backend DTO:

- `fundraiserName`: required, 3 to 100 characters
- `targetAmount`: required, greater than 0
- `amountRaised`: required, 0 or more
- `completed`: required

When a request is invalid, the backend returns `400` with the error for each field. A record that doesn't exist returns `404`.

## Docker images

- `chsathvika03/docker-backend-2400032790:latest` (build context `./backend`)
- `chsathvika03/docker-frontend-2400032790:latest` (build context `./frontend`)

On every push to `main`, the GitHub Actions workflow builds and pushes both images to Docker Hub.

## Run with Docker Compose

```bash
docker compose pull
docker compose up -d
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:8081 |
| Swagger UI | http://localhost:8081/swagger-ui/index.html |
| PostgreSQL | localhost:5433 |

Stop the containers:

```bash
docker compose down
```
