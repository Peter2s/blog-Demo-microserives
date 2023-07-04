# blog-Demo-microserives



This project is a sample demo implementation of a blog application using microservices architecture. 
It consists of several microservices built with Express.js and a React front-end. The microservices include the following:

- **Post Service**: Manages blog posts, creating new posts.
- **Comment Service**: Handles comments on blog posts, allowing users to add and view comments.
- **Query Service**: Provides read access to the blog posts and comments data for querying and displaying on the front-end.
- **Moderation Service**: Moderates comments by filtering out inappropriate or offensive content.
- **Event Bus Service**: Handles event communication between the microservices using a publish-subscribe pattern.

## Technologies Used

- Express.js: A minimal and flexible web application framework for Node.js used for building the microservices.
- React: A popular JavaScript library for building user interfaces used for the front-end application.
- Event Bus: A custom event bus implementation for inter-microservice communication.
- Docker: Used for containerization and deployment of the microservices.
- MongoDB: A NoSQL database used for storing the blog posts and comments data.


### Prerequisites

- Node.js and npm: Make sure you have Node.js and npm installed on your machine.
- Docker: Install Docker to run the microservices in containers.
