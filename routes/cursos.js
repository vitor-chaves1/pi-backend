const express = require('express');
const controllerCursos = require('../controllers/cursos');
const router = express.Router();

router.post('/', controllerCursos.validarCurso, controllerCursos.criarCurso);


router.get('/', controllerCursos.listarCursos);


router.get('/:cursoId', controllerCursos.buscarCurso, controllerCursos.obterCurso);


router.put('/:cursoId', controllerCursos.buscarCurso, controllerCursos.validarCurso, controllerCursos.atualizarCurso);


router.put('/:cursoId/alunos/:alunoId', controllerCursos.buscarCurso, controllerCursos.adicionarAlunoCurso);


router.delete('/:cursoId/alunos/:alunoId', controllerCursos.buscarCurso, controllerCursos.removerAlunoCurso)


router.delete('/:cursoId', controllerCursos.buscarCurso, controllerCursos.removerCurso);

module.exports = router;