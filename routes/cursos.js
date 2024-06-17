const express = require('express');
const controllerCursos = require('../controllers/cursos');
const router = express.Router();

router.post('/cursos/', controllerCursos.validarCurso, controllerCursos.criarCurso);


router.get('/cursos/', controllerCursos.listarCursos);


router.get('/cursos/:cursoId', controllerCursos.buscarCurso, controllerCursos.obterCurso);


router.put('/cursos/:cursoId', controllerCursos.buscarCurso, controllerCursos.validarCurso, controllerCursos.atualizarCurso);


router.put('/cursos/:cursoId/alunos/:alunoId', controllerCursos.buscarCurso, controllerCursos.adicionarAlunoCurso);


router.delete('/cursos/:cursoId/alunos/:alunoId', controllerCursos.buscarCurso, controllerCursos.removerAlunoCurso)


router.delete('/cursos/:cursoId', controllerCursos.buscarCurso, controllerCursos.removerCurso);

module.exports = router;