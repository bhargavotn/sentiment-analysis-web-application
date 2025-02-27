# sentiment-analysis-web-application

Overview

This project is a full-stack sentiment analysis web application that allows users to input text and receive sentiment predictions using a pre-trained AI model. The application is containerized using Docker for on-prem deployment.
https://github.com/bhargavotn/sentiment-analysis-web-application/blob/main/Screenshot%202025-02-27%20230157.png?raw=true

Features

Backend: Python, FastAPI, GraphQL API, HuggingFace Transformers for AI integration, authentication using API key/JWT.

Frontend: React, TypeScript, Apollo Client for GraphQL integration.

DevOps: Dockerized backend and frontend, docker-compose for local deployment.

Prerequisites

Ensure you have the following installed before running the application:

Docker

Docker Compose

Setup Instructions

1. Clone the Repository

git clone https://github.com/bhargavotn/sentiment-analysis-web-application/

2. Run the Application

Execute the following command in the root directory:

docker-compose up --build

This command will:

Build and start the backend and frontend containers.

Ensure all dependencies are installed.

3. Access the Application

Once the containers are running:

Web Interface & API: Open http://localhost:80 in your browser.

GraphQL Playground: Visit http://localhost:80/graphql for API testing.

Project Structure

/sentiment-analysis-webapp
│── backend/               # FastAPI Backend
│   ├── main.py            # API Entry Point
│   ├── model.py           # Sentiment Analysis Logic
│   ├── schema.py          # GraphQL Schema
│   ├── auth.py            # Authentication Logic
│   ├── requirements.txt   # Backend Dependencies
│   ├── Dockerfile         # Backend Docker Configuration
│
│── frontend/              # React Frontend
│   ├── src/
│   │   ├── App.tsx        # Main UI Component
│   │   ├── api.ts         # Apollo GraphQL Integration
│   │   ├── components/    # UI Components
│   ├── package.json       # Frontend Dependencies
│   ├── Dockerfile         # Frontend Docker Configuration
│
│── docker-compose.yml     # Container Orchestration
│── README.md              # Project Documentation

API Usage

Authentication

The API uses an API key or JWT-based authentication. Include your API key in requests:

{
  "Authorization": "newsecretkey123"
}

GraphQL Query Example

query {
  analyzeSentiment(text: "I love using AI-powered tools!") {
    sentiment
  }
}

Expected Response

{
  "data": {
    "analyzeSentiment": {
      "sentiment": "Positive"
    }
  }
}

Deployment

This application is designed for on-prem deployment and can function offline after the initial setup. All dependencies are included in the Docker images.

Stopping the Application

To stop running containers:

docker-compose down

Troubleshooting

Port Conflicts: Ensure port 80 is available or modify docker-compose.yml accordingly.

Authentication Errors: Verify your API key/JWT is correctly set in requests.

Docker Issues: Run docker system prune -a to clear cached images and try again.
