## CYBER DAY EVENTS TEST

API REST para gestión de eventos y actividades, para una prueba técnica.

### Required software to install
- Node.js > 12.9
- Mysql


### How to start
```
$ config .env file
$ npm install
$ npm run database
$ npm run dev


## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
PORT = 3000
NODE_ENV = development
CLIENT_CORS_URL = http://localhost:8080

DATABASE_DEV_USERNAME = your credential
DATABASE_DEV_PASSWORD = your credential
DATABASE_DEV_NAME = cyberday
DATABASE_DEV_HOST = localhost
DATABASE_DEV_DIALECT = mysql
```

## Project Structure

```
server\
 |--classes\        # Config server
 |--config\         # Environment variables and configuration database
 |--controllers\    # Route controllers
 |--jobs\           # Job functions
 |--migrations\     # Sequelize migrations
 |--models\         # Sequelize models
 |--routes\         # Routes
 |--seeders\        # Sequelize seeders
 |--services\       # Services logic
 |--utils\          # Utility classes, validations and functions
 |--app.js          # Express app
```

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:3000` in your browser.
https://documenter.getpostman.com/view/5329691/TzJx6v8P
