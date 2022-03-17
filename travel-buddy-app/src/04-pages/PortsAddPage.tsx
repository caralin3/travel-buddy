import React from 'react';
import { Container } from 'reactstrap';
import { PortFormContainer } from '../containers';

export interface PortsAddPageProps {}

export const PortsAddPage: React.FC<PortsAddPageProps> = () => {
  return (
    <Container className="py-5">
      <PortFormContainer />
    </Container>
  );
};
