const mongoose = require('mongoose');
const Curso = require('../models/cursos');
const Aluno = require('../models/alunos')

async function criarCurso(req, res) {
    const curso = await Curso.create(req.body);
    res.status(201).json(curso);
}

async function validarCurso(req, res, next) {
    const curso = new Curso(req.body);
    try {
        await curso.validate();
        next();
    } catch (error) {
        res.status(422).json({ msg: 'Dados do curso inválidos' });
    }
}


async function listarCursos(req, res) {
    const cursos = await Curso.find({});
    res.json(cursos);
}

async function obterCurso(req, res) {
    const id = new mongoose.Types.ObjectId(req.params.cursoId);
    const curso = await Curso.findOne({ _id: id });
    res.json(curso);
}


async function buscarCurso(req, res, next) {
    const id = new mongoose.Types.ObjectId(req.params.cursoId);
    const curso = await Curso.findOne({ _id: id });
    if (!curso) {
        res.status(404).json({ msg: 'Curso não encontrado' });
    } else {
        next();
    }
}

async function atualizarCurso(req, res) {
    const id = new mongoose.Types.ObjectId(req.params.cursoId);
    if (req.body.alunos) {
        delete req.body.alunos
    }
    const curso = await Curso.findOneAndUpdate({ _id: id }, req.body).populate('alunos');
    res.json(curso);
}

async function adicionarAlunoCurso(req, res) {
    const curso = await Curso.findById(req.params.cursoId);
    const alunoId = req.params.alunoId;

    if (curso.alunos.indexOf(alunoId) === -1) {
        curso.alunos.push(alunoId);
        await curso.save();
        res.status(200).json({ mensagem: "Aluno adicionado ao curso com sucesso" });
    } else {
        res.status(400).json({ mensagem: "O aluno já está matriculado neste curso" });
    }
}

async function removerAlunoCurso(req, res) {
    const curso = await Curso.findById(req.params.cursoId);
    const alunoId = req.params.alunoId;

    const alunoIndex = curso.alunos.indexOf(alunoId);
    if (alunoIndex > -1) {
        curso.alunos.splice(alunoIndex, 1);
        await curso.save();
        res.status(200).json({ mensagem: "Aluno removido do curso com sucesso" });
    } else {
        res.status(400).json({ mensagem: "O aluno não está matriculado neste curso" });
    }
}

async function removerCurso(req, res) {
    const id = new mongoose.Types.ObjectId(req.params.cursoId);
    //remover referencias
    await Aluno.updateMany({ cursos: req.params.cursoId }, { $pull: { cursos: req.params.cursoId } });
    await Curso.findOneAndDelete({ _id: id });
    res.status(204).end();
}

module.exports = { criarCurso, validarCurso, listarCursos, obterCurso, buscarCurso, atualizarCurso, adicionarAlunoCurso, removerAlunoCurso, removerCurso };