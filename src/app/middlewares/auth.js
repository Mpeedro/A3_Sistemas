import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

/*
  Middleware de autenticação para verificar o token JWT:
  - Pega o token do cabeçalho de autorização (`authorization`).
  - Se o token não for fornecido, retorna erro 401 (não autorizado).
  - Divide o cabeçalho no formato "Bearer token" e pega só o token.
  - Verifica o token usando a chave secreta (`authConfig.secret`).
  - Se for válido, armazena o `id` do usuário em `req.user_id` para uso posterior.
  - Caso contrário, retorna erro 401 com mensagem de token inválido.
  - Se tudo der certo, chama o próximo middleware com `next()`.
 */


export default (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido.' });
    }

    
    const [, token] = authHeader.split(' ');

    try {
        
        const decoded = jwt.verify(token, authConfig.secret);
       
        req.user_id = decoded.id; 
        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido.' });
    }
};
