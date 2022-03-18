import React, { ChangeEvent } from 'react';
import { Select, SelectOption } from '../02-molecules';

export interface RoomTypeSelectorProps {
  id: string;
  label: string;
  onSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  value: string;
}

export const RoomTypeSelector: React.FC<RoomTypeSelectorProps> = (props) => {
  const options: SelectOption[] = [
    {
      label: 'Single',
      value: 'SINGLE',
    },
    {
      label: 'Double',
      value: 'DOUBLE',
    },
    {
      label: 'Suite',
      value: 'SUITE',
    },
  ];

  return <Select options={options} {...props} />;
};
