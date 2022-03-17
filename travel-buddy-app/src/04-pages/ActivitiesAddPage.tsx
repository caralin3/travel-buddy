import React from 'react';
import { Container } from 'reactstrap';
import { ActivityFormContainer } from '../containers';

export interface ActivitiesAddPageProps {}

export const ActivitiesAddPage: React.FC<ActivitiesAddPageProps> = () => {
  return (
    <Container className="py-5">
      <ActivityFormContainer />
    </Container>
  );
};
