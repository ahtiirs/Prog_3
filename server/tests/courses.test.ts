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


describe('Courses controller test', () => {
    describe('/courses', () => {
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
        const response = await request(app).get('/courses');
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(401);
        expect(response.body).to.have.key('error');
        expect(response.body.error).to.equal('Token is not valid');
      });
      it('Test 3 - responds with code 401 and error message because of invalid token', async () => {
        const response = await request(app)
        .get('/courses')
        .set('Authorization', 'Bearer iudflvdufvudsalfviusd iufdvsidufnds43454f45e');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Token is not valid');
      });

      it('Test 4 - responds with code 200 and list of courses', async () => {
        const response = await request(app)
          .get('/courses')
          .set('Authorization', `Bearer ${token}`);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.key('courses');
        expect(response.body.courses).to.be.a('array');
        expect(response.body.courses.length).to.greaterThan(0);
    });

    it('Test 5 - responds with code 400 and error course name is required', async () => {
      const response = await request(app)
        .post('/courses')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Course name is required');
     });

     it('Test 6 - responds with code 201 and added course ID ', async () => {
      const response = await request(app)
        .post('/courses')
        .set('Authorization', `Bearer ${token}`)
        .send({
          Name: 'Test_Course',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.have.key('result');
      expect(response.body.result).to.be.a('number');
      newId = response.body.result;
     });

     it('Test 7 - responds with code 200 and added course', async () => {
      const response = await request(app)
        .get(`/courses/${newId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('course');
      expect(response.body.course).to.be.a('object');
      // expect(response.body.course.length).to.greaterThan(0);
    });

    it('Test 7 - responds with code 204 and added course', async () => {
      const response = await request(app)
        .patch(`/courses/${newId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          Name: 'Test_Course_changed',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(204);
      expect(response.body).to.be.a('object');
      // expect(response.body.course.length).to.greaterThan(0);
    });

    it('Test 8 - responds with code 400 and added course', async () => {
      const response = await request(app)
        .get(`/courses/abc`)
        .set('Authorization', `Bearer ${token}`);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(400);
        expect(response.body).to.have.key('error');
        expect(response.body.error).to.be.a('string');
        expect(response.body.error).to.equal('No valid id provided');
      // expect(response.body.course.length).to.greaterThan(0);
    });
    it('Test 9 - responds with code 400 and added course', async () => {
      const response = await request(app)
        .get(`/courses/99999999`)
        .set('Authorization', `Bearer ${token}`);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(400);
        expect(response.body).to.have.key('error');
        expect(response.body.error).to.be.a('string');
        expect(response.body.error).to.equal('No user found with id: 99999999');
      });

     it('Test 10 - responds with code 204 and delete added test ID ', async () => {
      const response = await request(app)
        .delete(`/courses/${newId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).to.equal(204);
      expect(response.body).to.be.a('object');


     });

     it('Test 11 - responds with code 400 and error no valid ID ', async () => {
      const response = await request(app)
        .delete(`/courses/abcid`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('No valid id provided');
     });

     it('Test 12 - responds with code 400 and ID not found ', async () => {
      const response = await request(app)
        .delete(`/courses/${newId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal(`Course not found with id: ${newId}`);
     });


    });
  });

  

