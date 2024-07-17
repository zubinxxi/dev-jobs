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

    // Editar vacante
    router.get('/vacante/editar/:url', vacantesControler.formEditarVacante)
    router.post('/vacantes/editar/:url', vacantesControler.editarVacante)

    return router
}