import React, {useState} from 'react';
// Importando Folha de estilos
import'./styles.css';
//Importando a imagem
import heroesImg from '../../assets/heroes.png';
//Importando a logo
import logoImg from '../../assets/logo.svg';
//importando o pacote de icones
import { FiLogIn } from 'react-icons/fi';
//importando o controle de SPA
import { Link,useHistory } from 'react-router-dom';
//importando a API
import api from'../../services/api';


export default function Logon(){
    const [id,setID] = useState('');
    //Enviando para a rota Profile
    const history = useHistory();

  async function handleLogin(e){
      e.preventDefault();

      try{
        const response = await api.post('sessions', { id });


        //Salvando no cache do navegador
        localStorage.setItem('ongId', id);
        localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
      }catch(err) {
        alert('Falha no login');
      }

  }

  return(
    // criando a área aonde será folocado o campo para inserir o ID
   <div className = "logon-container">
     <section className="form">
        <img src={logoImg} alt="Logo" />

        <form onSubmit={handleLogin}>
        <h1> Faça o seu Login </h1>
        <br></br>

        <input placeholder="Sua ID"
        value={id}
        onChange={e=> setID(e.target.value)}
        />
        <button className="button" type="submit">Entrar</button>


        <Link className="back-link" to="/register">
          <FiLogIn size={16} color="#E02041" />
          Não tenho cadastro
        </Link>
        </form>
     </section>
     <img src={heroesImg} alt="Heroes"/>
   </div>
 );
}
