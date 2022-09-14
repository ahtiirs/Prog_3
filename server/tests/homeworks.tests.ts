import request from 'supertest';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import app from '../src/app';

const user = {
  email: 'ahti@hts.ee',
  password: 'Tondu',
};

let token: string;
let newId: number;

describe('Homeworks controller', () => {
    describe('GET /homeworks', () => {
      it('Test 1 - responds with code 200 and token after login', async () => {
        const response = await request(app)
          .post('/login')
          .send(user);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.key('token');
        expect(response.body.token).to.be.a('string');
        token = response.body.token;
      });

      it('Test 2 - responds with code 401 and error message because of no token provided', async () => {
        const response = await request(app).get('/homeworks');
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(401);
        expect(response.body).to.have.key('error');
        expect(response.body.error).to.equal('Token is not valid');
      });

      it('Test 3 - responds with code 401 and error message because of invalid token', async () => {
        const response = await request(app)
        .get('/homeworks')
        .set('Authorization', 'Bearer iudflvdufvudsalfviusd iufdvsidufnds43454f45e');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Token is not valid');
      });

      it('Test 4 - responds with code 200 and list of homeworks', async () => {
        const response = await request(app)
          .get('/homeworks')
          .set('Authorization', `Bearer ${token}`);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.key('homeworks');
        expect(response.body.homeworks).to.be.a('array');
        expect(response.body.homeworks.length).to.greaterThan(0);
    });

      it('Test 5 - responds with code 201 and added homework ID ', async () => {
        const response = await request(app)
          .post('/homeworks')
          .set('Authorization', `Bearer ${token}`)
          .send({
            description: 'Test_desc',
            dueDate: '2022-01-05 23:25:17.0',
            user: 1,
            teacher: 1,   
            course: 1, 
            group: 1,

          });
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(201);
        expect(response.body).to.have.key('id');
        expect(response.body.id).to.be.a('number');
        newId = response.body.id;
      });

      it('Test 6 - responds with code 200 and homework', async () => {
        const response = await request(app)
          .get(`/homeworks/${newId}`)
          .set('Authorization', `Bearer ${token}`);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.key('homework');
        expect(response.body.homework).to.be.a('object');
        // expect(response.body.user.length).to.greaterThan(0);
      });

      it('Test 7 - responds with code 204 and modified rows nr', async () => {
        const response = await request(app)
          .patch(`/homeworks/${newId}`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            description: 'Test_modi_desc',
            dueDate: '2023-01-05 23:25:17.0',
            user: 1,
            teacher: 1,   
            course: 1, 
            group: 1,
          });
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(204);
        expect(response.body).to.be.a('object');
        // expect(response.body.group.length).to.greaterThan(0);
      });

      it('Test 8 - responds with code 204 and delete added test Homework ID ', async () => {
        const response = await request(app)
          .delete(`/homeworks/${newId}`)
          .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).to.equal(204);
        expect(response.body).to.be.a('object');

  
       });

  });

});

   