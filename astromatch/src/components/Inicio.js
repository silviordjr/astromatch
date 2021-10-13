import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import Like from '../img/like.png'
import Dislike from '../img/dislike.png'
import styled, {keyframes} from "styled-components";
import Logo from '../img/logo.png'

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const CardProfile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center ;
    background-color: white;
    height: 60vh;
    width: 20vw;
    padding-top: 5vh;
    padding-bottom: 5vh;
    padding-right: 3vw;
    padding-left: 3vw;
    margin-top: 5vh;
    border-radius: 60px 20px;
    box-shadow: 10px 5px 5px black;

    @media (max-width: 800px){
        width: 80vw;
        height: 65vh;
    }

`

const ImagemProfile = styled.img`
    height: 30vh;
    width: 15vw;
    @media (max-width: 800px){
        height: 30vh;
        width: 50vw;
    }
`

const ImagemBotoes = styled.img`
    height: 60px;
    width: auto;

    :hover{
        cursor: pointer;
    }

    @media (max-width: 800px){
        height: 40px;
        width: auto;
    }
`

const ContainerBotoes = styled.div`
    display: flex;
    width: 20vw;
    justify-content: space-between;

    @media (max-width: 800px){
        width: 80vw;
    }
`

const Bio = styled.p`
    text-align: center;
`

const ContainerBio = styled.div`
    display: flex;
    text-align: center;
    justify-content: center;
    height: 20vh;
    margin: 0;
    padding: 0;
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
    width: auto;
    margin-top: 16vh;
    animation: ${Heartbeat} 1s linear infinite;
`

function Inicio (props){
    const aluno = 'silvio'
    const headers = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const [profileToChoose, setProfileToChoose]=useState([])
    const [loading, setLoading] = useState(false)

    const getProfileToChoose = () =>{
        setLoading(true)
        axios.get(`https://us-central1-missao-newton.cloudfunctions.net/astroMatch/${aluno}/person`)
        .then((res) => {
            setProfileToChoose(res.data.profile)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err.response)
        })
    }

    const dislike = (profile) => {

        let body = {
             id: profile.id,
             choice: false
        }

        axios.post(`https://us-central1-missao-newton.cloudfunctions.net/astroMatch/${aluno}/choose-person`, body, headers)
        .then((res) => {
            getProfileToChoose()
        })
        .catch((err) => {
            console.log(err.response)
        })

    }

    const like = (profile) => {

        let body = {
            id: profile.id,
            choice: true
       }

       axios.post(`https://us-central1-missao-newton.cloudfunctions.net/astroMatch/${aluno}/choose-person`, body, headers)
       .then((res) => {
           getProfileToChoose()
        })
        .catch((err) => {
            console.log(err.response)
        })
    }

    useEffect(() => {
        getProfileToChoose()
    }, [props.limpar])

    return (
        < MainContainer >
                {profileToChoose ? 
                ((loading === true) ?
                (
                <CardProfile>
                    <ImgCarregar src={Logo} alt="Carregando..." />
                </CardProfile>)
                :
                (
                <CardProfile>
                    <ImagemProfile src={profileToChoose.photo} alt="Foto de perfil" />
                    <h3>{profileToChoose.name}, {profileToChoose.age}</h3>
                    <ContainerBio>
                        <Bio>{profileToChoose.bio}</Bio>
                    </ContainerBio>
                    <ContainerBotoes>
                        <ImagemBotoes src={Dislike} alt="Bptão Dislike" onClick={() => dislike(profileToChoose)} />
                        <ImagemBotoes src={Like} alt='Botão Like' onClick={() => like(profileToChoose)} />
                    </ContainerBotoes>
                </CardProfile>
                )

                )
                :
                (
                <CardProfile>
                    <ImgCarregar src={Logo} alt="Carregando..." />
                    <h3>Acabaram os perfis...</h3>
                    <p>Clique em limpar para continuar sua experiência.</p>
                </CardProfile>
                )}
        </ MainContainer >
    )
}

export default Inicio