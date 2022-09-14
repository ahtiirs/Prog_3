import request from 'supertest';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import app from '../src/app';

const user = {
  email: 'ahti@hts.ee',
  password: 'Tondu',
};

let token: string;
let  newId: number;


describe('Teachers controller test', () => {
    describe('/teachers', () => {
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
        const response = await request(app).get('/teachers');
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(401);
        expect(response.body).to.have.key('error');
        expect(response.body.error).to.equal('Token is not valid');
      });
      it('Test 3 - responds with code 401 and error message because of invalid token', async () => {
        const response = await request(app)
        .get('/teachers')
        .set('Authorization', 'Bearer iudflvdufvudsalfviusd iufdvsidufnds43454f45e');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Token is not valid');
      });

      it('Test 4 - responds with code 200 and list of teachers', async () => {
        const response = await request(app)
          .get('/teachers')
          .set('Authorization', `Bearer ${token}`);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.key('teachers');
        expect(response.body.teachers).to.be.a('array');
        expect(response.body.teachers.length).to.greaterThan(0);
    });

    it('Test 5 - responds with code 400 and error teacher name is required', async () => {
      const response = await request(app)
        .post('/teachers')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Teacher name is required');
     });

     it('Test 6 - responds with code 201 and added teacher ID ', async () => {
      const response = await request(app)
        .post('/teachers')
        .set('Authorization', `Bearer ${token}`)
        .send({
          Name: 'Test_teacher',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.have.key('id');
      expect(response.body.id).to.be.a('number');
      newId = response.body.id;
     });

     it('Test 7 - responds with code 200 and added teacher', async () => {
      const response = await request(app)
        .get(`/teachers/${newId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('teacher');
      expect(response.body.teacher).to.be.a('object');
      // expect(response.body.teacher.length).to.greaterThan(0);
    });

    it('Test 8 - responds with code 204 and added teacher', async () => {
      const response = await request(app)
        .patch(`/teachers/${newId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          Name: 'Test_teacher_changed',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(204);
      expect(response.body).to.be.a('object');
      // expect(response.body.teacher.length).to.greaterThan(0);
    });

    it('Test 9 - responds with code 400 and added teacher', async () => {
      const response = await request(app)
        .get(`/teachers/abc`)
        .set('Authorization', `Bearer ${token}`);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(400);
        expect(response.body).to.have.key('error');
        expect(response.body.error).to.be.a('string');
        expect(response.body.error).to.equal('No valid id provided');
      // expect(response.body.teacher.length).to.greaterThan(0);
    });
    it('Test 10 - responds with code 400 and not found teacher', async () => {
      const response = await request(app)
        .get(`/teachers/99999999`)
        .set('Authorization', `Bearer ${token}`);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(400);
        expect(response.body).to.have.key('error');
        expect(response.body.error).to.be.a('string');
        expect(response.body.error).to.equal('No teacher found with id: 99999999');
      });

     it('Test 11 - responds with code 204 and delete added test ID ', async () => {
      const response = await request(app)
        .delete(`/teachers/${newId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).to.equal(204);
      expect(response.body).to.be.a('object');


     });

     it('Test 12 - responds with code 400 and error no valid ID ', async () => {
      const response = await request(app)
        .delete(`/teachers/abcid`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('No valid id provided');
     });

    //  it('Test 13 - responds with code 400 and ID not found ', async () => {
    //   const response = await request(app)
    //     .delete(`/teachers/${newId}`)
    //     .set('Authorization', `Bearer ${token}`);
    //   expect(response.statusCode).to.equal(400);
    //   expect(response.body).to.be.a('object');
    //   expect(response.body).to.have.key('error');
    //   expect(response.body.error).to.be.a('string');
    //   expect(response.body.error).to.equal(`teacher not found with id: ${newId}`);
    //  });


    });
  });

  

