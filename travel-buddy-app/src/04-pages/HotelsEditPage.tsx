import React from 'react';
import { useParams } from 'react-router-dom';
import { HotelFormContainer } from '../containers';

export interface HotelsEditPageProps {}

export const HotelsEditPage: React.FC<HotelsEditPageProps> = () => {
  const { id } = useParams();
  return <HotelFormContainer hotelId={Number(id)} />;
};
