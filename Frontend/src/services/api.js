//importando o axios
import axios from 'axios';

// criando a conexção com backend
const api = axios.create({
  //passando a url padrao para o cliente http
  baseURL:'http://localhost:3333',
})
export default api;
