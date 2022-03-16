import moment from 'moment';
import React from 'react';
import { useParams } from 'react-router-dom';
import { DetailBanner, ItineraryCard } from '../02-molecules';
import { formatDate, getAllDays, getDaysUntil } from '../utils';
import { cruises } from '../__mocks__';

export interface CruiseDetailPageProps {}

export const CruiseDetailPage: React.FC<CruiseDetailPageProps> = () => {
  const { id } = useParams();
  const cruise = cruises[Number(id)];

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
        {days.map((day) => (
          <ItineraryCard date={day}></ItineraryCard>
        ))}
      </div>
    </div>
  );
};
