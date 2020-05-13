import React, { useRef, useCallback } from 'react';
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
import api from '../../services/api';
import {
  Container,
  Title,
  BackToSignButton,
  BackToSignButtonText,
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const refPassword = useRef<TextInput>(null);
  const refEmail = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleRegistration = useCallback(
    async (data: SignUpFormData) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Name is required'),
          email: Yup.string()
            .required('E-mail is required')
            .email('Provide a valid e-mail'),
          password: Yup.string().required('Password is required'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        await api.post('/users', data);
        Alert.alert(
          'Your account has been created',
          'You can do your login using the GoBarber',
        );
        navigation.navigate('SignIn');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErrors(err));
        } else {
          Alert.alert(
            'Error while registration your account',
            'An error occurred while registering your account',
          );
        }
      }
    },
    [navigation],
  );

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
              <Title>Do your registration</Title>
            </View>
            <Form ref={formRef} onSubmit={handleRegistration}>
              <Input
                name="name"
                icon="user"
                placeholder="Name"
                autoCorrect
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  refEmail.current?.focus();
                }}
              />
              <Input
                ref={refEmail}
                name="email"
                icon="mail"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => {
                  refPassword.current?.focus();
                }}
              />
              <Input
                ref={refPassword}
                name="password"
                icon="lock"
                placeholder="Password"
                secureTextEntry
                textContentType="newPassword" /* means that is a new password and will not give a suggestion to generate a new one */
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
                Create
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <BackToSignButton
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignButtonText>Back to login</BackToSignButtonText>
      </BackToSignButton>
    </>
  );
};

export default SignUp;
