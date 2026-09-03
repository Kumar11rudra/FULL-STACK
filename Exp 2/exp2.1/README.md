# Experiment 2.1 - RESTful API using Spring Boot

## Aim

To design and implement RESTful APIs using Spring Boot with proper validation, standardized responses, global exception handling, logging, correlation IDs, and CORS configuration.

## Objectives

- Understand REST API design principles
- Implement CRUD APIs using Spring Boot
- Apply layered architecture
- Apply Bean Validation
- Standardize API responses
- Implement global exception handling
- Implement structured logging
- Implement correlation ID based request tracing
- Configure CORS for frontend-backend communication

## Technologies Used

- Java 17
- Spring Boot
- Maven
- Spring Web
- Bean Validation
- SLF4J / Logback
- Postman

## Project Architecture

Controller → Service → Repository

## Project Structure

```text
src/
└── main/
    ├── java/
    │   └── com/example/restapi/
    │       ├── controller/
    │       ├── service/
    │       ├── repository/
    │       ├── model/
    │       ├── dto/
    │       ├── response/
    │       ├── exception/
    │       ├── filter/
    │       └── config/
    │
    └── resources/
        └── application.properties
