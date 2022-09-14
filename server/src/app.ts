
import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import groupsRouter from './components/groups/routes';
import coursesRouter from './components/courses/routes';
import homeworksRouter from './components/homeworks/routes';
import teachersRouter from './components/teachers/routes';
import pingRouter from './components/ping/routes';
import loginRouter from './components/auth/routes';
import usersRouter from './components/users/routes';
import myCookie from './cookies'
import isLoggedIn from './components/general/middlewares/isLoggedIn';

const cookieParser = require('cookie-parser');
const app: Application = express();

app.use(express.json());
app.use(cors());

// app.use(cookieParser())
app.use('/ping', pingRouter);
app.use('/login', loginRouter);
app.use(isLoggedIn);
// app.use(myCookie); //Middleware for 

app.use('/groups', groupsRouter);
app.use('/courses', coursesRouter);
app.use('/homeworks', homeworksRouter);
app.use('/teachers', teachersRouter);
app.use('/users', usersRouter);

export default app;