const mongoose = require('mongoose')
const Vacante = mongoose.model('Vacante')
const passport = require('passport')


exports.autenticarUsuario = passport.authenticate('local', {      
    successRedirect: '/administracion',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
})

// Revisar si el usuario está autenticado o no.
exports.verificarUsuario = (req, res, next) => {
    // Revisar el usuario
    if(req.isAuthenticated()){
        return next()
    }


    // Redirecionar a inicir sesion
    res.redirect('iniciar-sesion')
}

exports.mostrarPanel = async (req, res) => {
    // Consultar el usuario autenticado
    const vacantes = await Vacante.find({autor: req.user._id}).lean()
    res.render('administracion', {
        nombrePagina: 'Panel de Administración',
        tagline: 'Crea y Administra tus vacantes desde aquí',
        vacantes:vacantes
    })
}