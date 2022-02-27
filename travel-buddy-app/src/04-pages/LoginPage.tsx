import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container } from 'reactstrap';
import { LoginForm } from '../03-components';
import { handleError, LoginSuccessResponse } from '../api';
import { DASHBOARD_ROUTE } from '../router';
import * as sessionState from '../store/reducers/session';
import { login } from '../utils';

export interface LoginPageProps {}

export const LoginPage: React.FC<LoginPageProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [password, setPassword] = React.useState('');

  const from = (location.state as any)?.from?.pathname || DASHBOARD_ROUTE;

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await login({ email, password });
      if (LoginSuccessResponse.is(res)) {
        dispatch(sessionState.setLogin(res));
        navigate(from, { replace: true });
      }
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
