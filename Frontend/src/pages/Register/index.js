import React, {useState} from 'react';
import './styles.css';
//Importando a logo
import logoImg from '../../assets/logo.svg';
//importando o pacote de icones
import { FiArrowLeft} from 'react-icons/fi';
//importando o controle de SPA
import { Link,useHistory } from 'react-router-dom';
//importando a API
import api from'../../services/api';

export default function Register(){
  //inserido as variaveis que vao armazenar os valores dos input
  const[name,setName] = useState('');
  const[email,setEmail] = useState('');
  const[whatsapp,setWhatsApp] = useState('');
  const[city,setCity] = useState('');
  const[uf,setUf] = useState('');
  // Enviando o usuario para a área de login
  const history = useHistory();


  // função para habilitar a api no form
  async function handleRegister(e){
    e.preventDefault();
    //criando as variaveis para o envio para a API
    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };
    try {
    //enviando para a API
    const response =  await api.post('ongs',data);
    //informando a usuario o ID e enviando a rota raiz
    alert(`Seu ID de acesso: ${response.data.id}`);
    history.push('/');
  } catch (err) {
    alert('Erro no cadastro, Tente novamente.');

  }

  }

  return(
    <div className = "register-container">
    <div className ="content">
      <section>
      <img src={logoImg} alt="Logo"/>

      <h1> Cadastro</h1>
      <p> Faça o seu cadastro,entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

      <Link className="back-link" to="/">
        <FiArrowLeft size={16} color="#E02041" />
        Voltar a página incial
      </Link>
      </section>
      <form onSubmit ={handleRegister}>
        <input placeholder="Nome da Ong" value={name}
        onChange={e=> setName(e.target.value)}
        />

        <input type="email" placeholder="E-mail"
        value={email}
        onChange={e=> setEmail(e.target.value)}
        />

        <input placeholder="WhatsApp"
        value={whatsapp}
        onChange={e=> setWhatsApp(e.target.value)}
        />
        <div className="input-group">
          <input  placeholder="Cidade"
          value={city}
          onChange={e=> setCity(e.target.value)}
           />
          <input  placeholder="UF" style={{ width:80 }}
          value={uf}
          onChange={e=> setUf(e.target.value)}
          />

        </div>
        <button className="button" type="submit">Cadastrar</button>

      </form>
    </div>

    </div>
  )
}
