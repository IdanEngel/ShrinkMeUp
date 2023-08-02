# ShrinkMeUp - URL Link Shortener

ShrinkMeUp is a simple URL link shortener application that allows users to generate short URLs for long links. This application is built using React (TypeScript) for the frontend and FastAPI (Python) for the backend, with MongoDB as the database.

## Requirements

Before running the ShrinkMeUp app, make sure you have the following prerequisites installed on your system:

- Docker
- Docker Compose

## Getting Started

To run the ShrinkMeUp app, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ShrinkMeUp.git
   cd ShrinkMeUp

2. Build the Docker images:

    ```bash
    docker-compose build
3. Run the Docker containers:
    ```bash
    docker-compose up

   
The ShrinkMeUp app will now be running locally. You can access the application in your web browser
by navigating to http://localhost:3000.

## Usage
1. Open your web browser and go to http://localhost:3000.
2. Enter a long URL that you want to shorten in the input field.
3. Click on the "Shorten" button.
4. You will receive a short URL for the entered long URL.
5. To use the short URL, simply copy it and share it with others.

## Additional Information
* The ShrinkMeUp app uses a custom Docker setup to run both the frontend and backend applications in separate containers.
* The frontend is built with React (TypeScript) and communicates with the backend API to generate short URLs.
* The backend is built with FastAPI (Python) and uses MongoDB as the database to store the original and short URLs.
* MongoDB is automatically set up and used as a data store for the application.

## Credits
The ShrinkMeUp app is developed by Idan Engel.

## License
This project is licensed under the MIT License. Feel free to use, modify, and distribute it as per the terms of the license.

#### Happy shortening with ShrinkMeUp! 🚀

