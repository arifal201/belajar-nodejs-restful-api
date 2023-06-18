import supertest from "supertest";
import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";
import { logger } from "../src/application/logging.js";
describe("POST /api/users", () => {

  afterEach(async () =>{
    await prismaClient.user.deleteMany({
      where: {
        username: 'arifal'
      }
    });
  });

  it('should can register new user', async () => {
    const result  = await supertest(web)
                    .post('/api/users')
                    .send({
                      username: 'arifal',
                      password: 'arifalPassword',
                      name: 'Arifal Hidayat Salamulloh'
                    });
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('arifal');
    expect(result.body.data.name).toBe('Arifal Hidayat Salamulloh');
    expect(result.body.data.password).toBeUndefined();
  });

  it('should can register new user', async () => {
    const result  = await supertest(web)
                    .post('/api/users')
                    .send({
                      username: '',
                      password: '',
                      name: ''
                    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject if user already registered', async () => {
    let result  = await supertest(web)
                    .post('/api/users')
                    .send({
                      username: 'arifal',
                      password: 'arifalPassword',
                      name: 'Arifal Hidayat Salamulloh'
                    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('arifal');
    expect(result.body.data.name).toBe('Arifal Hidayat Salamulloh');
    expect(result.body.data.password).toBeUndefined();

    result  = await supertest(web)
                    .post('/api/users')
                    .send({
                      username: 'arifal',
                      password: 'arifalPassword',
                      name: 'Arifal Hidayat Salamulloh'
                    });

    logger.info(result.body);
    logger.info(result.status);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});