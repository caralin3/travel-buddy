import React from 'react';
import { useParams } from 'react-router-dom';
import { CruiseFormContainer } from '../containers';

export interface CruisesEditPageProps {}

export const CruisesEditPage: React.FC<CruisesEditPageProps> = () => {
  const { id } = useParams();
  return <CruiseFormContainer cruiseId={Number(id)} />;
};
