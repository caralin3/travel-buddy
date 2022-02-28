import React from 'react';
import { Container } from 'reactstrap';

export interface BannerProps {}

export const Banner: React.FC<BannerProps> = ({ children }) => (
  <Container fluid className="px-2 py-3 bg-info border-bottom border-top">
    {children}
  </Container>
);
