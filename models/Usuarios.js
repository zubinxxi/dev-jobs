const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const bcrypt = require('bcrypt')

const usuariosSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },

    nombre: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
        trim: true
    },

    token: String,

    expira: Date
})

// Metodo para Hashear los password
usuariosSchema.pre('save', async function(next){
    // Si el password esta hasheado
    if (!this.isModified('password')) {
        return next() //Se detiene la ejecución
    }

    //Si no esta hasheado
    const hash = await bcrypt.hash(this.password, 12) 
    this.password = hash
    next()
})

module.exports = mongoose.model('Usuarios', usuariosSchema)