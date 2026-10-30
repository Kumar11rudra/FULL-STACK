FROM maven:3.9.11-eclipse-temurin-17 AS build
WORKDIR /workspace
COPY pom.xml .
RUN mvn -B -q dependency:go-offline
COPY src ./src
RUN mvn -B -DskipTests package

FROM eclipse-temurin:17-jre
RUN groupadd -r app && useradd -r -g app app
WORKDIR /app
COPY --from=build /workspace/target/exp33-backend-1.0.0.jar app.jar
USER app
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
