import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../03-components';
import { handleError, LoginSuccessResponse } from '../api';
import AuthService from '../api/services/AuthService';
import { DASHBOARD_ROUTE } from '../router';
import * as sessionState from '../store/reducers/session';
import { login } from '../utils';

export interface RegisterFormContainerProps {}

export const RegisterFormContainer: React.FC<RegisterFormContainerProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');

  const handleRegister = async () => {
    try {
      setLoading(true);
      await AuthService.registerUser({
        firstName,
        lastName,
        email,
        password,
      });
      const res = await login({ email, password });
      if (LoginSuccessResponse.is(res)) {
        dispatch(sessionState.setLogin(res));
        navigate(DASHBOARD_ROUTE, { replace: true });
      }
    } catch (err) {
      setLoading(false);
      handleError(err, (msg) => setErrorMessage(msg));
    }
  };

  return (
    <RegisterForm
      email={email}
      errorMessage={errorMessage}
      firstName={firstName}
      lastName={lastName}
      loading={loading}
      password={password}
      passwordConfirm={passwordConfirm}
      onSubmit={handleRegister}
      setEmail={setEmail}
      setErrorMessage={setErrorMessage}
      setFirstName={setFirstName}
      setLastName={setLastName}
      setPassword={setPassword}
      setPasswordConfirm={setPasswordConfirm}
    />
  );
};
