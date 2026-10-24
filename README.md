# Full-Stack SOA Charity Management System

**Student ID:** `2400032790`  
**Base Package:** `com.klef.soa.docker`  
**Database Table:** `exam_2400032790`  

A production-ready Full-Stack Service-Oriented Architecture (SOA) application for managing charity campaigns and fundraiser records. Built with Spring Boot REST API, React 19 + Bootstrap 5.3 frontend, PostgreSQL database, Docker containerization, and automated CI/CD via GitHub Actions.

---

## 📁 Repository Structure

```text
├── .github/
│   └── workflows/
│       └── docker-build-push.yml    # GitHub Actions workflow for automated image build & push
├── backend/
│   ├── src/
│   │   ├── main/java/com/klef/soa/docker/
│   │   │   ├── configuration/       # Swagger OpenAPI & CORS Web configuration
│   │   │   ├── controller/          # REST Endpoints (/api/charities) & Global Exception Handler
│   │   │   ├── dto/                 # Request/Response Data Transfer Objects & Error schema
│   │   │   ├── entity/              # JPA Entity mapping to table exam_2400032790
│   │   │   ├── repository/          # Spring Data JPA Repository
│   │   │   ├── service/             # Business Service interface
│   │   │   └── service/impl/        # Business Service implementation
│   │   └── resources/
│   │       └── application.properties
│   ├── pom.xml                      # Maven configuration with Spring Boot 3 & OpenAPI
│   └── Dockerfile                   # Multi-stage Docker build for backend service
├── frontend/
│   ├── src/
│   │   ├── components/              # Navbar, Footer, Modal, Skeleton, StatCards, Toast
│   │   ├── context/                 # React Context API for centralized charity state management
│   │   ├── pages/                   # Dashboard, Directory, AddRecord, EditRecord, Details
│   │   ├── App.jsx                  # React Router configuration
│   │   ├── main.jsx                 # Application entry point with Error Boundary
│   │   └── styles.css               # Modern Bootstrap styling & custom theme
│   ├── package.json                 # Node dependencies (Bootstrap 5.3, Icons, React Router)
│   ├── nginx.conf                   # Production Nginx reverse proxy & SPA routing configuration
│   └── Dockerfile                   # Multi-stage Vite build + Nginx Alpine runtime
├── docker-compose.yml               # Multi-container orchestration (PostgreSQL, Backend, Frontend)
├── .gitignore                       # Clean repository ignore patterns
└── README.md                        # Documentation & setup guide
```

---

## 🚀 Key Features

- **Frontend (Port 3000 / 5173)**:
  - Rich modern UI built with React 19, Bootstrap 5.3, and Bootstrap Icons.
  - Candidate badge (`SOA 2400032790`) in navbar and comprehensive tech stack footer on every page.
  - Complete CRUD:
    - **Add Record Form**: Automatically generates ID on the backend (strictly no user ID input).
    - **Directory & Table**: Color-coded action buttons (Green **Edit**, Red **Delete**), live search, filter, and sorting.
    - **Dashboard**: Real-time KPI statistics cards, progress bars, and recent activity.
    - **Details View**: Individual campaign breakdown with goal percentage and status badges.
  - Robust client-side validation, error boundaries, loading skeletons, and toast feedback.

- **Backend (Port 8081)**:
  - Spring Boot 3.4 RESTful architecture under package `com.klef.soa.docker`.
  - Layered architecture: `configuration`, `controller`, `dto`, `entity`, `repository`, `service`, `service.impl`.
  - Full backend validation (`@NotBlank`, `@NotNull`, `@PositiveOrZero`) with structured JSON error responses.
  - Integrated interactive Swagger UI / OpenAPI 3.0 documentation.

- **Database (PostgreSQL)**:
  - Table: `exam_2400032790` with auto-incrementing identity primary key `id`.

- **Containerization & CI/CD**:
  - `docker-frontend-2400032790`: Nginx Alpine serving optimized production assets.
  - `docker-backend-2400032790`: Multi-stage compiled Eclipse Temurin JRE container.
  - Automated GitHub Actions workflow pushing to Docker Hub on every commit to `main`.

---

## 🛠️ Running with Docker Compose

Ensure Docker Desktop is running, then execute:

```bash
docker compose up -d
```

### Verified Service URLs:
- **Frontend Portal:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:8081/api/charities](http://localhost:8081/api/charities)
- **Swagger UI Documentation:** [http://localhost:8081/swagger-ui/index.html](http://localhost:8081/swagger-ui/index.html)
- **Database:** PostgreSQL on `localhost:5432` (`exam_2400032790`)

To stop all containers:
```bash
docker compose down
```

---

## 🐳 Docker Hub Images

- **Backend:** `docker-backend-2400032790`
- **Frontend:** `docker-frontend-2400032790`
