# TaskFlow: Web App Demo

English | [简体中文](./README.md)

This is a web application demo developed for the Software Engineering course at Fudan University. The project aims to demonstrate modern web development best practices and engineering methods.

TaskFlow is a classic CRUD (Create, Read, Update, Delete) application example that showcases how to build a full-stack web application using modern technology stack.

## Project Overview

This is a complete full-stack application example that demonstrates:

- 🏗️ Modern web application infrastructure
- 📝 Frontend and backend separation development pattern
- ⚡ RESTful API design and implementation
- 🔒 Type-safe code practices
- ♻️ Complete CRUD operation flow

## System Architecture

### Technology Stack

#### Frontend

- **Framework**: Vue 3 + TypeScript
- **Build Tool**: Vite
- **UI Components**: Element Plus
- **State Management**: Pinia
- **Router**: Vue Router
- **HTTP Client**: Axios
- **Code Standard**: ESLint + Prettier

#### Backend

- **Framework**: FastAPI
- **Database**: SQLite
- **ORM**: SQLAlchemy
- **API Documentation**: Swagger UI / ReDoc
- **Type Checking**: Pydantic
- **CORS Support**: CORSMiddleware

### Frontend-Backend Interaction Flow

1. Data Flow

   ```
   Frontend (Vue.ts)             Backend (FastAPI)             Database (SQLite)
   +-----------+                   +------------+                +-----------+
   |           |  HTTP Request     |            |  SQL Query     |           |
   | UI        | ----------------> | REST API   | -------------> |  Tables   |
   |           | <---------------- |            | <------------- |           |
   +-----------+  JSON Response    +------------+  Query Result  +-----------+
   ```
2. Key Technical Points

   - **Type Safety**: End-to-end type checking with frontend TypeScript + backend Pydantic
   - **State Management**: Centralized state management with Pinia
   - **API Design**: RESTful API design
   - **Cross-Origin**: CORS middleware configuration

## Project Structure

```
taskflow-web-app-demo/
├── frontend/              # Frontend project directory
│   ├── src/
│   │   ├── assets/        # Static assets (logo.svg)
│   │   ├── components/    # Common components (PageContainer.vue)
│   │   ├── services/      # API services (api.ts, itemService.ts)
│   │   ├── stores/        # Pinia state management (items.ts)
│   │   ├── types/         # TypeScript type definitions (item.ts)
│   │   ├── views/         # Page components
│   │   │   ├── HomeView.vue
│   │   │   ├── ItemList.vue
│   │   │   ├── ItemCreate.vue
│   │   │   ├── ItemEdit.vue
│   │   │   ├── ItemDetail.vue
│   │   │   └── NotFound.vue
│   │   ├── App.vue        # Root component
│   │   ├── main.ts        # Entry file
│   │   └── router/        # Router configuration
│   ├── index.html
│   └── package.json       # Dependencies
└── backend/               # Backend project directory
    ├── app/               # Application code
    │   ├── models/        # Data models (item.py)
    │   ├── schemas/       # Pydantic models (item.py)
    │   ├── crud/          # Database operations (item.py)
    │   ├── database.py    # Database configuration
    │   └── main.py        # Entry file
    └── environment.yml    # Conda environment configuration
```

## Development Environment Setup

### Requirements

- Node.js >= 16
- Anaconda or Miniconda
- Git

### Quick Start

1. Clone the project

```bash
git clone https://github.com/Albert-Vanderboom/taskflow-web-app-demo.git
cd taskflow-web-app-demo
```

2. Start backend

```bash
cd backend

# Create and activate conda environment
conda env create -f environment.yml
conda activate crud-app

# Start service
python -m uvicorn app.main:app --reload
```

3. Start frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

4. Access application

- Frontend: `http://localhost:5173`
- API Documentation: `http://localhost:8000/docs`

#### Common Issues

1. If conda package installation fails, try:

   ```bash
   # Add conda-forge channel
   conda config --add channels conda-forge
   # Retry installation
   conda env create -f environment.yml
   ```
2. If you encounter Node version issues, try:

   ```bash
   # Install node
   nvm install --lts
   # Set node version
   nvm use --lts
   ```

## Learning Resources

- [Vue 3 Documentation](https://vuejs.org/guide/introduction.html)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Element Plus Documentation](https://element-plus.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Axios Documentation](https://axios-http.com/)
- [Full Stack FastAPI Template](https://github.com/fastapi/full-stack-fastapi-template)

## Contact

- Project Link: [https://github.com/Albert-Vanderboom/taskflow-web-app-demo](https://github.com/Albert-Vanderboom/taskflow-web-app-demo)
- Author Email: [2001dwt@gmail.com](mailto:2001dwt@gmail.com)

## Acknowledgments

Special thanks to:

- [Cursor IDE](https://cursor.sh/) - This project utilized Cursor IDE's AI-assisted programming features during development
- All teachers and students of Fudan University's Software Engineering course for their support of this teaching project

This project also demonstrates how to efficiently develop software using modern AI tools. As a prompt engineer, I completed this demo project through collaboration with Cursor AI.

---

🌟 If this teaching demo project helps you, please give it a star!
