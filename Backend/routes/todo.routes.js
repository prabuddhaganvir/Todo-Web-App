
import express from 'express';
import { delTodo, getTodos, saveTodos, updateTodo } from '../controllers/todo.controller.js';

const router = express.Router();

 router.get('/', getTodos);
 router.post('/save',saveTodos);
 router.put('/update/:id', updateTodo)
 router.delete('/delete/:id', delTodo)



 export default router;