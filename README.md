# Library management system

![listbook](https://github.com/user-attachments/assets/0b363304-0944-4d48-b89b-0c703d0389f5)

Library Management System (LMS) is a software solution designed to manage  the operations of a library. It allows users to borrow, return, and search for books and other resources. The system tracks borrowed items, due dates, and overdue books, while sending  notifications to users. Administrators manage user accounts, and borrowing activities, ensuring the smooth functioning of the library. 

## Table of Contents


- [Software architecture](#Software-architecture)
- [Docker Image](#Docker-Image)
- [Frontend](#frontend)
- [Backend](#backend)
- [Getting Started](#getting-started)
- [Video Demonstration](#Video-Demonstration)
- [Contributing](#contributing)


## Software architecture
<img width="568" alt="arch1" src="https://github.com/user-attachments/assets/55a8026e-7d23-47c5-a9f3-1a4992328f4f" />

The application architecture uses react for the frontend and Spring for the backend, with communication via an HTTP .

## Docker Image

```yaml
version: '3'
services:
  mysql:
    image: mysql:latest
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: bibliotheque
    ports:
      - "3306:3306"

  backend:
    build:
      context: ./bibliotheque
    ports:
      - "8080:8080"
    depends_on:
      mysql:
        condition: service_started
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/bibliotheque
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: root
    healthcheck:
      test: "/usr/bin/mysql --user=root --password=root --execute \"SHOW DATABASES;\""
      interval: 5s
      timeout: 2s
      retries: 100

  frontend:
    build:
      context: ./bibliotheque-frontend
    ports:
        - "80:80"
    depends_on:
      backend:
        condition: service_started

  phpmyadmin:
      image: phpmyadmin/phpmyadmin
      environment:
        PMA_HOST: mysql
        PMA_PORT: 3306
        MYSQL_ROOT_PASSWORD: root
      ports:
        - "8081:80"
```

## Frontend

### Technologies Used

- React
- Html
- Css


## Backend

### Technologies Used

- Spring Boot
- MySQL

## Backend Project Structure

The backend code is structured in a modular and organized way, utilizing Spring Boot to create a robust and scalable application.

### 1. com.example.bibliotheque

- Main Application Class: Application.java serves as the entry point for the Spring Boot application. It includes the main method to start the application.

### 2. com.example.bibliotheque.controller
- Controller Classes: The controller package includes classes that manage incoming HTTP requests. Each controller is focused on a specific feature or entity and exposes RESTful endpoints. These classes interact with the services to handle requests and provide the appropriate responses.

### 3. com.example.bibliotheque.model
- Entity Classes: The model package contains classes that represent the data entities within the application. These classes are annotated with JPA annotations to define the structure of the database tables, with each entity typically corresponding to a table in the MySQL database.
- 
### 4. com.example.bibliotheque.repository
- Repository Interfaces: The repository package includes interfaces that extend Spring Data JPA repositories, offering methods for standard CRUD operations. These interfaces are utilized by services to interact with the database.
- 
### 5. com.example.bibliotheque.service
-Service Classes: The service package contains classes that encapsulate the business logic of the application. Each service class is responsible for processing data and handling the operations required by the controllers. These classes interact with the repository layer to perform CRUD operations on the database and provide the necessary data to the controllers, ensuring that the application's logic is executed correctly and efficiently.

### Dependencies

1. Spring Data JPA:
   - Purpose: Simplifies data access using JPA in Spring Boot.
2. MySQL Connector/J:
Purpose: JDBC driver for connecting to a MySQL database.


```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
```


## Getting Started

Certainly! Here are step-by-step instructions to set up and run your project locally:

### Prerequisites:

1. Git:
   - Make sure you have Git installed. If not, download and install it from [git-scm.com](https://git-scm.com/).

2. XAMPP:
   - Install XAMPP from [apachefriends.org](https://www.apachefriends.org/).
   - Start the Apache and MySQL servers in XAMPP.
   - Ensure MySQL is using port 3306.

3. Node Version Manager (NVM):
   - Install NVM from [github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm).
   - Use NVM to install Node.js version 14.11.0: nvm install 14.11.0.

### Backend Setup:

1. Clone the Project:
   bash
   git clone <repository_url>
   cd <project_folder>
   

2. Install Backend Dependencies:
   - Open a terminal in the backend project folder.
   - Run the following commands:
     bash
     mvn clean install
     

3. Run Backend:
   - Start your XAMPP Apache and MySQL servers.
   - Run the Spring Boot application. The database and entities will be created automatically.
   - Verify that the backend is running by visiting [http://localhost:8080](http://localhost:8080) in your browser.

### ### Frontend Setup:

1. Install Node.js and React:
   - Open a new terminal for the frontend project.
   - Ensure NVM is using Node.js version 22.11.0: nvm use 22.11.0.
   - Install React CLI globally (or create a new React app if you haven't already):
     bash
     npx create-react-app my-app

2. Install Frontend Dependencies:
   - Run the following commands in the frontend project folder:
     bash
     npm install

3. Run Frontend:
   - After installing dependencies, start the React development server:
     bash
     npm start
     

   - Access the frontend at [http://localhost:3000](http://localhost:3000) in your browser.

Your full-stack project should now be running locally. If you experience any issues during the setup, review the console logs for error messages and verify that all dependencies and prerequisites have been properly installed.

# Video Demonstration

[Click here to watch the video](https://github.com/user-attachments/assets/85eeea45-c99f-47dc-9345-85adbdf440b2)



## Utilisation 

### Authentification :
- Pour s'authentifier en tant que admin  :
  - Email : samira123@gmail.com
  - Mot de passe : samira123
- Pour s'authentifier en tant que user  :
  - Sign in and use your information to authenticate
  

# Contributing

We welcome contributions from everyone, and we appreciate your help to make this project even better! If you would like to contribute, please follow these guidelines:

## Contributors
- Ait-zaim Samira ([GitHub](https://github.com/SAMIRA-AIT-ZAIM/))
- Zaggar Driss ([GitHub](https://github.com/zaggardr/))
"# examversionfinal" 
