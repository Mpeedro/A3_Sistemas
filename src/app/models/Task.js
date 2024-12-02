import Sequelize, { Model } from "sequelize";

/*
 Esse é o modelo "Task" do banco de dados, representando uma tabela de tarefas:
 - A classe herda de `Model`, que vem do Sequelize (para usar as funcionalidades de ORM).
 - `init`: inicializa os campos da tabela (task e check) com seus tipos no banco.
 - `associate`: define a relação entre tarefas e usuários (uma tarefa pertence a um usuário).
 */



class Task extends Model{
    static init(sequelize){
        super.init(
            {
            task: Sequelize.STRING,
            check: Sequelize.BOOLEAN,
            },
            {
                sequelize,
            }
        );
        return this;
    }

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user'});
    }
}

export default Task;