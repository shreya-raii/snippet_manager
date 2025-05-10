# dm2buy-assignment

This project contains:

## 1. Backend (Spring Boot)
Located in: `snippet_manager/`

- Spring Boot application for user registration and login.
- MySQL database named `snippet_manager` with `user` table.
- APIs:
  - `POST /api/register` – Register new user
  - `POST /api/login` – Login user and return user data if credentials match

## 2. Frontend (Next.js)
Located in: `snippet_manager_frontend/`

- Next.js frontend for registration and login flows.
- Integrated with backend APIs.
- Loader and error handling implemented.
- UI auto-redirects to login after register and to dashboard after successful login.

## Tech Stack

- Backend: Java 17, Spring Boot, MySQL
- Frontend: Next.js, React
- Tools: IntelliJ IDEA, VS Code, Git

## How to Run

### Backend
1. Import `snippet_manager` in IntelliJ or your IDE.
2. Ensure MySQL is running and database `snippet_manager` exists.
3. Run the Spring Boot app.

### Frontend
1. Navigate to `snippet_manager_frontend`
2. Install dependencies:
   ```bash
   npm install
