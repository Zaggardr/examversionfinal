# Stage 1: Build with Maven

FROM maven:3.4.0-openjdk-21 AS builder

WORKDIR /app

COPY./src ./src

COPY ./pom.xml .

RUN mvn clean package

# Stage 2: Create the final image

FROM openjdk:21-jdk-alpine

VOLUME /tmp

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java", "-jar","/app.jar"]