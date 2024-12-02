import express from 'express';
import cors from 'cors';
import routes from './routes';
import './database';
// Essa classe aqui é basicamente o coração do servidor. Ela configura o Express, 
// define os middlewares e conecta as rotas pra tudo funcionar certinho.


class App{
    constructor(){
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(cors());
        this.server.use(express.json());

    }
    routes(){
        this.server.use(routes);
    }
}



export default new App().server;