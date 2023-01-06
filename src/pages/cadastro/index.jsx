import React from 'react'

import { MdPerson, MdEmail, MdLock } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';

import { useNavigate  } from "react-router-dom";

import { useForm } from "react-hook-form";

import { Container, Wrapper, Column, Title, TitleCadastro, CadastroText, TenhoContaText } from './styles';

const Cadastro = () => {

    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors  } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try{
            const {data} = await api.get(`/users?email=${formData.email}`);
            
            if(data.length && data[0].id){
                alert('E-mail já cadastrado')
                return

            } else {
                await api.post(`/users`,{
                    name: formData.nome,
                    email: formData.email,
                    senha: formData.senha
                });
            }

        }catch(e){
            alert('Ocorreu o seguinte erro no cadastro:\n', e)
        }
    };

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                    <TitleCadastro>Comece agora grátis</TitleCadastro>
                    <CadastroText>Crie sua conta e make the change._</CadastroText>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input placeholder="Nome completo" leftIcon={<MdPerson />} name="nome"  control={control} />
                        {errors.nome && <span>Nome é obrigatório</span>}
                        <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email"  control={control} />
                        {errors.email && <span>E-mail é obrigatório</span>}
                        <Input type="password" placeholder="Senha" leftIcon={<MdLock />}  name="senha" control={control} />
                        {errors.senha && <span>Senha é obrigatório</span>}
                        <Button title="Criar minha conta" variant="secondary" type="submit"/>
                    </form>
                    <CadastroText>
                        Ao clicar em "criar minha conta grátis", 
                        declaro que aceito as Políticas de 
                        Privacidade e os Termos de Uso da DIO.
                    </CadastroText>
                    <TenhoContaText>
                        Já tenho conta. <a href='/login'>Fazer login</a>
                    </TenhoContaText>
                </Wrapper>
            </Column>
        </Container>
        </>
    )
}

export { Cadastro };