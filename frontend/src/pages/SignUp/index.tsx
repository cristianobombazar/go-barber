import React from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { Container, Content, Background } from './styles';
import logo from '../../assets/logo.svg';
import Input from '../../components/input';
import Button from '../../components/button';

const SignUp: React.FC = () => {
  function handleRegistration(data: any): void {
    console.log(data);
  }

  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} alt="GoBarber" />

        {/* <Form onSubmit={handleRegistration} initialData={{ name: 'Diego' }}> */}
        <Form onSubmit={handleRegistration}>
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
        </Form>

        <a href="forgot">
          <FiArrowLeft />
          Back to Login
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
