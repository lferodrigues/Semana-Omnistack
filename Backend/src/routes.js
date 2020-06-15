const express =  require('express');

// importando o arquivo de controle das rotas
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();
//Login de uma ong
routes.post('/sessions', SessionController.create);
//Listar todas as ongs
routes.get('/ongs',OngController.index);
//Criar as ongs
routes.post('/ongs', OngController.create);
//Listar os casos
routes.get('/incidents', IncidentController.index);
//Criar casos
routes.post('/incidents', IncidentController.create);
//deletando caso
routes.delete('/incidents/:id',IncidentController.delete);
//listando um caso especifico de uma ong
routes.get('/profile', ProfileController.index);



module.exports = routes;
