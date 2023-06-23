import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { createTestUser, getUserTest, removeTestUser } from "./test-util.js";
import bcrypt from "bcrypt";

describe("POST /api/users", () => {

  afterEach(async () =>{
    await removeTestUser();
  });

  it('should can register new user', async () => {
    const result  = await supertest(web)
                    .post('/api/users')
                    .send({
                      username: 'test',
                      password: 'rahasia',
                      name: 'test'
                    });
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.name).toBe('test');
    expect(result.body.data.password).toBeUndefined();
  });

  it('should reject if request invalid', async () => {
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
                      username: 'test',
                      password: 'rahasia',
                      name: 'test'
                    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.name).toBe('test');
    expect(result.body.data.password).toBeUndefined();

    result  = await supertest(web)
                    .post('/api/users')
                    .send({
                      username: 'test',
                      password: 'rahasia',
                      name: 'test'
                    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("POST /api/users/login", () => {
  beforeEach(async ()=>{
    await createTestUser();
  });

  afterEach(async ()=>{
    await removeTestUser();
  });

  it('should can login users', async () =>{
    const result = await supertest(web)
    .post('/api/users/login')
    .send({
      username: 'test',
      password: 'rahasia'
    });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe('test');
  });

  it('should reject if request invalid', async () =>{
    const result = await supertest(web)
    .post('/api/users/login')
    .send({
      username: '',
      password: ''
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject password is wrong', async () =>{
    const result = await supertest(web)
    .post('/api/users/login')
    .send({
      username: 'test',
      password: ''
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject if username is wrong', async () =>{
    const result = await supertest(web)
    .post('/api/users/login')
    .send({
      username: 'failed',
      password: 'rahasia'
    });

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/users/current", () => {
  beforeEach(async ()=>{
    await createTestUser();
  });

  afterEach(async ()=>{
    await removeTestUser();
  });

  it('should can get current user', async () => {
    const result = await supertest(web)
    .get('/api/users/current')
    .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.name).toBe('test');
  });

  it('should reject if token invalid', async () => {
    const result = await supertest(web)
    .get('/api/users/current')
    .set('Authorization', 'not found');

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

});

describe("PATCH /api/users/current", () => {

  beforeEach(async ()=>{
    await createTestUser();
  });

  afterEach(async ()=>{
    await removeTestUser();
  });

  it('should can update user', async () => {
    const result = await supertest(web)
    .patch('/api/users/current')
    .set('Authorization', 'test')
    .send({
      name: 'Arifal',
      password: 'PasswordArifal'
    });

    logger.info(result);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.name).toBe('Arifal');

    const user = await getUserTest();
    expect(await bcrypt.compare('PasswordArifal', user.password)).toBe(true);
  });

  it('should can update user name', async () => {
    const result = await supertest(web)
    .patch('/api/users/current')
    .set('Authorization', 'test')
    .send({
      name: 'Arifal'
    });

    logger.info(result);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.name).toBe('Arifal');
  });

  it('should can update user password', async () => {
    const result = await supertest(web)
    .patch('/api/users/current')
    .set('Authorization', 'test')
    .send({
      password: 'PasswordArifal'
    });

    logger.info(result);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.name).toBe('test');

    const user = await getUserTest();
    expect(await bcrypt.compare('PasswordArifal', user.password)).toBe(true);
  });

  it('should reject if request not valid', async () => {
    const result = await supertest(web)
    .patch('/api/users/current')
    .set('Authorization', 'not found')
    .send({});

    logger.info(result);

    expect(result.status).toBe(401);
  });
});

describe("DELETE /api/users/logout", () =>{
  beforeEach(async ()=>{
    await createTestUser();
  });

  afterEach(async ()=>{
    await removeTestUser();
  });

  it('should can delete users logout', async () => {
    const result = await supertest(web)
    .delete('/api/users/logout')
    .set('Authorization', 'test');
    
    const user = await getUserTest();
    expect(result.status).toBe(200);
    expect(user.token).toBeNull();
  });

  it('should failed delete users logout if user with no token or wrong token', async () => {
    const result = await supertest(web)
    .delete('/api/users/logout')
    .set('Authorization', 'not found');

    expect(result.status).toBe(401);
  });
});