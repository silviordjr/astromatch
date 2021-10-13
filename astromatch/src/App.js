
import { useState } from "react";
import './App.css';
import Inicio from './components/Inicio';
import Lista from './components/Lista';
import axios from 'axios';
import styled from 'styled-components';
import Logo from './img/logo.png'

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: aliceblue;
  min-height: 100vh;
`

const ContainerBotoes = styled.div`
  width: 20vw;
  display: flex;
  justify-content: space-between;
  @media (max-width: 800px){
        width: 80vw;
    }
`

const Button = styled.button`
  background-color: aliceblue;
  border: none;
  border-bottom: 1px solid black;
  color: black;
  :hover{
    cursor: pointer;
    color: gray;
    border-bottom: 1px solid gray;
  }
`

const Logotipo = styled.img`
  height: 25px;
  width: auto;
`

function App() {
  const aluno = 'silvio'
  const headers = {
    headers: {
        'Content-Type': 'application/json',
    }
}

  const [inicio, setInicio]=useState(true)
  const [limpar,setLimpar]=useState(false)

  const clear = () => {
    axios.put(`https://us-central1-missao-newton.cloudfunctions.net/astroMatch/${aluno}/clear`, headers)
    .then((res) => {
        alert(res.data.message)
        setInicio(true)
        setLimpar(!limpar)
    })
    .catch((err) => {
        console.log(err.response)
    })
  }

  const mudaPaginaInicio = () => {
    setInicio(true)
  }

  const mudaPaginaLista = () => {
    setInicio(false)
  }

  return (
    <MainContainer>
      <ContainerBotoes>
        <Logotipo src={Logo} alt="logo" />
        <Button onClick={clear}>Limpar</Button>
        <Button onClick={mudaPaginaInicio}>Início</Button>
        <Button onClick={mudaPaginaLista}>Lista de Matches</Button>
      </ContainerBotoes>
      {(inicio === true) ?
      (<Inicio limpar={limpar} />)
      :
      (<Lista />)}
    </MainContainer>
  );
}

export default App;
