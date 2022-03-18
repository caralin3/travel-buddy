import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container } from 'reactstrap';
import { EmptyMessage } from '../01-atoms';
import { AddDropdown, DetailBanner, ItineraryCard } from '../02-molecules';
import { ActivityDetail, PortDetail, SeaDayDetail } from '../03-components';
import { Activity, Port } from '../api';
import { CRUISES_ROUTE } from '../router';
import { RootState } from '../store';
import * as activitiesState from '../store/reducers/activities';
import * as cruisesState from '../store/reducers/cruises';
import * as portsState from '../store/reducers/ports';
import { getAllDays, getEntityByDay, STANDARD_DATE_FORMAT } from '../utils';

export interface CruiseDetailPageProps {}

export const CruiseDetailPage: React.FC<CruiseDetailPageProps> = () => {
  const { id } = useParams();

  const cruise = useSelector((state: RootState) => cruisesState.selectById(state, Number(id)));
  const activities = useSelector((state: RootState) => activitiesState.selectFutureActivities(state)).filter(
    (activity: Activity) => !!activity.cruise && activity.cruise.id === Number(id)
  );
  const ports = useSelector((state: RootState) => portsState.selectFuturePorts(state)).filter(
    (port: Port) => port.cruise.id === Number(id)
  );

  const days = !!cruise
    ? getAllDays(cruise.startDate, moment(cruise.endDate).add(1, 'day').format(STANDARD_DATE_FORMAT))
    : [];

  return (
    <div className="cruise-detail-page pb-5">
      {!!cruise ? (
        <>
          <DetailBanner
            title={`${cruise.cruiseLine}: ${cruise.shipName}`}
            description={cruise.description}
            endDate={cruise.endDate}
            startDate={cruise.startDate}
          />
          <div className="itinerary px-5 my-4">
            <div className="d-flex flex-row justify-content-between">
              <h3 className="itinerary__title mb-4">Itinerary Details</h3>
              <AddDropdown />
            </div>
            {days.map((day, index) => (
              <ItineraryCard date={day} key={index}>
                {getEntityByDay(ports, 'arrival', day).length > 0
                  ? getEntityByDay(ports, 'arrival', day).map((port) => (
                      <div className="itinerary-card__detail" key={port.id}>
                        <PortDetail port={port} />
                      </div>
                    ))
                  : index !== 0 &&
                    cruise.roundTrip && (
                      <div className="itinerary-card__detail">
                        <SeaDayDetail day={index} />
                      </div>
                    )}
                {getEntityByDay(activities, 'startDate', day).length > 0 && (
                  <div className="itinerary-card__detail">
                    <ActivityDetail activities={getEntityByDay(activities, 'startDate', day)} />
                  </div>
                )}
              </ItineraryCard>
            ))}
          </div>
        </>
      ) : (
        <Container className="pt-5">
          <EmptyMessage message="Flight not found" link={{ label: 'Return to view Cruises', path: CRUISES_ROUTE }} />
        </Container>
      )}
    </div>
  );
};
