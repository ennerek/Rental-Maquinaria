const express = require('express');
const cors = require('cors');
const connectDB = require('./database/config');
const { port } = require('./config');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport');
const cookieParser = require('cookie-parser');
const path = require('path');
const hbs = require('hbs');
const config  = require('./config');




class Server {
    constructor() {
        this.app = express();

        this.paths = {
            users: '/api/users',
            auth: '/api/auth',
            machineries: '/api/machineries',
            rentalMachinery: '/api/rentalMachinery'
        }

        this.dbConnection();

        this.middlewares();

        this.routes();
    }

    async dbConnection() {
        await connectDB();
    }

    middlewares() {
        this.app.use(cookieParser());
        this.app.use(passport.initialize());

        this.app.use(session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: false
        }));
        
        this.app.use(passport.authenticate('session'));


        this.app.use(cors({
            origin: process.env.CLIENT_URL,
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH']
        }));
        this.app.use(express.json());
        
        // this.app.set('view engine', 'hbs');
       
        // this.app.use( express.static('../../../views') )
         

    }
    

   
    routes() {
        this.app.use(this.paths.users, require('./routes/users'));
        this.app.use(this.paths.auth, require('./routes/auth'));
        this.app.use(this.paths.machineries, require('./routes/machineries'));
        this.app.use(this.paths.rentalMachinery, require('./routes/rentalMachinery'));
    }

    listen() {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
}


module.exports = Server;