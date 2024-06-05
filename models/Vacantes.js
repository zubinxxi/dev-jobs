const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const slug = require('slug')

const shortid = require('shortid')

const vacantesSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: 'El nombre de la vacante es obligatorio',
        trim: true
    },

    empresa: {
        type: String,
        trim: true
    },

    ubicacion: {
        type: String,
        required: 'La ubicación es obligatoria',
        trim: true
    },

    salario: {
        type: String,
        default: 0,
    },

    contrato: {
        type: String,

    },

    descripcion: {
        type:String, 
        trim: true
    },

    url: {
        type: String,
        lowercase: true
    },
    skills: [{
        nombre: String,
        email: String,
        cv: String
    }]
})

vacantesSchema.pre('save', function(next) {
    // crear la url
    const url = slug(this.titulo)
    this.url = `${url}-${shortid.generate()}`


    netx()
})

module.exports = mongoose.model('Vacante', vacantesSchema)