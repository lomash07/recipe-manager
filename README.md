# Recipe Manager Application

A full-stack web application for managing and sharing recipes with a Vue.js frontend and Spring Boot backend.

## Features

- **Recipe Dashboard**: View all recipes with filtering and search capabilities
- **Recipe Creation**: Add new recipes with dynamic ingredient fields
- **Recipe Details**: View full recipe details including ingredients and instructions
- **Recipe Editing**: Modify existing recipes
- **Image Upload**: Add images to recipes
- **User Authentication**: Register and login to manage your own recipes
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

### Frontend
- Vue.js 3 with Composition API
- TypeScript for type safety
- Pinia for state management
- Element Plus for UI components
- Vue Router for navigation

### Backend
- Java Spring Boot
- Spring Security with JWT authentication
- Spring Data JPA for database operations
- Bean Validation for input validation
- File upload handling

### Database
- MySQL for data storage
- Relational design with proper foreign key relationships

### DevOps
- Docker and Docker Compose for containerization
- GitHub for version control
- Ready for CI/CD integration

## Project Structure

```
recipe-manager/
├── recipe-manager-frontend/  # Frontend code
│   ├── src/
│   │   ├── assets/          # Static assets
│   │   ├── components/      # Reusable Vue components
│   │   ├── views/           # Page components
│   │   ├── stores/          # Pinia state management
│   │   ├── services/        # API services
│   │   ├── router/          # Vue Router configuration
│   │   ├── types/           # TypeScript type definitions
│   │   ├── utils/           # Utility functions
│   │   ├── App.vue          # Root component
│   │   └── main.ts          # Application entry point
│   ├── Dockerfile           # Frontend Docker configuration
│   └── nginx.conf           # Nginx configuration for production
├── recipe-manager-api/      # Backend code
│   ├── src/
│   │   ├── main/java/com/recipemanager/
│   │   │   ├── controller/  # REST API controllers
│   │   │   ├── service/     # Business logic services
│   │   │   ├── repository/  # Data access repositories
│   │   │   ├── model/       # Domain models and DTOs
│   │   │   ├── security/    # Authentication and authorization
│   │   │   ├── config/      # Application configuration
│   │   │   ├── exception/   # Exception handling
│   │   │   └── RecipeManagerApplication.java
│   │   └── resources/
│   │       ├── application.properties  # Application configuration
│   │       └── data.sql                # Sample data
│   ├── pom.xml              # Maven dependencies
│   └── Dockerfile           # Backend Docker configuration
├── docker-compose.yml       # Docker Compose configuration
└── README.md                # Project documentation
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm (for frontend development)
- Java 17+ and Maven (for backend development)
- Docker and Docker Compose (for containerized deployment)
- MySQL (if running outside of Docker)

### Running with Docker (Recommended)

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/recipe-manager.git
   cd recipe-manager
   ```

2. Start the application using Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080/api
   - API Documentation: http://localhost:8080/api/swagger-ui/index.html

### Development Setup

#### Frontend Development
1. Navigate to the frontend directory:
   ```bash
   cd recipe-manager-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The frontend will be available at http://localhost:5173

#### Backend Development
1. Navigate to the backend directory:
   ```bash
   cd recipe-manager-api
   ```

2. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

3. The API will be available at http://localhost:8080/api

## API Endpoints

### Recipe Endpoints
- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/{id}` - Get recipe by ID
- `POST /api/recipes` - Create a new recipe
- `PUT /api/recipes/{id}` - Update a recipe
- `DELETE /api/recipes/{id}` - Delete a recipe

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate and get JWT token

## Database Schema

### Recipes Table
- `id` (Primary Key)
- `title` (VARCHAR)
- `difficulty` (ENUM: 'Easy', 'Medium', 'Hard')
- `instructions` (TEXT)
- `image_url` (VARCHAR)
- `creator_name` (VARCHAR)
- `created_date` (DATETIME)

### Ingredients Table
- `id` (Primary Key)
- `recipe_id` (Foreign Key)
- `ingredient_name` (VARCHAR)

### Users Table (Authentication)
- `id` (Primary Key)
- `name` (VARCHAR)
- `email` (VARCHAR, unique)
- `password` (VARCHAR, encrypted)

## Deployment

### Local Deployment
Use Docker Compose as described in the "Running with Docker" section.

### Cloud Deployment

#### AWS Deployment
1. Set up an EC2 instance with Docker
2. Clone the repository and run Docker Compose
3. Configure security groups to expose necessary ports

#### Heroku Deployment
1. Create separate Heroku apps for frontend and backend
2. Configure environment variables for database connection
3. Push to Heroku Git repositories

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Vue.js](https://vuejs.org/)
- [Element Plus](https://element-plus.org/)
- [Spring Boot](https://spring.io/projects/spring-boot)
- [MySQL](https://www.mysql.com/)
- [Docker](https://www.docker.com/)
