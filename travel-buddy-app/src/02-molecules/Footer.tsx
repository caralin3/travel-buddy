import React from 'react';
import { Col, Row } from 'reactstrap';

export const Footer: React.FC = () => (
  <footer className="bg-light p-2">
    <Row>
      <Col>Travel Buddy</Col>
    </Row>
    <Row>
      <Col>
        <small className="text-muted">Copyright © 2022</small>
      </Col>
    </Row>
  </footer>
);
