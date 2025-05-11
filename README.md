# Snippet Manager

A full-stack snippet management application built using Spring Boot and MySQL (phpMyAdmin/XAMPP). It supports user authentication via JWT and allows users to manage their personal code snippets securely.

---

## ✨ Features

- User registration and login
- JWT-based authentication
- CRUD operations on code snippets
- MySQL database integration via XAMPP/phpMyAdmin
- WebSocket support
- Validation and error handling

---

## 📚 Tech Stack

### Backend
- Java 17+
- Spring Boot
  - Web
  - Security
  - JPA (Hibernate)
  - Validation
  - WebSocket
- MySQL (via XAMPP/phpMyAdmin)
- JWT (JSON Web Tokens)
- Lombok

#### Frontend
- npm (v10.9.2)
- Next.js (installed via `npm install next` inside your frontend project)

### Tools
- IntelliJ IDEA / Eclipse
- Postman
- Git & GitHub
- XAMPP/phpMyAdmin

---

## ⚙️ Setup Instructions

### Prerequisites
- Java 17 or higher
- Maven
- npm with next
- XAMPP (with MySQL)
- Git

### 1. Set Up MySQL Database

1. Start Apache & MySQL from XAMPP.
2. Go to [http://localhost/phpmyadmin](http://localhost/phpmyadmin).
3. Create a new database:
   ```sql
   CREATE DATABASE snippet_manager;
   CREATE TABLE users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    );
    CREATE TABLE snippets (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      language VARCHAR(50) NOT NULL,
      code TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

   ```

### 2. Configure Spring Boot

Update `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/snippet_manager
spring.datasource.username=root
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

### 3. Run the Application
```bash
./mvnw spring-boot:run
```

---
## 📋 Folder Structure (Backend)

```
snippet_manager/
├── controller/
    ├── SnippetController
    └── UserController
├── dto/
    ├── UserDTO
    ├── LoginDTO
    └── SnippetDTO
├── model/
    ├── Snippet
    └── User
├── repository/
    ├── UserReporsitory
    └── SnippetRepository
├── service/
    ├── UserService
    └── SnippetService
├── config/
    └── SecurityConfig
├── SnippetManagerApplication.java
└── application.properties
```

---

## 📊 API Endpoints Overview

| Method | Endpoint                    | Description          |
|--------|-----------------------------|----------------------|
| POST   | /api/register               | Register a new user |
| POST   | /api/login                  | Login and get token |
| GET    | /api/snippets               | List all snippets    |
| POST   | /api/snippets/create        | Create new snippet   |
| PUT    | /api/snippets/update/{id}   | Update a snippet     |
| DELETE | /api/snippets/delete/{id}   | Delete a snippet     |

---

## 🚀 Contribution

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---