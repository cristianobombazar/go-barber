import React, { ChangeEvent, FormEvent, useCallback, useRef } from 'react';
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { Container, Content, AvatarInput } from './styles';
import Input from '../../components/input';
import Button from '../../components/button';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
  oldPassword: string;
  passwordConfirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { user, updateUser } = useAuth();

  const handleRegistration = useCallback(
    async (data: ProfileFormData) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Name is required'),
          email: Yup.string()
            .required('E-mail is required')
            .email('Provide a valid e-mail'),
          password: Yup.string().when('oldPassword', {
            is: (val) => !!val.length,
            then: Yup.string().required('Field is required'),
            otherwise: Yup.string(),
          }),
          passwordConfirmation: Yup.string()
            .when('oldPassword', {
              is: (val) => !!val.length,
              then: Yup.string().required('Field is required'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          password,
          oldPassword,
          passwordConfirmation,
        } = data;
        const formData = {
          name,
          email,
          ...(oldPassword
            ? {
                password,
                oldPassword,
                passwordConfirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);
        updateUser(response.data);
        history.push('/dashboard');
        addToast({
          type: 'success',
          title: 'Profile updated',
          description: 'Your profile has been updated successfully',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErrors(err));
        } else {
          addToast({
            type: 'error',
            title: 'Error while updating your profile',
            description:
              'An error occurred while update your profile. Please, try again.',
          });
        }
      }
    },
    [addToast, history],
  );

  const handleAvatarChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const data = new FormData();
        data.append('avatar', event.target.files[0]);
        api.patch('/users/avatar', data).then((response) => {
          updateUser(response.data);
          addToast({
            type: 'success',
            title: 'Avatar successfully updated.',
            description: 'Avatar successfully updated.',
          });
        });
      }
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form
          onSubmit={handleRegistration}
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email,
          }}
        >
          <AvatarInput>
            <img src={user.avatarUrl} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <h1>My Profile</h1>

          <Input name="name" icon={FiUser} placeholder="Name" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            containerStyle={{ marginTop: 24 }}
            name="oldPassword"
            icon={FiLock}
            type="password"
            placeholder="Current Password"
          />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="New password"
          />

          <Input
            name="passwordConfirmation"
            icon={FiLock}
            type="password"
            placeholder="Password Confirmation"
          />

          <Button type="submit">Save</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
