import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import DashBoard from '../pages/Dashboard';

const Auth = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#312e38',
        },
      }}
      initialRouteName="Dashboard"
    >
      <Auth.Screen name="Dashboard" component={DashBoard} />
    </Auth.Navigator>
  );
};

export default AppRoutes;
