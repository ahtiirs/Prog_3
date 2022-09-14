import express, {Router} from 'express';
import controller from './controller';

const router = express.Router();

router
    .get('/',controller.getAll)
    .get('/:id',controller.getById)
    .delete('/:id',controller.deleteById)
    .post('/',controller.add)
    .patch('/:id',controller.updateById);

export default router;
