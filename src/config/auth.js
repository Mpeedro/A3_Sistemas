/*
Aqui está a configuração do token JWT:
 `secret`: é a chave secreta usada para assinar e verificar os tokens (mantenha isso seguro!).
`expiresIn`: define o tempo de expiração do token, nesse caso, 7 dias.
*/


export default{
    secret: 'd41d8cd98f00b204e9800998ecf8427e',
    expiresIn: '7d',
};