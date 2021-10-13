const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Usuario = require('../models/Usuario');
const Pet = require('../models/Pet');
const Petshop = require('../models/Petshop');
const Servico = require('../models/Servico');
const Regiao = require('../models/Regiao');
const Servico_Petshop = require('../models/Servico_Petshop');
const Agendamento = require('../models/Agendamento');
const File = require('../models/File');

const connection = new Sequelize(dbConfig);

Usuario.init(connection);
Pet.init(connection);
Petshop.init(connection);
Servico.init(connection);
Regiao.init(connection);
Servico_Petshop.init(connection);
Agendamento.init(connection);
File.init(connection);

Usuario.associate(connection.models);
Pet.associate(connection.models);
Petshop.associate(connection.models);
Regiao.associate(connection.models);
Servico_Petshop.associate(connection.models);
Servico.associate(connection.models);
Agendamento.associate(connection.models);

module.exports = connection;