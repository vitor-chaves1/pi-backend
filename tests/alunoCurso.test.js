const supertest = require("supertest");

const app = require('../app');

const request = supertest(app);

let alunoId = null;
let cursoId = null;

describe('Testes Alunos + Cursos', () => {
    test('POST / (cadastrar aluno) deve retornar 201 e um JSON', async () => {
        const response = await request.post('/alunos').send({ "nome": 'Vitor', "email": "vitor@email.com", "telefone": "123123" });
        expect(response.status).toBe(201);
        expect(response.type).toBe('application/json');
        alunoId = response.body._id.toString();
    });
    test('POST / (cadastrar curso) deve retornar 201 e um JSON', async () => {
        const response = await request.post('/cursos').send({ "nome": 'Curso Teste' });
        expect(response.status).toBe(201);
        expect(response.type).toBe('application/json');
        cursoId = response.body._id.toString();
    });
    test('PUT /alunos/:alunoId/cursos/:cursoId (adicionar curso ao aluno) deve retornar 200 e um JSON', async () => {
        const response = await request.put(`/alunos/${alunoId}/cursos/${cursoId}`);
        expect(response.status).toBe(200)
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('msg', 'Curso adicionado ao aluno com sucesso');
    })
    test('PUT /cursos/:cursoId/alunos/:alunoId (adicionar aluno já inscrito no curso) deve retornar 400 e um JSON', async () => {
        const response = await request.put(`/cursos/${cursoId}/alunos/${alunoId}`);
        expect(response.status).toBe(400)
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('mensagem', 'O aluno já está matriculado neste curso');
    })
    test('GET /cursos/:cursoId (obter curso) deve retornar um aluno no array alunos', async () => {
        const response = await request.get(`/cursos/${cursoId}`);
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('alunos', [`${alunoId}`])
    })

    test('DELETE /cursos/:cursoId/alunos/:alunoId (remover aluno do curso após o aluno ter o curso atribuido) deve retornar 200, um json e remover a referencia do curso na colecao aluno', async () => {
        const response = await request.delete(`/cursos/${cursoId}/alunos/${alunoId}`);
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('mensagem', 'Aluno removido do curso com sucesso')
    })

    test('GET /alunos/:alunoId (obter aluno após o remover do curso) deve retornar array cursos vazio', async () => {
        const response = await request.get(`/alunos/${alunoId}`);
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('cursos', [])
    })

    test('PUT /cursos/:cursoId/alunos/:alunoId (adicionar aluno ao curso) deve retornar 200 e um JSON', async () => {
        const response = await request.put(`/cursos/${cursoId}/alunos/${alunoId}`);
        expect(response.status).toBe(200)
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty("mensagem", "Aluno adicionado ao curso com sucesso");
    })

    test('PUT /alunos/:alunoId/cursos/:cursoId (adicionar curso ao aluno já inscrito) deve retornar 400 e um JSON', async () => {
        const response = await request.put(`/alunos/${alunoId}/cursos/${cursoId}`);
        expect(response.status).toBe(400)
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('msg', 'O aluno já está matriculado neste curso');
    })

    test('DELETE /alunos/:id (remover aluno) deve retornar 204 sem conteúdo remover suas referencias nos cursos inscrito', async () => {
        const response = await request.delete(`/alunos/${alunoId}`);
        expect(response.status).toBe(204);
        expect(response.type).toBe("");
    });

    test('GET /cursos/:cursoId (obter curso após deletar o aluno) deve retornar array alunos vazio', async () => {
        const response = await request.get(`/cursos/${cursoId}`);
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('alunos', [])
    })

    test('DELETE /cursos/:id (remover curso) deve retornar 204 sem conteúdo', async () => {
        const response = await request.delete(`/cursos/${cursoId}`);
        expect(response.status).toBe(204);
        expect(response.type).toBe("");
    });
});