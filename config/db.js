const mongoose = require('mongoose')
require('dotenv').config({path:'variables.env'})

mongoose.connect(process.env.DATABASE)

mongoose.connection.on('error', (error) => {
    console.log(error)
})

// importar modelos
require('../models/Vacantes')
require('../models/Usuarios')