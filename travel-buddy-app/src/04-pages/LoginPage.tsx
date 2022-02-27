import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container } from 'reactstrap';
import { LoginForm } from '../03-components';
import { handleError, LoginSuccessResponse } from '../api';
import AuthService from '../api/services/AuthService';
import { HOME } from '../routes';
import * as sessionState from '../store/reducers/session';

export interface LoginPageProps {}

export const LoginPage: React.FC<LoginPageProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [password, setPassword] = React.useState('');

  const handleLogin = async () => {
    try {
      setLoading(true);
      const loginRes = await AuthService.loginUser({ email, password });
      if (LoginSuccessResponse.is(loginRes)) {
        dispatch(sessionState.setLogin(loginRes));
      }
      setLoading(false);
      navigate(HOME, { replace: true });
    } catch (err) {
      handleError(err, (msg) => setErrorMessage(msg));
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center py-5">
      <LoginForm
        email={email}
        errorMessage={errorMessage}
        loading={loading}
        onSubmit={handleLogin}
        password={password}
        setEmail={setEmail}
        setErrorMessage={setErrorMessage}
        setPassword={setPassword}
      />
    </Container>
  );
};
