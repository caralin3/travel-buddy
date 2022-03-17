import React from 'react';
import { Container } from 'reactstrap';
import { CruiseFormContainer } from '../containers';

export interface CruisesAddPageProps {}

export const CruisesAddPage: React.FC<CruisesAddPageProps> = () => {
  return (
    <Container className="py-5">
      <CruiseFormContainer />
    </Container>
  );
};
