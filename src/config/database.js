//Define a conexão com banco de dados

module.exports = {
    dialect: 'postgres',
    host: '136.248.92.91',
    username: 'mped',
    password: '0000',
    database: 'tasklist',
    define: {
        // Ativa a criação automática dos campos 'createdAt' e 'updatedAt' para registrar as datas de criação e atualização dos registros.
        timestamps: true,

        // Converte os nomes das colunas para 'snake_case' (com underscores) ao invés de 'camelCase'.
        underscored: true,

        // Converte tanto os nomes das colunas quanto os nomes das tabelas para 'snake_case' = tabela: produtod_importados coluna: nome_do_produto.
        underscoredALL: true,
    },
};