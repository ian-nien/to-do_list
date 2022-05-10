import express from 'express';
import controller from '../controllers/Todo';

const router = express.Router();

router.post('/', controller.createTodo);
router.get('/:todoId', controller.readTodo);
router.get('/', controller.readAllTodo);
router.patch('/:todoId', controller.updateTodo);
router.delete('/:todoId', controller.deleteTodo);

export = router;
