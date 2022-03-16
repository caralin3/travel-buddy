import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Container, ListGroup } from 'reactstrap';
import { ListItem } from '../02-molecules';
import { ADD_CRUISES_ROUTE, CRUISES_ROUTE } from '../router';
import { RootState } from '../store';
import * as cruisesState from '../store/reducers/cruises';
import { formatDate, SHORT_DATE_FORMAT } from '../utils';

export interface CruisesPageProps {}

export const CruisesPage: React.FC<CruisesPageProps> = () => {
  const navigate = useNavigate();

  const cruises = useSelector((state: RootState) => cruisesState.selectFutureCruises(state));

  return (
    <Container className="py-5">
      <div className="d-flex align-items-center justify-content-center position-relative pb-3">
        <h1 className="">Cruises</h1>
        <Link className="btn btn-secondary position-absolute" style={{ right: 0 }} to={ADD_CRUISES_ROUTE}>
          Add New Cruise
        </Link>
      </div>
      {cruises && cruises.length > 0 ? (
        <ListGroup>
          {cruises.map((cruise) => (
            <ListItem
              heading={`${cruise.cruiseLine}: ${cruise.shipName}`}
              description={
                !!cruise.description
                  ? cruise.description
                  : cruise.roundTrip
                  ? cruise.departureCity
                  : cruise.destinationCity
              }
              dates={`${formatDate(cruise.startDate, SHORT_DATE_FORMAT)} - ${formatDate(
                cruise.endDate,
                SHORT_DATE_FORMAT
              )}`}
              onClick={() => navigate(`${CRUISES_ROUTE}/${cruise.id}`)}
            />
          ))}
        </ListGroup>
      ) : (
        <em className="h6">No cruises found</em>
      )}
    </Container>
  );
};
