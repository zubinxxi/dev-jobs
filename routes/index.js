const express = require('express')
const router = express.Router()
const homeController = require('../controllers/homeController') 
const vacantesControler = require('../controllers/vacantesController')
const Vacantes = require('../models/Vacantes')

module.exports = () => {
    router.get('/', homeController.mostrarTrabajos)

    //Crear vacantes
    router.get('/vacantes/nueva', vacantesControler.formularioNuevaVacante)
    router.post('/vacantes/nueva', vacantesControler.agregarVacante)

    // Mostrar Vacante
    router.get('/vacantes/:url', vacantesControler.mostrarVacante)

    return router
}