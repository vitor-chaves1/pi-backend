const supertest = require("supertest");

const app = require('../app');

const request = supertest(app);

let cursoId = null;

describe('Testes Cursos', () => {
    test('POST / (cadastrar curso) deve retornar 201 e um JSON', async () => {
        const response = await request.post('/cursos').send({ "nome": 'Curso Teste' });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('nome', 'Curso Teste');
        expect(response.body).toHaveProperty('alunos', []);
        expect(response.type).toBe('application/json');
        cursoId = response.body._id.toString();
    });
    test('POST / (cadastrar curso invalido) deve retornar 422 e um JSON', async () => {
        const response = await request.post('/cursos').send({});
        expect(response.status).toBe(422);
        expect(response.type).toBe("application/json");
        expect(response.body).toHaveProperty('msg', 'Dados do curso inválidos');
    });
    test('GET / (listar cursos) deve retornar 200 e um JSON', async () => {
        const response = await request.get('/cursos');
        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
        expect(Array.isArray(response.body)).toBe(true);
    });
    test('GET /cursos/:id (obter curso) deve retornar 200 e um JSON', async () => {
        const response = await request.get(`/cursos/${cursoId}`);
        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
        expect(response.body).toHaveProperty('nome', 'Curso Teste');
        expect(response.body).toHaveProperty('alunos', []);
    });
    test('GET /cursos/123456789012345678901234 (obter curso invalido) deve retornar 404 e um JSON', async () => {
        const response = await request.get('/cursos/123456789012345678901234');
        expect(response.status).toBe(404);
        expect(response.type).toBe("application/json");
        expect(response.body).toHaveProperty('msg', 'Curso não encontrado');
    });
    test('PUT /cursos/:id (atualizar dados do curso) deve retornar 200 e um JSON', async () => {
        const response = await request.put(`/cursos/${cursoId}`).send({ nome: 'Curso Atualizado' });
        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
    });
    test('PUT /cursos/:id (atualizar curso com dados invalidos) deve retornar 422 e um JSON', async () => {
        const response = await request.put(`/cursos/${cursoId}`).send({});
        expect(response.status).toBe(422);
        expect(response.type).toBe("application/json");
        expect(response.body).toHaveProperty('msg', 'Dados do curso inválidos');
    });
    test('PUT /cursos/123456789012345678901234 (atualizar curso inexistente) deve retornar 404 e um JSON', async () => {
        const response = await request.put('/cursos/123456789012345678901234');
        expect(response.status).toBe(404);
        expect(response.type).toBe("application/json");
        expect(response.body).toHaveProperty('msg', 'Curso não encontrado');
    });
    test('DELETE /cursos/:id (remover curso) deve retornar 204 sem conteúdo', async () => {
        const response = await request.delete(`/cursos/${cursoId}`);
        expect(response.status).toBe(204);
        expect(response.type).toBe("");
    });
    test('DELETE /cursos/123456789012345678901234 (remover curso inexistente) deve retornar 404 e um JSON', async () => {
        const response = await request.delete('/cursos/123456789012345678901234');
        expect(response.status).toBe(404);
        expect(response.type).toBe("application/json");
        expect(response.body).toHaveProperty('msg', 'Curso não encontrado');
    });
});