import React from 'react';
import { Container } from 'reactstrap';
import { LoginForm } from '../03-components';

export interface LoginPageProps {}

export const LoginPage: React.FC<LoginPageProps> = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    console.log(email, password);
  };

  return (
    <Container className="d-flex flex-column align-items-center py-5">
      <LoginForm
        email={email}
        password={password}
        onSubmit={handleLogin}
        setEmail={setEmail}
        setPassword={setPassword}
      />
    </Container>
  );
};
