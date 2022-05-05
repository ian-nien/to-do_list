import express from 'express';
import controller from '../controllers/Todo';

const router = express.Router();

router.post('/create', controller.createTodo);
router.get('/get/:todoId', controller.readTodo);
router.get('/get', controller.readAllTodo);
router.patch('/update/:todoId', controller.updateTodo);
router.delete('/delete/:todoId', controller.deleteTodo);

export = router;
