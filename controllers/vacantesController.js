const mongoose = require('mongoose')
const Vacante = mongoose.model('Vacante')

exports.formularioNuevaVacante = (req, res) =>{
    res.render('nueva-vacante', {
        nombrePagina: 'Nueva Vacante',
        tagline: 'Llena el formulario y publica tu vacante'
    })
}

// Agrega las vacantes a la base de datos
exports.agregarVacante = async (req, res) =>{
    const vacante = new Vacante(req.body)

    //Crear arreglo de habilidades (skills)
    vacante.skills = req.body.skills.split(',')

    // almacenar en la base de datos
    const nuevaVacante = await vacante.save()

    // redireccionar
    res.redirect(`/vacantes/${nuevaVacante.url}`)

}

// Muestra el detalle de la vacante 
exports.mostrarVacante = async (req, res, next) => {
    const vacante = await Vacante.findOne({url: req.params.url}).lean() //para que funcione en handlebars debe colocar el .lean() a la consulta.

    // si no hay resultados
    if(!vacante) return next()

    res.render('vacante', {
        vacante: vacante,
        nombrePagina: vacante.titulo,
        barra: true
    })
}