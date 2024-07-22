const mongoose = require('mongoose')
require('./config/db')

const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const router = require('./routes')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const flash = require('connect-flash')


require('dotenv').config({path:'variables.env'})

//Crear la app
const app = express();

// Habilitar bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Validación de campos
app.use(expressValidator())

// Habilitar Handlebars como view
app.engine('handlebars', 
    exphbs.engine({
        defaultLayout: 'layout',
        helpers: require('./helpers/handlebars')
    })
);


app.set('view engine', 'handlebars');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser())

app.use(session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        client: mongoose.connection.getClient()
    })
}))

// Alerta y flash messages
app.use(flash())

// Crear Middleware
app.use((req, res, next) =>{
    res.locals.mesajes = req.flash()
    next()
})

app.use('/', router());

app.listen(process.env.PUERTO);