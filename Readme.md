# Statistical Distributions Visualization Application

A web application for visualizing and exploring statistical distributions, built with Python Bottle framework and interactive JavaScript visualization.

## Overview

This application provides an interactive platform for users to explore various statistical distributions. It features:

- User authentication with JWT tokens
- Role-based access control (user/admin roles)
- Interactive visualization of over 50 statistical distributions
- Customizable distribution parameters
- RESTful API for distribution data

## Technology Stack

- **Backend**: Python 3.9 with Bottle framework
- **Frontend**: HTML, CSS, JavaScript with Plotly.js for visualizations
- **Authentication**: JWT (JSON Web Tokens)
- **Statistical Computation**: NumPy and SciPy
- **Testing**: pytest with coverage reporting
- **Containerization**: Docker

## Project Structure
├── app.py # Main application entry point

├── auth.py # Authentication and authorization logic

├── distributions.py # Statistical distribution calculations

├── Dockerfile # Docker configuration

├── requirements.txt # Python dependencies

├── static/ # Frontend assets

│ ├── index.html # Main HTML page

│ ├── scripts.js # Frontend JavaScript

│ └── styles.css # CSS styling

└── test.py # Test suite



## Features

### Authentication System

- Secure login with username/password
- JWT token generation and validation
- Role-based access control (user/admin)
- Token expiration and refresh

### Distribution Visualization

The application supports a wide range of statistical distributions, including:

- Normal, Exponential, Gamma, Beta, Lognormal
- Chi-square, Student's t, F-distribution
- Binomial, Poisson, Geometric, Hypergeometric
- Many specialized distributions (Nakagami, Mielke, Lomax, etc.)

Each distribution can be customized with specific parameters relevant to that distribution type.

### API Endpoints

- `POST /api/login`: Authenticate and receive a JWT token
- `POST /api/distribution/<distribution_type>`: Get distribution data for visualization
- `GET /`: Serve the main application page
- `GET /static/<filepath>`: Serve static assets

## Setup and Installation

### Prerequisites

- Python 3.9+
- pip (Python package manager)

### Local Development

1. Clone the repository
2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Set environment variables (optional):
   ```
   export JWT_SECRET_KEY=your_secure_key_here
   ```
4. Run the application:
   ```
   python app.py
   ```
5. Access the application at http://localhost:8080

### Docker Deployment

1. Build the Docker image:
   ```
   docker build -t statistical-distributions .
   ```
2. Run the container:
   ```
   docker run -p 8080:8080 -e JWT_SECRET_KEY=your_secure_key_here statistical-distributions
   ```
3. Access the application at http://localhost:8080

## Testing

The application includes comprehensive tests covering authentication, API endpoints, and distribution calculations.

Run tests with:
pytest test.py

For test coverage report:
pytest --cov=. test.py

## Security Considerations

- JWT tokens are used for secure authentication
- Passwords are hashed using SHA-256 (in a production environment, use a more secure hashing algorithm like bcrypt)
- Role-based access control for protected endpoints
- Error handling to prevent information leakage
- CORS headers for API security

## User Guide

1. **Login**: Use the provided credentials (admin/password123 or user/userpass)
2. **Select Distribution**: Choose from the dropdown menu
3. **Adjust Parameters**: Modify the distribution parameters using the provided controls
4. **View Visualization**: The plot updates automatically to reflect your changes

## Development Guidelines

- Follow PEP 8 for Python code style
- Implement proper error handling and logging
- Maintain separation of concerns (MVC pattern)
- Write tests for new features
- Document code and API endpoints

## License

This project is licensed under the MIT License - see the LICENSE file for details.