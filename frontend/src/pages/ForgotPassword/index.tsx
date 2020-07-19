import React, { useRef, useCallback, useState } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { Container, Content, AnimationContainer, Background } from './styles';
import logo from '../../assets/logo.svg';
import Input from '../../components/input';
import Button from '../../components/button';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface ForgotPasswordForm {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleRegistration = useCallback(
    async (data: ForgotPasswordForm) => {
      formRef.current?.setErrors({});
      try {
        setLoading(true);

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail is required')
            .email('Provide a valid e-mail'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'Password reset request sent',
          description:
            'A password reset message was sent to your email address',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErrors(err));
        } else {
          addToast({
            type: 'error',
            title: 'Error while trying to recover password',
            description:
              'Error while trying to recover password. Check your email and try again.',
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />
          <Form onSubmit={handleRegistration} ref={formRef}>
            <h1>Reset your password</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Button type="submit" loading={loading}>
              Recover password
            </Button>
          </Form>

          <Link to="/">
            <FiLogIn />
            Back to login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
