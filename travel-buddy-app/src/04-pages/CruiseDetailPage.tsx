import moment from 'moment';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ItineraryCard } from '../02-molecules';
import { formatDate, getAllDays, getDaysUntil } from '../utils';
import { cruises } from '../__mocks__';

export interface CruiseDetailPageProps {}

export const CruiseDetailPage: React.FC<CruiseDetailPageProps> = () => {
  const { id } = useParams();
  const cruise = cruises[Number(id)];

  const days = getAllDays(cruise.startDate, moment(cruise.endDate).add(1, 'day').format('YYYY-MM-DD'));

  return (
    <div className="cruise-detail-page pb-5">
      <div className="cruise-detail-page__header bg-secondary text-white px-5 py-4">
        <div className="d-flex flex-column align-items-start">
          <h1>
            {cruise.cruiseLine}: {cruise.shipName}
          </h1>
          {!!cruise.description && <p dangerouslySetInnerHTML={{ __html: cruise.description }} />}
          <p className="h4">
            {formatDate(cruise.startDate)} - {formatDate(cruise.endDate)}
          </p>
        </div>
        <p className="cruise-detail-page__until text-uppercase m-0">
          <strong>{getDaysUntil(cruise.startDate)}</strong>
          <br />
          <strong>days left</strong>
        </p>
      </div>
      <div className="itinerary px-5 my-4">
        <h3 className="itinerary__title mb-4">Itinerary Details</h3>
        {days.map((day) => (
          <ItineraryCard date={day}></ItineraryCard>
        ))}
      </div>
    </div>
  );
};
