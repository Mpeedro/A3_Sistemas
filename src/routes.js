import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import TaskController from './app/controllers/TaskController';

// Aqui estamos criando uma instância de Router, que é usada para definir as rotas da aplicação.


const routes = new Router();

/* 
- As duas primeiras são para cadastro de usuários e login (sem precisar de autenticação). - A partir daqui, todas as rotas passam pelo middleware de autenticação (authMiddleware).
- Depois disso, temos as rotas para CRUD de tarefas: criar, listar, atualizar e deletar.
*/



routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

//todas routas abaixo usaram a autenticação;
routes.use(authMiddleware);

routes.post('/tasks', TaskController.store);
routes.get('/tasks', TaskController.index);
routes.get('/tasks/all', TaskController.listAll);
routes.put('/tasks/:task_id', TaskController.update);
routes.delete('/tasks/:task_id', TaskController.delete);




export default routes;