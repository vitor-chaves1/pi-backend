const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    alunos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aluno'
    }]
});

module.exports = mongoose.model('Curso', cursoSchema);