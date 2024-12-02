import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

/*
 Esse é o modelo "User" do banco de dados, representando os usuários do sistema:
 - Herda de `Model`, que vem do Sequelize, para usar as funcionalidades de ORM.
 - `init`: inicializa os campos da tabela (id, name, email, password e password_hash).
 - `password` é um campo virtual usado para receber a senha sem armazená-la diretamente.
 - `password_hash` é o hash da senha que será salvo no banco.
 - Um hook (`beforeSave`) é usado para gerar o hash da senha automaticamente antes de salvar.
 - `checkPassword`: método para comparar a senha recebida com o hash armazenado.
 */


class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,   
          primaryKey: true,          
          autoIncrement: true,       
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: {
          type: Sequelize.VIRTUAL,  
          allowNull: true,
        },
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
        timestamps: true,
      }
    );
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
