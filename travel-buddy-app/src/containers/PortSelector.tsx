import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { Select, SelectOption } from '../02-molecules';
import { RootState } from '../store';
import * as portsState from '../store/reducers/ports';

export interface PortSelectorProps {
  onSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  value: string;
}

export const PortSelector: React.FC<PortSelectorProps> = ({ onSelect, required, value }) => {
  const ports = useSelector((state: RootState) => portsState.selectFuturePorts(state));

  function getOptions() {
    const options: SelectOption[] = [];
    if (ports.length > 0) {
      ports.forEach((port) => {
        options.push({
          label: `${port.city}, ${port.state ? port.state : port.country}`,
          value: port.id.toString(),
        });
      });
    }
    return options;
  }

  return (
    <Select
      value={value}
      label="Port"
      id="port-select"
      options={getOptions()}
      onSelect={onSelect}
      required={required}
    />
  );
};
