import React from 'react';
import { Progress } from 'reactstrap';

const MAX_STRENGTH = 20;

export interface PasswordStrengthMeterProps {
  value: number;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ value }) => {
  const percentage = (value / MAX_STRENGTH) * 100;
  let color = 'danger';

  if (percentage > 75) {
    color = 'success';
  } else if (percentage > 50) {
    color = 'warning';
  }

  return (
    <div className="d-flex mt-2 w-100 align-items-center">
      <small>
        <em>Strength&nbsp;</em>
      </small>
      <Progress className="w-100" style={{ height: 10 }} value={value} max={MAX_STRENGTH} color={color} />
    </div>
  );
};
