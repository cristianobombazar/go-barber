import React, { useCallback, useRef } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

interface CredentialsForm {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const inputRefPassword = useRef<TextInput>(null);

  const handleRegistration = useCallback(async (data: CredentialsForm) => {
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
      /* await signIn({
          email: data.email,
          password: data.password,
        });
        history.push('/dashboard'); */
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        formRef.current?.setErrors(getValidationErrors(err));
      } else {
        Alert.alert('Error while authenticate', 'Error while authenticate');
      }
    }
  }, []);

  return (
    <>
      {/* WRAPPING WITH KEYBOARD AVOID VIEW IN CASES OF IOS. ANDROID THIS BEHAVIOR IS DEFAULT  */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logoImg} />
            {/* WRAPPING TITLE WITH VIEW ENABLE THE TITLE TO MOVE UP WHEN THE KEYBOARD IS SHOWING.  */}
            <View>
              <Title>Do your logon</Title>
            </View>
            <Form onSubmit={handleRegistration} ref={formRef}>
              <Input
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                  inputRefPassword.current?.focus();
                }}
              />
              <Input
                ref={inputRefPassword}
                name="password"
                icon="lock"
                placeholder="Password"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Sign In
              </Button>
            </Form>

            <ForgotPassword onPress={() => {}}>
              <ForgotPasswordText>Forgot my password</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAccountButton
        onPress={() => {
          navigation.navigate('SignUp');
        }}
      >
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Create account</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;
