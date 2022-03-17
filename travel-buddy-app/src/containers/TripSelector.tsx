import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { Select, SelectOption } from '../02-molecules';
import { RootState } from '../store';
import * as tripsState from '../store/reducers/trips';

export interface TripSelectorProps {
  onSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  value: string;
}

export const TripSelector: React.FC<TripSelectorProps> = ({ onSelect, required, value }) => {
  const trips = useSelector((state: RootState) => tripsState.selectFutureTrips(state));

  function getOptions() {
    const options: SelectOption[] = [];
    if (trips.length > 0) {
      trips.forEach((trip) => {
        options.push({
          label: trip.title,
          value: trip.id.toString(),
        });
      });
    }
    return options;
  }

  return (
    <Select
      value={value}
      label="Trips"
      id="trip-select"
      options={getOptions()}
      onSelect={onSelect}
      required={required}
    />
  );
};
