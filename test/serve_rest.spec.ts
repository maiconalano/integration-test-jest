import { faker } from '@faker-js/faker';
import pactum from 'pactum';
import { SimpleReporter } from '../simple-reporter';

describe('ServeRest API', () => {
  let token = '';
  let _id = '';
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://serverest.dev';

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('Login', () => {
    it('POST', async () => {
      token = await p
        .spec()
        .post(`${baseUrl}/login`)
        .withJson({
          email: 'fulano@qa.com',
          password: 'teste'
        })
        .expectStatus(200)
        .returns('authorization');
    });
  });

  describe('Usuários', () => {
    it('GET ALL', async () => {
      await p
        .spec()
        .get(`${baseUrl}/usuarios`)
        .withHeaders('Authorization', token)
        .expectStatus(200);
    });
  });

  describe('Produto', () => {
    it('POST Produto', async () => {
      _id = await p
        .spec()
        .post(`${baseUrl}/produtos`)
        .withHeaders('Authorization', token)
        .withJson({
          nome: faker.commerce.product(),
          preco: 470,
          descricao: 'Mouse',
          quantidade: 381
        })
        .expectStatus(201)
        .returns('_id')
        .expectBodyContains('Cadastro realizado com sucesso');
    });
  });

  describe('Produtos', () => {
    it('GET Produto', async () => {
      await p
        .spec()
        .get(`${baseUrl}/produtos/${_id}`)
        .withHeaders('Authorization', token)
        .expectStatus(200);
    });
  });
});
