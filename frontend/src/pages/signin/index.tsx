import React, { useRef, useCallback, useContext } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Container, Content, Background } from './styles';
import logo from '../../assets/logo.svg';
import Input from '../../components/input';
import Button from '../../components/button';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface CredentialsForm {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn, user } = useAuth();
  const { addToast } = useToast();

  const handleRegistration = useCallback(
    async (data: CredentialsForm) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail is required')
            .email('Provide a valid e-mail'),
          password: Yup.string().min(6, 'Password mut be longer than 6 digits'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErrors(err));
        } else {
          addToast({
            type: 'error',
            title: 'Error while authenticate',
            description: 'Check your username/password',
          });
        }
      }
    },
    [signIn, addToast],
  );

  return (
    <Container>
      <Content>
        <img src={logo} alt="GoBarber" />
        <Form onSubmit={handleRegistration} ref={formRef}>
          <h1>Sign In</h1>
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Log in</Button>

          <a href="forgot">Forgot your password?</a>
        </Form>

        <a href="forgot">
          <FiLogIn />
          Create your account
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
