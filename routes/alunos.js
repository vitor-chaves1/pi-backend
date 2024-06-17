const express = require('express');
const controllerAlunos = require('../controllers/alunos');
const router = express.Router();

router.post('/alunos/', controllerAlunos.validarAluno, controllerAlunos.cadastrarAluno);


router.get('/alunos/', controllerAlunos.listarAlunos);


router.get('/alunos/:alunoId', controllerAlunos.buscarAluno, controllerAlunos.obterAluno);


router.put('/alunos/:alunoId', controllerAlunos.buscarAluno, controllerAlunos.validarAluno, controllerAlunos.atualizarDadosAluno);


router.put('/alunos/:alunoId/cursos/:cursoId', controllerAlunos.buscarAluno, controllerAlunos.adicionarCursoAluno);


router.delete('/alunos/:alunoId/cursos/:cursoId', controllerAlunos.buscarAluno, controllerAlunos.removerCursoAluno)


router.delete('/alunos/:alunoId', controllerAlunos.buscarAluno, controllerAlunos.removerAluno);

module.exports = router;