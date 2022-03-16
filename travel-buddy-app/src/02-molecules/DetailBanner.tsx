import React from 'react';
import { formatDate, getDaysUntil } from '../utils';

export interface DetailBannerProps {
  description?: string;
  endDate: string;
  startDate: string;
  title: string;
}

export const DetailBanner: React.FC<DetailBannerProps> = ({ description, endDate, title, startDate }) => (
  <div className="detail-banner bg-secondary text-white px-5 py-4">
    <div className="detail-banner__text d-flex flex-column align-items-start">
      <h1>{title}</h1>
      {!!description && <p dangerouslySetInnerHTML={{ __html: description }} />}
      <p className="h4">
        {formatDate(startDate)} - {formatDate(endDate)}
      </p>
    </div>
    <p className="detail-banner__until circle text-uppercase m-0">
      <strong>{getDaysUntil(startDate)}</strong>
      <strong>days left</strong>
    </p>
  </div>
);
