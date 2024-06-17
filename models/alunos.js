const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    telefone: {
        type: String
    },
    cursos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso'
    }]
});

module.exports = mongoose.model("Aluno", alunoSchema);
