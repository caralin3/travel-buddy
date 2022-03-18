import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { Select, SelectOption } from '../02-molecules';
import { RootState } from '../store';
import * as cruisesState from '../store/reducers/cruises';

export interface CruiseSelectorProps {
  onSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  value: string;
}

export const CruiseSelector: React.FC<CruiseSelectorProps> = ({ onSelect, required, value }) => {
  const cruises = useSelector((state: RootState) => cruisesState.selectFutureCruises(state));

  function getOptions() {
    const options: SelectOption[] = [];
    if (cruises.length > 0) {
      cruises.forEach((cruise) => {
        options.push({
          label: `${cruise.cruiseLine} ${cruise.shipName}`,
          value: cruise.id.toString(),
        });
      });
    }
    return options;
  }

  return (
    <Select
      value={value}
      label="Cruise"
      id="cruise-select"
      options={getOptions()}
      onSelect={onSelect}
      required={required}
    />
  );
};
