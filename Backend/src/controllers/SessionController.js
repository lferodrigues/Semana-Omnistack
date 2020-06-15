// Esta pagina serve para criar o login da aplicação.
const connection = require('../database/connection');

module.exports = {
  //Criando a Rota de Login
  async create(request, response) {
      const { id } = request.body;

      const ong = await connection('ongs')
      .where('id', id)
      .select('name')
      .first();

      if(!ong) {
        return response.status(400).json({error: 'No ONG found with this ID'});
      }
      return response.json(ong);
  }
}
