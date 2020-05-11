import React, { useRef } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  Container,
  Title,
  BackToSignButton,
  BackToSignButtonText,
} from './styles';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

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
            <Form
              ref={formRef}
              onSubmit={(data) => {
                console.log(data);
              }}
            >
              <Input name="name" icon="user" placeholder="Name" />
              <Input name="email" icon="mail" placeholder="E-mail" />
              <Input name="password" icon="lock" placeholder="Password" />

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
