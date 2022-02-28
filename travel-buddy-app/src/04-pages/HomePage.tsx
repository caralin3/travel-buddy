import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { RegisterFormContainer } from '../containers';
import { RootState } from '../store';

export interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = () => {
  const isAuthenticated = useSelector((state: RootState) => state.session.isAuthenticated);

  return (
    <Container className="py-5">
      <Row className="pb-5">
        <Col xs={12} md={!isAuthenticated ? 6 : 12}>
          <h1 className="text-start">Travel Buddy</h1>
          <p className="text-start">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <p className="text-start">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
        </Col>
        {!isAuthenticated && (
          <Col xs={12} md={6}>
            <RegisterFormContainer />
          </Col>
        )}
      </Row>
      <Row className="pt-5 border-top">
        <Col xs={12} md={6}>
          <h3 className="text-start">Feature 1</h3>
          <p className="text-start">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </Col>
        <Col xs={12} md={6}>
          <h3 className="text-start">Feature 1</h3>
          <p className="text-start">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </Col>
      </Row>
    </Container>
  );
};
