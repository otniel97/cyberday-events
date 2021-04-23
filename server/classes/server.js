const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const path = require('path');
const db = require('../models');
const { expiration } = require('../jobs/activities');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.routesPath = '../routes/index';
        this.corsOptions = {
            origin: [process.env.CLIENT_CORS_URL],
            optionsSuccessStatus: 200
        };

        //Middlewares
        this.middlewares();

        //Body parser
        this.app.use(express.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(morgan('dev'));
        this.app.use(fileUpload());

        //Routes app
        this.routes();

        //Database connection
        this.database();

        //Jobs
        this.jobs();
    }

    middlewares() {
        //CORS
        this.app.use(cors(this.corsOptions));

        //public directory
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(require(this.routesPath));
        this.app.use((req, res, next) => {
            res.status(404).sendFile(path.join(__dirname, '../../public', '404.html'));
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto:", this.port);
        })
    }

    database() {
        db.sequelize.authenticate().then(() => {
                console.log('Conectado a base de datos')
            })
            .catch(err => {
                console.log('Error de conexión a base de datos: ', err);
            })
    }

    jobs() {
        expiration
    }

}

module.exports = Server;