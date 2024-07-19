

exports.formCrearCuenta = (req, res) =>{
    res.render('crear-cuenta', {
        nombrePagina: 'Crea tu cuenta en devJobs',
        tagline: 'Comienza a publicar tus vacantes gratis, sólo debes crear una cuenta'
    })
}