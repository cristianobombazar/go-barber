import React from 'react';

import { Switch } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dasboard from '../pages/Dasboard';
import Route from './Route';
import ForgotPassword from '../pages/ForgotPassword';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />


    <Route path="/dashboard" component={Dasboard} isPrivate />
  </Switch>
);

export default Routes;
