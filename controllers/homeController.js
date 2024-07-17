const mongoose = require('mongoose')
const Vacante = mongoose.model('Vacante')

exports.mostrarTrabajos = async (req, res) =>{

    //Consulta que trae las vacantes desde la base de datos.
    const vacantes = await Vacante.find().lean() //para que funcione en handlebars debe colocar el .lean() a la consulta.


    if(!vacantes) return next()

    res.render('home', {
        nombrePagina: 'devJobs',
        tagline: 'Encuentra y Pública Trabajos para Desarrolladores Web',
        barra: true,
        boton: true,
        vacantes: vacantes
    })
}