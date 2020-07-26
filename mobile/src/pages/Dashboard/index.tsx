import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
} from './styles';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, []);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Welcome, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>
        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatarUrl }} />
        </ProfileButton>
      </Header>
    </Container>
  );
};

export default Dashboard;
