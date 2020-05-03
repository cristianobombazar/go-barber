import React from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import logo from '../../assets/logo.svg';
import Input from '../../components/input';
import Button from '../../components/button';

const SignUp: React.FC = () => (
  <Container>
    <Background />
    <Content>
      <img src={logo} alt="GoBarber" />
      <form>
        <h1>Create your account</h1>
        <Input name="name" icon={FiUser} placeholder="Name" />
        <Input name="email" icon={FiMail} placeholder="E-mail" />
        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Senha"
        />

        <Button type="submit">Register</Button>
      </form>

      <a href="forgot">
        <FiArrowLeft />
        Back to Login
      </a>
    </Content>
  </Container>
);

export default SignUp;
