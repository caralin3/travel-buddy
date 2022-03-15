import React from 'react';
import { useParams } from 'react-router-dom';
import { TripDetail } from '../03-components';
import { trips } from '../__mocks__';

export interface TripDetailPageProps {}

export const TripDetailPage: React.FC<TripDetailPageProps> = () => {
  const { id } = useParams();
  const trip = trips[0];

  return (
    <div className="pb-5">
      <TripDetail trip={trip} />
    </div>
  );
};
