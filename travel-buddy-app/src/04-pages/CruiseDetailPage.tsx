import moment from 'moment';
import React from 'react';
import { useParams } from 'react-router-dom';
import { DetailBanner, ItineraryCard } from '../02-molecules';
import { ActivityDetail, PortDetail, SeaDayDetail } from '../03-components';
import { Activity, Port } from '../api';
import { getAllDays, getEntityByDay, sortByDate, STANDARD_DATE_FORMAT } from '../utils';
import { activities, cruise1Ports, cruises } from '../__mocks__';

export interface CruiseDetailPageProps {}

export const CruiseDetailPage: React.FC<CruiseDetailPageProps> = () => {
  const { id } = useParams();
  const cruise = cruises[Number(id)];

  const ports: Port[] = sortByDate(cruise1Ports, 'arrival').filter((port: Port) => port.cruise.id === Number(id));
  const sortedActivities: Activity[] = sortByDate(activities, 'startDate').filter(
    (activity: Activity) => !!activity.cruise && activity.cruise.id === Number(id)
  );
  const days = getAllDays(cruise.startDate, moment(cruise.endDate).add(1, 'day').format(STANDARD_DATE_FORMAT));

  return (
    <div className="cruise-detail-page pb-5">
      <DetailBanner
        title={`${cruise.cruiseLine}: ${cruise.shipName}`}
        description={cruise.description}
        endDate={cruise.endDate}
        startDate={cruise.startDate}
      />
      <div className="itinerary px-5 my-4">
        <h3 className="itinerary__title mb-4">Itinerary Details</h3>
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
            {getEntityByDay(sortedActivities, 'startDate', day).length > 0 && (
              <div className="itinerary-card__detail">
                <ActivityDetail activities={getEntityByDay(activities, 'startDate', day)} />
              </div>
            )}
          </ItineraryCard>
        ))}
      </div>
    </div>
  );
};
