import axios from "axios";
import { useEffect, useState } from "react";
import styled, {keyframes} from "styled-components";
import Logo from '../img/logo.png'

const CardLista = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    min-height: 60vh;
    width: 20vw;
    padding-top: 5vh;
    padding-bottom: 5vh;
    padding-right: 3vw;
    padding-left: 3vw;
    margin-top: 5vh;
    margin-bottom: 2vh;
    border-radius: 60px 20px;
    box-shadow: 10px 5px 5px black;

    @media (max-width: 800px){
        width: 80vw;
    }


`

const ImagemPerfil = styled.img`
    height: 50px;
    width: 50px;
    border-radius: 50%;
`

const Perfil = styled.div`
    display: flex;
    align-items: center;

    h4 {
        margin-left: 2vw;
    }

    :hover{
        cursor: pointer;
    }
`

const Heartbeat = keyframes`

  0%{
    transform: scale( .75 );
  }
  20%{
    transform: scale( 1 );
  }
  40%{
    transform: scale( .75 );
  }
  60% {
    transform: scale( 1 );
  }
  80%{
    transform: scale( .75 );
  }
  100%{
    transform: scale( .75 );
  }

`

const ImgCarregar = styled.img`
    height: 20vh;
    width: 8vw;
    margin-left: 6vw;
    margin-top: 16vh;
    animation: ${Heartbeat} 1s linear infinite;

    @media (max-width:800px){
        width: 26vw;
        margin-left: 28vw;
    }
`



function Lista () {

    const aluno = 'silvio'
    const [matches, setMatches] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getMaches()
    }, [])

    const getMaches = () => {
        setLoading(true)
        axios.get(`https://us-central1-missao-newton.cloudfunctions.net/astroMatch/${aluno}/matches`)
        .then((res) => {
            setMatches(res.data.matches)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err.response)
        })
    }

    const listaDeMatches = matches.map((match) => {
        return(
            <Perfil>
                <ImagemPerfil src={match.photo}/>
                <h4>{match.name}, {match.age}</h4>
            </Perfil>
        )
    })

    return(
        <CardLista>
            {(loading === true) ?
            ( <ImgCarregar src={Logo} alt="Carregando..." />)
            :
            (listaDeMatches)}
        </CardLista>
    )
}

export default Lista