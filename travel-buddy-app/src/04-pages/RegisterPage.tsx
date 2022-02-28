import React from 'react';
import { Container } from 'reactstrap';
import { RegisterFormContainer } from '../containers';
export interface RegisterPageProps {}

export const RegisterPage: React.FC<RegisterPageProps> = () => {
  return (
    <Container className="d-flex flex-column align-items-center py-5">
      <RegisterFormContainer />
    </Container>
  );
};
