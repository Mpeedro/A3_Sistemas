import User from '../models/User';
import * as Yup from 'yup';

class UserController{
    async store(req, res){
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
            .email()
            .required(),
            password: Yup.string()
            .required()
            .min(6),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Falha na validação '});
        }

        const userExists = await User.findOne({
            where: { email: req.body.email },
        });

        if(userExists){
            return res.status(400).json({ error: "Usuario já existe. "});
        }
        const { id, name, email } = await User.create(req.body);

        return res.json({
            id,
            name,
            email,
        });

        
    }

    
}



export default new UserController();

/*
 * Controller para gerenciar usuários (UserController):
 * - Método `store`: usado para criar um novo usuário no sistema.
 * 
 * Passo a passo:
 * 1. Define um schema de validação com o Yup para validar o nome, email e senha.
 *    - `name` e `email` são obrigatórios, e a senha deve ter no mínimo 6 caracteres.
 * 2. Se os dados enviados não forem válidos, retorna erro 400 com mensagem de validação.
 * 3. Verifica se já existe um usuário com o email fornecido:
 *    - Se existir, retorna erro 400 informando que o usuário já existe.
 * 4. Cria o novo usuário no banco com os dados enviados (req.body).
 * 5. Retorna uma resposta com os dados do usuário criado (id, name e email).
 */
