import Task from "../models/Task";
import User from "../models/User"; 
import * as Yup from 'yup';

class TaskController {
  async store(req, res) {
    const schema = Yup.object().shape({
      task: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha ao Cadastrar.' });
    }

    const { task } = req.body;

    
    const user = await User.findByPk(req.user_id);

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado.' });
    }

    
    try {
      const tasks = await Task.create({
        user_id: user.id,  
        task,
      });

      return res.json(tasks);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao salvar a tarefa.' });
    }
  }
  async index(req, res){
    const tasks = await Task.findAll({
      where: { user_id: req.user_id, check: false },
    });
    return res.json(tasks);
  }
  async update(req, res){
    const { task_id } = req.params;
    const task = await Task.findByPk(task_id);
    if(!task){
      return res.status(400).json({ error: 'Tarefa não existe! '});
    }

    await task.update(req.body);


    return res.json(task);

  }
  async delete(req, res){
    const { task_id } = req.params;
    const task = await Task.findByPk(task_id);
    if(!task){
      return res.status(400).json({ error: 'Tarefa não existe! '});
    }
    if(task.user_id !== req.user_id){
      return res.status(401).json({ error: 'Não Autorizado! '});
    }
    await task.destroy();
    return res.send();


  }
  async listAll(req, res) {
    try {
        const tasks = await Task.findAll({
            where: { user_id: req.user_id }, // Busca todas as tarefas do usuário autenticado
        });

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: 'Nenhuma tarefa encontrada.' });
        }

        return res.json(tasks);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar as tarefas.' });
    }
}

}

export default new TaskController(); 

/*
  Controller para gerenciar tarefas (TaskController):
  
  - `store`: Cria uma nova tarefa.
    1. Valida o campo `task` com o Yup.
    2. Verifica se o usuário existe pelo `req.user_id`.
    3. Se tudo estiver certo, cria a tarefa vinculada ao usuário.
    4. Retorna a tarefa criada ou um erro apropriado.
  
  - `index`: Lista todas as tarefas pendentes (não marcadas como concluídas) do usuário autenticado.
  
  - `update`: Atualiza uma tarefa pelo `task_id`.
    1. Verifica se a tarefa existe.
    2. Atualiza a tarefa com os dados enviados no corpo da requisição.
    3. Retorna a tarefa atualizada.
  
  - `delete`: Remove uma tarefa pelo `task_id`.
    1. Verifica se a tarefa existe.
    2. Garante que a tarefa pertence ao usuário autenticado.
    3. Exclui a tarefa e retorna uma resposta de sucesso (sem conteúdo).
  
  - `listAll`: Lista todas as tarefas (pendentes e concluídas) do usuário autenticado.
*/
