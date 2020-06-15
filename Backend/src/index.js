/**
* o request guarda todos os dados que vêm atraves da requisição.
* O response  mostra os dados para o usuário.
* Para acessar todos os parametros vindos da query. ultilizamos o comando
"const params = request.query;".
* Para acessar os route params usamos "const params = request.params;"
*Para acessar os request.body usamos "const body = request.body;"

*/
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(3333);
