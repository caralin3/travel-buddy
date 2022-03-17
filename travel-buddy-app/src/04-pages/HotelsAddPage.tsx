import React from 'react';
import { Container } from 'reactstrap';
import { HotelFormContainer } from '../containers';

export interface HotelsAddPageProps {}

export const HotelsAddPage: React.FC<HotelsAddPageProps> = () => {
  return (
    <Container className="py-5">
      <HotelFormContainer />
    </Container>
  );
};
