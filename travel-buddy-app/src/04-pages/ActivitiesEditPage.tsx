import React from 'react';
import { useParams } from 'react-router-dom';
import { ActivityFormContainer } from '../containers';

export interface ActivitiesEditPageProps {}

export const ActivitiesEditPage: React.FC<ActivitiesEditPageProps> = () => {
  const { id } = useParams();
  return <ActivityFormContainer activityId={Number(id)} />;
};
