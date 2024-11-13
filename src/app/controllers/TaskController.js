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
}

export default new TaskController(); 
