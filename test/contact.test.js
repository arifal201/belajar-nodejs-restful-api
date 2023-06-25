import supertest from "supertest";
import { web } from "../src/application/web.js";
import { createTestUser, removeAllTestContact, removeTestUser } from "./test-util";

describe("POST /api/contacts", () => {
  beforeEach(async () =>{
    await createTestUser();
  })

  afterEach(async () =>{
    await removeAllTestContact();
    await removeTestUser();
  })
  it('should can create contact', async () => {
    const result = await supertest(web)
    .post('/api/contacts')
    .set('Authorization', 'test')
    .send({
      first_name: 'test',
      last_name: 'test',
      email: 'arifal@arifal.com',
      phone: '08976736565'
    });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe('test');
    expect(result.body.data.last_name).toBe('test');
    expect(result.body.data.email).toBe('arifal@arifal.com');
    expect(result.body.data.phone).toBe('08976736565');
  });

  it('should reject if invalid request', async () => {
    const result = await supertest(web)
    .post('/api/contacts')
    .set('Authorization', 'salah')
    .send({
      first_name: '',
      last_name: '',
      email: '',
      phone: ''
    });

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});