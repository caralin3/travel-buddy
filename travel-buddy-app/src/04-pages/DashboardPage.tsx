import React from 'react';
import { Col, Row } from 'reactstrap';

export interface DashboardPagePageProps {}

export const DashboardPage: React.FC<DashboardPagePageProps> = () => {
  return (
    <>
      <Row>
        <Col sm={12}>
          <h1>Dashboard</h1>
        </Col>
      </Row>
    </>
  );
};
