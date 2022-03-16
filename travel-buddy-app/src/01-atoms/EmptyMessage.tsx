import React from 'react';
import { Link } from 'react-router-dom';
import { LinkItem } from '../types';

export interface EmptyMessageProps {
  link?: LinkItem;
  message: string;
}

export const EmptyMessage: React.FC<EmptyMessageProps> = ({ link, message }) => (
  <>
    <p className="m-0">
      <em className="h6">{message}</em>
    </p>
    {!!link && <Link to={link.path}>{link.label}</Link>}
  </>
);
