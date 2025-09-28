# Online Quiz App 🎯

A full-featured online quiz application backend built with Node.js, Express.js, and MongoDB. This application provides comprehensive APIs for creating, managing, and taking quizzes with real-time scoring functionality.

## 📋 Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Screenshots](#screenshots)
- [Live Demo](#live-demo)
- [Installation & Setup](#installation--setup)
- [Running Tests](#running-tests)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Design Choices & Assumptions](#design-choices--assumptions)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## 📖 Project Description

The Online Quiz App is a robust backend system designed to handle quiz creation, question management, and quiz-taking functionality. It features a RESTful API architecture with MongoDB for data storage, making it perfect for educational platforms, training systems, or general knowledge assessments.

### Key Capabilities:

- Create and manage multiple quizzes
- Add various types of questions to quizzes
- Take quizzes and receive immediate scoring
- Flexible question and answer management
- Error handling with custom API responses

## ✨ Features

- **Quiz Management**: Create, update, delete, and retrieve quizzes
- **Question Management**: Add multiple-choice questions
- **Quiz Taking**: Submit answers and get immediate results with scoring
- **Data Persistence**: MongoDB integration for reliable data storage
- **Error Handling**: Comprehensive error handling with custom API error responses
- **CORS Support**: Cross-origin resource sharing for frontend integration
- **Environment Configuration**: Secure environment variable management
- **Middleware Support**: Cookie parsing and request body parsing

## 📸 Screenshots

### Quiz Api ScreenShots

![Create Quiz](/src/images/screenshot1.png)
_Api To Create a new Quiz_

### Add Question To Quiz

![Add Questions To Quiz](/src/images/screenshot2.png)
_Api To Add a question with options and correct option to a quiz_

### Get All Questions Of A Quiz

![Get All Questions of A Quiz](/src/images/screenshot3.png)
_Api To Fetch All the Questions of The Quiz_

### Results & Scoring

![Results Page](/src/images/screenshot4.png)
_Api To show quiz performance and detailed scoring_

## 🌐 Live Demo

**Live Application**: [https://your-quiz-app-demo.com](https://your-quiz-app-demo.com)

_Note: Replace the above URL with your actual deployed application link_

## 🚀 Installation & Setup

### Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher)
- **MongoDB** (v4.0.0 or higher)
- **Git**

### Step-by-Step Setup

1. **Clone the repository**

   ```powershell
   git clone https://github.com/DevSujal/verto-ase-challenge.git
   cd verto-ase-challenge
   ```

2. **Install dependencies**

   ```powershell
   npm install
   ```

3. **Environment Configuration**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=8000
   MONGODB_URI=mongodb+srv://************:**************@quizcluster.98nbtbv.mongodb.net/
   NODE_ENV=development
   ```

4. **Run the application**

   ```powershell
   npm start
   ```

5. **Verify Installation**

   The server should start on `http://localhost:8000`. You should see:

   ```
   server running on port : 8000
   ```

## 🛠 API Endpoints

### Quizzes

| Method   | Endpoint                  | Description         |
| -------- | ------------------------- | ------------------- |
| `POST`   | `/api/v1/quizzes/`        | Create a new quiz   |
| `GET`    | `/api/v1/quizzes/`        | Get all quizzes     |
| `GET`    | `/api/v1/quizzes/:quizId` | Get a specific quiz |
| `PUT`    | `/api/v1/quizzes/:quizId` | Update a quiz       |
| `DELETE` | `/api/v1/quizzes/:quizId` | Delete a quiz       |

### Questions

| Method | Endpoint                            | Description              |
| ------ | ----------------------------------- | ------------------------ |
| `POST` | `/api/v1/quizzes/:quizId/questions` | Add a question to a quiz |
| `GET`  | `/api/v1/quizzes/:quizId/questions` | Get a questions          |

### Quiz Taking

| Method | Endpoint                         | Description                         |
| ------ | -------------------------------- | ----------------------------------- |
| `POST` | `/api/v1/quizzes/:quizId/submit` | Submit quiz answers and get results |

## 📁 Project Structure

```
online-quiz-app/
├── src/
│   ├── controllers/
│   │   └── quizzes.controller.js    # Quiz business logic
│   ├── db/
│   │   └── index.js                 # Database connection
│   ├── middlewares/
│   │   └── quizzes.middleware.js    # Custom middleware
│   ├── models/
│   │   ├── questions.model.js       # Question schema
│   │   └── quizzes.model.js         # Quiz schema
│   ├── routes/
│   │   └── quizzes.router.js        # API routes
│   └── utils/
│       ├── ApiError.js              # Custom error handling
│       ├── ApiResponse.js           # Standardized responses
│       └── asyncHandler.js          # Async wrapper utility
├── .env                             # Environment variables
├── .gitignore                       # Git ignore rules
├── index.js                         # Application entry point
├── package.json                     # Dependencies and scripts
└── README.md                        # Project documentation
```

## 🎯 Design Choices & Assumptions

### Architecture Decisions

1. **MVC Pattern**: Implemented Model-View-Controller architecture for better code organization and maintainability.

2. **Middleware-First Approach**: Extensive use of middleware for:

   - Error handling
   - Request parsing
   - CORS management
   - Cookie parsing

3. **Custom Utility Classes**:
   - `ApiError`: Standardized error handling across the application
   - `ApiResponse`: Consistent response format for all API endpoints
   - `asyncHandler`: Wrapper to handle async operations and catch errors

### Database Design

1. **MongoDB with Mongoose**: Chosen for flexibility in handling quiz structures and questions.

2. **Schema Design**:

   - **Quiz Model**: Contains basic quiz information (title, creation date)
   - **Question Model**: References quiz and contains question data, options, and correct answers

3. **Relationship Modeling**: Used Mongoose references to maintain relationships between quizzes and questions.

### Security Considerations

1. **Environment Variables**: Sensitive configuration stored in `.env` file
2. **CORS Configuration**: Controlled cross-origin access
3. **Request Size Limiting**: Limited JSON payload size to prevent DoS attacks
4. **Error Information**: Stack traces only shown in development environment

### Performance Assumptions

1. **Small to Medium Scale**: Designed for applications with moderate user loads
2. **Real-time Requirements**: Minimal caching implemented, suitable for dynamic content
3. **Database Queries**: Basic query optimization, assumes moderate data volumes

### API Design Principles

1. **RESTful Design**: Follows REST conventions for predictable API behavior
2. **Consistent Response Format**: All responses follow the same structure
3. **HTTP Status Codes**: Proper use of status codes for different scenarios
4. **Error Handling**: Comprehensive error responses with meaningful messages

### Development Assumptions

1. **Node.js Environment**: Assumes modern Node.js with ES6+ support
2. **MongoDB Availability**: Assumes MongoDB is accessible and properly configured
3. **Development vs Production**: Environment-specific configurations handled via NODE_ENV

## 🛠 Technologies Used

### Backend Technologies

- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Development Dependencies

- **Nodemon** - Development server with auto-restart
- **dotenv** - Environment variable management

### Middleware & Utilities

- **CORS** - Cross-origin resource sharing
- **Cookie-parser** - Cookie parsing middleware
- **Custom Error Handling** - Standardized error management

### Development Tools

- **Git** - Version control
- **npm** - Package management
- **ESM Modules** - Modern JavaScript module system

## 🤝 Contributing

We welcome contributions to improve the Online Quiz App! Here's how you can contribute:

### Getting Started

1. **Fork the repository**
2. **Create a feature branch**
   ```powershell
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Run tests** to ensure everything works
5. **Commit your changes**
   ```powershell
   git commit -m "Add: your feature description"
   ```
6. **Push to your branch**
   ```powershell
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

### Contribution Guidelines

- Follow the existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting
- Write clear commit messages

### Areas for Contribution

- Add user authentication and authorization
- Implement quiz categories and tags
- Add timer functionality for quizzes
- Create admin dashboard features
- Improve error handling and validation
- Add more question types (true/false, fill-in-the-blank)
- Implement quiz analytics and reporting

---

## 📞 Support & Contact

If you have any questions, issues, or suggestions, please feel free to:

- **Create an Issue**: [GitHub Issues](https://github.com/DevSujal/verto-ase-challenge/issues)
- **Contact Author**: Sujal Nimje
- **Email**: [nimjesujal2004@gmail.com](mailto:nimjesujal2004@gmail.com)

---

### 🌟 Show Your Support

If you found this project helpful, please consider:

- ⭐ Starring the repository
- 🍴 Forking the project
- 📢 Sharing with others
- 🐛 Reporting bugs
- 💡 Suggesting new features

**Happy Coding! 🚀**
