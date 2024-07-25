const express = require('express')
const router = express.Router()
const homeController = require('../controllers/homeController') 
const vacantesControler = require('../controllers/vacantesController')
const usuariosController = require('../controllers/usuariosController')
const Vacantes = require('../models/Vacantes')
const authController = require('../controllers/authController')

module.exports = () => {
    router.get('/', homeController.mostrarTrabajos)

    //Crear vacantes
    router.get('/vacantes/nueva', authController.verificarUsuario, vacantesControler.formularioNuevaVacante)
    router.post('/vacantes/nueva', authController.verificarUsuario, vacantesControler.agregarVacante)

    // Mostrar Vacante
    router.get('/vacantes/:url', vacantesControler.mostrarVacante)

    // Editar vacante
    router.get('/vacante/editar/:url', authController.verificarUsuario, vacantesControler.formEditarVacante)
    router.post('/vacantes/editar/:url', authController.verificarUsuario, vacantesControler.editarVacante)

    // Crear cuentas
    router.get('/crear-cuenta', usuariosController.formCrearCuenta)
    router.post('/crear-cuenta', usuariosController.validarRegistro, usuariosController.crearUsuario)

    //Autenticar usuarios
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion)
    router.post('/iniciar-sesion', authController.autenticarUsuario)

    // Panel de administración
    router.get('/administracion', authController.verificarUsuario, authController.mostrarPanel)





    return router
}