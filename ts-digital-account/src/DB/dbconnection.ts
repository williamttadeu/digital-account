import { Sequelize} from 'sequelize';

const database = new Sequelize("personal_info", "william","senha",{
    host: "localhost",
    dialect: "mysql",
    logging: console.log
});

database.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados bem-sucedida.');
    })
    .catch((error) => {
        console.error('Erro na conexão com o banco de dados:', error);
    });

export default database;