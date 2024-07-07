const express = require('express')
const router = express.Router()
const homeController = require('../controllers/homeController') 
const vacantesControler = require('../controllers/vacantesController')
const Vacantes = require('../models/Vacantes')

module.exports = () => {
    router.get('/', homeController.mostrarTrabajos)

    //Crear vacantes
    router.get('/vacantes/nueva', vacantesControler.formularioNuevaVacante)

    return router
}