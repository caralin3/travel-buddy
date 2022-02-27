import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container } from 'reactstrap';
import { RegisterForm } from '../03-components';
import { handleError, LoginSuccessResponse } from '../api';
import AuthService from '../api/services/AuthService';
import { HOME } from '../routes';
import * as sessionState from '../store/reducers/session';

export interface RegisterPageProps {}

export const RegisterPage: React.FC<RegisterPageProps> = () => {
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
      const loginRes = await AuthService.loginUser({ email, password });
      if (LoginSuccessResponse.is(loginRes)) {
        dispatch(sessionState.setLogin(loginRes));
      }
      setLoading(false);
      navigate(HOME, { replace: true });
    } catch (err) {
      setLoading(false);
      handleError(err, (msg) => setErrorMessage(msg));
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center py-5">
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
    </Container>
  );
};
