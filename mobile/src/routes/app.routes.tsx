import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import DashBoard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import CreateAppointment from '../pages/CreateAppointment';
import AppointmentCreated from '../pages/AppointmentCreated';

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
      <Auth.Screen name="CreateAppointment" component={CreateAppointment} />
      <Auth.Screen name="AppointmentCreated" component={AppointmentCreated} />

      <Auth.Screen name="Profile" component={Profile} />
    </Auth.Navigator>
  );
};

export default AppRoutes;
