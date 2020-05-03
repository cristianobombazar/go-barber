import React, { useCallback } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Container, Content, Background } from './styles';
import logo from '../../assets/logo.svg';
import Input from '../../components/input';
import Button from '../../components/button';

const SignUp: React.FC = () => {
  const handleRegistration = useCallback(async (data: object) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
          .required('E-mail is required')
          .email('Provide a valid e-mail'),
        password: Yup.string().min(6, 'Password mut be longer than 6 digits'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
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
