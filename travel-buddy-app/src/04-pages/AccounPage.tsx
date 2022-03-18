import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { RootState } from '../store';

export interface AccounPageProps {}

export const AccounPage: React.FC<AccounPageProps> = () => {
  const user = useSelector((state: RootState) => state.session.user);

  return (
    <Container className="account-page py-5">
      <Row className="pb-5">
        <Col xs={12}>
          <h1 className="account-page__title text-start pb-3">Account</h1>
          {!!user && (
            <div className="account-page__details text-start">
              <p className="account-page__field">
                <strong>Name:&nbsp;</strong>
                <span>
                  {user.firstName} {user.lastName}
                </span>
              </p>
              <p className="account-page__field">
                <strong>Email:&nbsp;</strong>
                <span>{user.email}</span>
              </p>
              <p className="account-page__field">
                <strong>Roles:&nbsp;</strong>
                <span>{user.roles.map((role) => role.name).toString()}</span>
              </p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};
