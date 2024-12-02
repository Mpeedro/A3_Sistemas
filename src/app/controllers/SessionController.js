import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';





class SessionController{

    async store(req, res){
        const { email, password } = req.body;
        const user = await User.findOne({where: { email }});
        if(!user){
            return res.status(401).json({ error: 'User não existe! '});
        }
        if(!(await user.checkPassword(password))){
            return res.status(401).json( ({ erro: 'Senha errada! '}))
        }

            const { id, name } = user; 
        return res.json({ 
            user: {
                id,
                name,
                email,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }




}


export default new SessionController();

/*
  Controller para gerenciar sessões de usuário (SessionController):

  - `store`: Cria uma nova sessão de usuário (login).
    1. Recebe o `email` e `password` do corpo da requisição.
    2. Verifica se o usuário existe pelo `email` (usando o método `findOne`).
    3. Se o usuário não existir, retorna erro 401 com a mensagem "User não existe!".
    4. Se a senha estiver incorreta, retorna erro 401 com a mensagem "Senha errada!".
    5. Se o usuário e a senha estiverem corretos, gera um token JWT com o ID do usuário.
    6. Retorna o usuário (id, name, email) e o token gerado no formato JSON.
*/
