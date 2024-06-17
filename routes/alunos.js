const express = require('express');
const controllerAlunos = require('../controllers/alunos');
const router = express.Router();

router.post('/', controllerAlunos.validarAluno, controllerAlunos.cadastrarAluno);


router.get('/', controllerAlunos.listarAlunos);


router.get('/:alunoId', controllerAlunos.buscarAluno, controllerAlunos.obterAluno);


router.put('/:alunoId', controllerAlunos.buscarAluno, controllerAlunos.validarAluno, controllerAlunos.atualizarDadosAluno);


router.put('/:alunoId/cursos/:cursoId', controllerAlunos.buscarAluno, controllerAlunos.adicionarCursoAluno);


router.delete('/:alunoId/cursos/:cursoId', controllerAlunos.buscarAluno, controllerAlunos.removerCursoAluno)


router.delete('/:alunoId', controllerAlunos.buscarAluno, controllerAlunos.removerAluno);

module.exports = router;