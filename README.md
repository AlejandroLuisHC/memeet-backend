[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CodeFactor](https://www.codefactor.io/repository/github/alejandroluishc/memeet-backend/badge)](https://www.codefactor.io/repository/github/alejandroluishc/memeet-backend)
# Memeet (Backend API)
![This is Memeet](https://gifybucket.s3.eu-west-1.amazonaws.com/memeat+banner.png)
<br/>
This is the backend repository for the [Memeet repository](https://github.com/AlejandroLuisHC/memeet).

## Getting Started 🚀

1. Clone the repository: `git clone https://github.com/AlejandroLuisHC/memeet-backend.git`
2. Install the dependencies: `npm install`
3. Create a `.env` file in the root of the project and set the environment following the stucture provided in the `.env.example`
4. Start the development server: `npm run dev`
5. Open the browser and navigate to your localhost port to access the API.

### Requirements 📋

_You need to install nodejs_

Go to [NodeJS web page](https://nodejs.org/es/) download and install the
program.

## Endpoints and actions 🔍

### `/api/users` Endpoint

- **GET** `/`: Retrieves a list of all users.
- **GET** `/:id`: Retrieves a specific user by their `id`.
- **POST** `/`: Creates a new user.
- **DELETE** `/:id`: Deletes a specific user by their `id`.
- **PATCH** `/:id`: Updates a specific user by their `id`. 

### `/api/memes` Endpoint

- **GET** `/`: Retrieves a list of all memes.
- **GET** `/:id`: Retrieves a specific meme by their `id`.
- **POST** `/`: Creates a new meme.
- **DELETE** `/:id`: Deletes a specific meme by their `id`.
- **PATCH** `/:id`: Updates a specific meme by their `id`. 

### `/api/tags` Endpoint

- **GET** `/`: Retrieves a list of all tags available.
- **POST** `/`: Creates a new tag.

## Built with 🛠️
- **Express.js**: A web application framework for Node.js
- **Mongoose**: A MongoDB object modeling tool for Node.js
- **Cors**: A middleware for handling CORS (Cross-Origin Resource Sharing)
- **Helmet**: A collection of middlewares for security-related HTTP headers
- **Morgan**: A middleware for logging HTTP requests
- **Nodemon**: A utility that automatically restarts the Node.js application when changes are detected
- **Express-jwt**: A middleware for validating JWTs (JSON Web Tokens)
- **Jwks-rsa**: A library for retrieving RSA signing keys from a JWKS (JSON Web Key Set) endpoint
- **Auth0**: An authentication and authorization platform for web and mobile apps
- **AWS S3 Bucket**: An object storage service that provides scalable and secure storage for unstructured data.

## Contributing 🖇️

I welcome any contributions to Memeet (Backend API). To contribute, please follow these steps:

1. Fork the repository by clicking the "Fork" button in the top right corner of this page.
2. Clone the forked repository to your local machine by running `git clone https://github.com/[your-name]/memeet-backend.git` in your terminal.
3. Create a new branch for your contribution by running `git checkout -b [branch-name]`.
4. Make your changes and test them thoroughly.
5. Commit your changes by running `git commit -m "[commit message]"`.
6. Push your changes to your forked repository by running `git push origin [branch-name]`.
7. Create a new pull request by navigating to your forked repository on GitHub, selecting the branch you just pushed, and clicking the "New pull request" button.
8. Provide a clear and detailed description of your changes and why they are necessary.
9. We will review your pull request and provide feedback. Once it is approved, your changes will be merged.

Thank you for your contributions! 🎉
