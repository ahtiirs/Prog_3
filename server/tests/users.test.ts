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

describe('Ping controller', () => {
    describe('GET /users', () => {
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
        const response = await request(app).get('/users');
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(401);
        expect(response.body).to.have.key('error');
        expect(response.body.error).to.equal('Token is not valid');
      });

      it('Test 3 - responds with code 401 and error message because of invalid token', async () => {
        const response = await request(app)
        .get('/users')
        .set('Authorization', 'Bearer iudflvdufvudsalfviusd iufdvsidufnds43454f45e');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Token is not valid');
      });

      it('Test 4 - responds with code 200 and list of users', async () => {
        const response = await request(app)
          .get('/users')
          .set('Authorization', `Bearer ${token}`);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.key('users');
        expect(response.body.users).to.be.a('array');
        expect(response.body.users.length).to.greaterThan(0);
    });

      it('Test 5 - responds with code 201 and added user ID ', async () => {
        const response = await request(app)
          .post('/users')
          .set('Authorization', `Bearer ${token}`)
          .send({
            firstName: 'Test_firstName',
            lastName: 'Test_LastName',
            email: 'Test_email',
            password: 'Test_pass',           
          });
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(201);
        expect(response.body).to.have.key('id');
        expect(response.body.id).to.be.a('number');
        newId = response.body.id;
      });

      it('Test 6 - responds with code 200 and added group', async () => {
        const response = await request(app)
          .get(`/users/${newId}`)
          .set('Authorization', `Bearer ${token}`);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.key('user');
        expect(response.body.user).to.be.a('object');
        // expect(response.body.user.length).to.greaterThan(0);
      });

      it('Test 7 - responds with code 204 and added group', async () => {
        const response = await request(app)
          .patch(`/users/${newId}`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            firstName: 'Test_group_changed',
            lastName: 'Test_group_changed',
          });
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(204);
        expect(response.body).to.be.a('object');
        // expect(response.body.group.length).to.greaterThan(0);
      });

      it('Test 8 - responds with code 204 and delete added test ID ', async () => {
        const response = await request(app)
          .delete(`/users/${newId}`)
          .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).to.equal(204);
        expect(response.body).to.be.a('object');

  
       });

  });

});

   