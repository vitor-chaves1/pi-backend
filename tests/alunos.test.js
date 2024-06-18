const supertest = require("supertest");

const app = require('../app');

const request = supertest(app);

let alunoId = null;

describe('Testes Alunos', () => {
    test('POST / (cadastrar aluno) deve retornar 201 e um JSON', async () => {
        const response = await request.post('/alunos').send({ "nome": 'Vitor', "email": "vitor@email.com", "telefone": "123123" });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('nome', 'Vitor');
        expect(response.body).toHaveProperty('email', "vitor@email.com");
        expect(response.body).toHaveProperty('telefone', "123123");
        expect(response.body).toHaveProperty('cursos', []);
        expect(response.type).toBe('application/json');
        alunoId = response.body._id.toString();
    });
    test('POST / (cadastrar aluno invalido) deve retornar 422 e um JSON', async () => {
        const response = await request.post('/alunos').send({});
        expect(response.status).toBe(422);
        expect(response.type).toBe("application/json");
        expect(response.body).toHaveProperty('msg', 'Dados do aluno inválidos');
    });
    test('GET / (listar alunos) deve retornar 200 e um JSON', async () => {
        const response = await request.get('/alunos');
        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
        expect(Array.isArray(response.body)).toBe(true);
    });
    test('GET /alunos/:id (obter aluno) deve retornar 200 e um JSON', async () => {
        const response = await request.get(`/alunos/${alunoId}`);
        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
        expect(response.body).toHaveProperty('nome', 'Vitor');
        expect(response.body).toHaveProperty('email', "vitor@email.com");
    });
    test('GET /alunos/123456789012345678901234 (obter aluno invalido) deve retornar 404 e um JSON', async () => {
        const response = await request.get('/alunos/123456789012345678901234');
        expect(response.status).toBe(404);
        expect(response.type).toBe("application/json");
        expect(response.body).toHaveProperty('msg', 'Aluno não encontrado');
    });
    test('PUT /alunos/:id (atualizar dados do aluno) deve retornar 200 e um JSON', async () => {
        const response = await request.put(`/alunos/${alunoId}`).send({ nome: 'Vitor Atualizado', email: "vitoratualizado@email.com" });
        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
    });
    test('PUT /alunos/:id (atualizar aluno com dados invalidos) deve retornar 422 e um JSON', async () => {
        const response = await request.put(`/alunos/${alunoId}`).send({});
        expect(response.status).toBe(422);
        expect(response.type).toBe("application/json");
        expect(response.body).toHaveProperty('msg', 'Dados do aluno inválidos');
    });
    test('PUT /alunos/123456789012345678901234 (atualizar aluno inexistente) deve retornar 404 e um JSON', async () => {
        const response = await request.put('/alunos/123456789012345678901234');
        expect(response.status).toBe(404);
        expect(response.type).toBe("application/json");
        expect(response.body).toHaveProperty('msg', 'Aluno não encontrado');
    });
    test('DELETE /alunos/:id (remover aluno) deve retornar 204 sem conteúdo', async () => {
        const response = await request.delete(`/alunos/${alunoId}`);
        expect(response.status).toBe(204);
        expect(response.type).toBe("");
    });
    test('DELETE /alunos/123456789012345678901234 (remover aluno inexistente) deve retornar 404 e um JSON', async () => {
        const response = await request.delete('/alunos/123456789012345678901234');
        expect(response.status).toBe(404);
        expect(response.type).toBe("application/json");
        expect(response.body).toHaveProperty('msg', 'Aluno não encontrado');
    });
});
