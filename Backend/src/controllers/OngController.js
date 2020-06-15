// o crypto serve para a criação de uma criptografia
// Mas da para fazer ele gerar numeros aleatorios
const crypto = require('crypto');

//importando a conexcção ao banco de dados.
const connection = require('../database/connection');

module.exports = {
  //Listar rotas
  async index (request, response) {
    const ongs = await connection('ongs').select('*');

    return response.json(ongs);
  },
  async create(request, response) {
    // {} o que esta dentro das chaves, sao variaveis.
    const {name, email, whatsapp, city, uf} = request.body;

    // gerando o id pelo crypto, sendo que esta gerando um numero randomico de
    // 4 digitos em Hexadecimal
    const id = crypto.randomBytes(4).toString('Hex');

    //Conexção com o BD
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    })

    return response.json({ id });
  }
};
