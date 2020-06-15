//Esta pagina sao para os casos da ongs
const connection = require('../database/connection');

module.exports = {
  //Listar os casos
  async index(request, response){
    //Cria um estilo de páginação
    const{ page = 1 } = request.query;

    // Retorna para o front a quantidade de casos cadstrados.
    const [count] = await connection('incidents').count();

    //Pega todas as ongs cadastradas
    const incidents = await connection('incidents')
    // Puxa os dados de outras tabelas
    .join('ongs', 'ongs.id', '=' ,'incidents.ong_id')
    //Limita a 5 por pagina
    .limit(5)
    // Pula de 5 em 5 começando pela pagina 1
    .offset((page -1) *5)
    // seleciona os dados das ongs cadastradas e casos
    .select(['incidents.*',
    'ongs.name',
    'ongs.whatsapp',
    'ongs.email',
    'ongs.city',
    'ongs.uf']);
    // retorna a quantidade de ongs cadastradas pelo o cabeçalho da resposta
    response.header('X-TOTAL-Count', count['count(*)']);


    return response.json(incidents);
  },

  async create(request, response) {
      const{ title, description, value } = request.body;
      // Pega o id da ong que ira cadrastar o caso
      const ong_id = request.headers.authorization;

      //Insere dados na tabela de casos
      const [id] = await connection('incidents').insert({
        title,
        description,
        value,
        ong_id,
      });

      return response.json({ id });
  },

  //Deletar casos
  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents')
    .where('id', id)
    .select('ong_id')
    .first();

    if(incident.ong_id != ong_id) {
      return response.status(401).json({
        error:'Operation not permitted'
      });
    }
    await connection('incidents').where('id',id).delete();

    return response.status(204).send();

  }
};
