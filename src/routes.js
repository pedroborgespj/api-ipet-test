const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');
const UsuarioController = require('./controllers/UsuarioController');
const PetController = require('./controllers/PetController');
const PetshopController = require('./controllers/PetshopController');
const ServicoController = require('./controllers/ServicoController');
const RegiaoController = require('./controllers/RegiaoController');
const Servico_PetshopController = require('./controllers/Servico_PetshopController');
const AgendamentoController = require('./controllers/AgendamentoController');
const SessionController = require('./controllers/SessionController');
const authMiddleware = require('./middlewares/auth');
const FileController = require('./controllers/FileController');

const routes = express.Router();
const upload = multer(multerConfig);

routes.get('/usuarios', UsuarioController.index);
routes.post('/usuarios', UsuarioController.cadastro);

routes.get('/regioes/:regiao_id/petshops', PetshopController.listarPetshopsRegiao);
routes.get('/petshops-z-a', PetshopController.listarPetshopsDecrescente);
routes.get('/petshops-a-z', PetshopController.listarPetshopsCrescente);
routes.get('/petshops', PetshopController.listarPetshops);
routes.post('/petshops', PetshopController.cadastro);

routes.get('/servicos', ServicoController.index);
routes.post('/servicos', ServicoController.store);

routes.get('/servicos/:servico_id/regioes/:regiao_id/petshops', Servico_PetshopController.petshopsServicosRegioes);
routes.get('/servicos_petshops', Servico_PetshopController.index);
routes.get('/petshops/:petshop_id/servicos', Servico_PetshopController.listarServicosPetshop);
routes.post('/petshops/:petshop_id/servicos', Servico_PetshopController.cadastroServicosPetshop);
routes.get('/servicos/:servico_id/petshops', Servico_PetshopController.petshopsServicos);

routes.get('/regioes', RegiaoController.index);
routes.post('/regioes', RegiaoController.store);

routes.get('/agendamentos', AgendamentoController.index);
routes.get('/agendamentos', AgendamentoController.index);
routes.post('/petshops/:petshop_id/servicos/:servico_id', AgendamentoController.criarAgendaPetshopServico);

routes.post('/login', SessionController.store);


// Rotas autenticadas
routes.use(authMiddleware);

routes.put('/usuarios/atualizar-dados', UsuarioController.update);

routes.delete('/usuarios/:usuario_id/pets/:pet_id', PetController.deletarPetDono);
routes.put('/usuarios/:usuario_id/pets/:pet_id', PetController.editarInfoPetDono);
routes.get('/usuarios/:usuario_id/pets/:pet_id', PetController.listarInfoPetDono);
routes.get('/usuarios/:usuario_id/pets', PetController.listarPetsDono);
routes.post('/usuarios/:usuario_id/pets', PetController.cadastro);

routes.put('/pets/:pet_id/petshops/:petshop_id/servicos/:servico_id/agendamentos', AgendamentoController.criarAgendamentoPet);
routes.get('/pets/:pet_id/petshops/:petshop_id/agendamentos', AgendamentoController.agendaPet);

// Upload de arquivos
routes.post('/files', upload.single('file'), FileController.store);

module.exports = routes;