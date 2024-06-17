const mongoose = require('mongoose');
const Aluno = require('../models/alunos');
const Curso = require('../models/cursos')

async function cadastrarAluno(req, res) {
    const aluno = await Aluno.create(req.body);
    res.status(201).json(aluno);
}

async function validarAluno(req, res, next) {
    const aluno = new Aluno(req.body);
    try {
        await aluno.validate();
        next();
    } catch (error) {
        res.status(422).json({ msg: 'Dados do aluno inválidos' });
    }
}

async function listarAlunos(req, res) {
    const alunos = await Aluno.find({});
    res.json(alunos);
}

async function obterAluno(req, res) {
    const id = new mongoose.Types.ObjectId(req.params.alunoId);
    const aluno = await Aluno.findOne({ _id: id });
    res.json(aluno);
}

async function buscarAluno(req, res, next) {
    const id = new mongoose.Types.ObjectId(req.params.alunoId);
    const aluno = await Aluno.findOne({ _id: id });
    if (!aluno) {
        res.status(404).json({ msg: 'Aluno não encontrado' });
    } else {
        next();
    }
}

// Atualizar um aluno (protegendo o campo cursos)
async function atualizarDadosAluno(req, res) {
    const id = new mongoose.Types.ObjectId(req.params.alunoId);
    if (req.body.cursos) {
        delete req.body.cursos
    }
    const aluno = await Aluno.findOneAndUpdate({ _id: id }, req.body).populate('cursos');
    res.json(aluno);
}

// Adicionar um curso a um Aluno
async function adicionarCursoAluno(req, res) {
    const aluno = await Aluno.findById(req.params.alunoId);
    const cursoId = new mongoose.Types.ObjectId(req.params.cursoId)

    //verifica se o aluno ja esta matriculado no curso
    if (aluno.cursos.indexOf(cursoId) === -1) {
        aluno.cursos.push(cursoId);
        await aluno.save();
        res.status(200).json({ msg: "Curso adicionado ao aluno com sucesso" });
    } else {
        res.status(400).json({ msg: "O aluno já está matriculado neste curso" });
    }
}

// remover um curso de um Aluno
async function removerCursoAluno(req, res) {
    const aluno = await Aluno.findById(req.params.alunoId);
    const cursoId = new mongoose.Types.ObjectId(req.params.cursoId)
    const cursoIndex = aluno.cursos.indexOf(cursoId);

    //verifica se o aluno esta matriculado no curso
    if (cursoIndex > -1) {
        aluno.cursos.splice(cursoIndex, 1);
        await aluno.save();
        res.status(200).json({ mensagem: "Curso removido do aluno com sucesso" });
    } else {
        res.status(400).json({ mensagem: "O aluno não está matriculado neste curso" });
    }

}

async function removerAluno(req, res) {
    const id = new mongoose.Types.ObjectId(req.params.alunoId);

    //remover referencias
    await Curso.updateMany({ alunos: req.params.alunoId }, { $pull: { alunos: req.params.alunoId } });

    await Aluno.findOneAndDelete({ _id: id });
    res.status(204).end();
}

module.exports = { cadastrarAluno, validarAluno, listarAlunos, obterAluno, buscarAluno, atualizarDadosAluno, adicionarCursoAluno, removerCursoAluno, removerAluno };