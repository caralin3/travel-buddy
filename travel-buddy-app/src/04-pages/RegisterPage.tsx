import React from 'react';
import { Container } from 'reactstrap';
import { RegisterForm } from '../03-components';

export interface RegisterPageProps {}

export const RegisterPage: React.FC<RegisterPageProps> = () => {
  const [email, setEmail] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');

  const handleRegister = () => {
    console.log(email, password, passwordConfirm);
  };

  return (
    <Container className="d-flex flex-column align-items-center py-5">
      <RegisterForm
        email={email}
        firstName={firstName}
        lastName={lastName}
        password={password}
        passwordConfirm={passwordConfirm}
        onSubmit={handleRegister}
        setEmail={setEmail}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setPassword={setPassword}
        setPasswordConfirm={setPasswordConfirm}
      />
    </Container>
  );
};
