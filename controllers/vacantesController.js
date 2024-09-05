const mongoose = require('mongoose')
const Vacante = mongoose.model('Vacante')

exports.formularioNuevaVacante = (req, res) =>{
    res.render('nueva-vacante', {
        nombrePagina: 'Nueva Vacante',
        tagline: 'Llena el formulario y publica tu vacante',
        cerrarSesion:true,
        nombre: req.user.nombre,
    })
}

// Agrega las vacantes a la base de datos
exports.agregarVacante = async (req, res) =>{
    const vacante = new Vacante(req.body)

    // Usuario autor de la vacante
    vacante.autor = req.user._id

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

// Editar Vacante

exports.formEditarVacante = async (req, res, next) =>{

    const vacante = await Vacante.findOne({url: req.params.url}).lean() //para que funcione en handlebars debe colocar el .lean() a la consulta.

    if(!vacante) return next()


    res.render('editar-vacante', {
        nombrePagina: `Editar - ${vacante.titulo}`,
        vacante: vacante,
        cerrarSesion:true,
        nombre: req.user.nombre,
    })
}

exports.editarVacante = async (req, res, next) =>{

    const vacanteActualizada = req.body
    vacanteActualizada.skills = req.body.skills.split(',')

    const vacante = await Vacante.findOneAndUpdate(
        {url: req.params.url}, 
        vacanteActualizada, 
        {new: true, runValidators:true}
    )

    res.redirect(`/vacantes/${vacante.url}`)

}