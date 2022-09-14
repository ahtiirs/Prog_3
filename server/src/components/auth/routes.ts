import express, {Router} from 'express';
import controller from './controller';

const router = express.Router();

router
    .post('/',controller.login)
export default router;