import moment from 'moment';
import React from 'react';
import { useParams } from 'react-router-dom';
import { DetailBanner, ItineraryCard } from '../02-molecules';
import { PortDetail, SeaDayDetail } from '../03-components';
import { Port } from '../api';
import { getAllDays, sortByDate } from '../utils';
import { cruise1Ports, cruises } from '../__mocks__';

export interface CruiseDetailPageProps {}

export const CruiseDetailPage: React.FC<CruiseDetailPageProps> = () => {
  const { id } = useParams();
  const cruise = cruises[Number(id)];

  const sortedPorts: Port[] = sortByDate(cruise1Ports, 'arrival').filter((port: Port) => port.cruise.id === Number(id));
  const getPortByDay = (day: string) => sortedPorts.filter((port) => moment(port.arrival).format('YYYY-MM-DD') === day);

  const days = getAllDays(cruise.startDate, moment(cruise.endDate).add(1, 'day').format('YYYY-MM-DD'));

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
          <ItineraryCard date={day}>
            {getPortByDay(day).length > 0
              ? getPortByDay(day).map((port) => (
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
          </ItineraryCard>
        ))}
      </div>
    </div>
  );
};
