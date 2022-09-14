import express, {Router} from 'express';
import controller from './controller';

const router = express.Router();

router
    .get('/',controller.getPing)
export default router;