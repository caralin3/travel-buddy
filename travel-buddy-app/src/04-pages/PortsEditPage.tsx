import React from 'react';
import { useParams } from 'react-router-dom';
import { PortFormContainer } from '../containers';

export interface PortsEditPageProps {}

export const PortsEditPage: React.FC<PortsEditPageProps> = () => {
  const { id } = useParams();
  return <PortFormContainer portId={Number(id)} />;
};
