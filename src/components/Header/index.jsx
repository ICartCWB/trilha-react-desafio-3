import React from 'react'
import logo from '../../assets/logo-dio.png';

// adicionado import do navigate
import { useNavigate  } from "react-router-dom";

import { Button } from '../Button';

import { Container, Wrapper, BuscarInputContainer, Input, Row, Menu, MenuRight, UserPicture} from './styles';

const Header = ({autenticado}) => {

  // adicionado navegação para login e cadastrar conta
  const navigate = useNavigate()

  const handleClickCriarConta = () => {
    navigate('/cadastro')
  }

  const handleClickLogin = () => {
    navigate('/login')
  }

  return (
    <Wrapper>
      <Container>
          <Row>
            <img src={logo} alt="Logo da dio"/>
            {autenticado ? (
              <>
               <BuscarInputContainer>
                <Input placeholder='Buscar...'/>
               </BuscarInputContainer>
                <Menu>Live Code</Menu>
                <Menu>Global</Menu>
              </>
            ) : null}
          </Row>
          <Row>
              {autenticado ? (
                <UserPicture src="https://avatars.githubusercontent.com/u/45184516?v=4"/>
              ) : (
              <>
                <MenuRight href="/">Home</MenuRight>
                <Button title="Entrar" onClick={handleClickLogin}/>
                <Button title="Cadastrar" onClick={handleClickCriarConta}/>
              </>)}
          </Row>
      </Container>
    </Wrapper>
  )
}

export { Header }
