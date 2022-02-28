import React from 'react';
import { Link } from 'react-router-dom';
import { Card as RBCard, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import { LinkItem } from '../types';

export interface CardProps {
  buttonLabel?: string;
  icon?: string;
  link?: LinkItem;
  onButtonClick?: VoidFunction;
  subtitle?: string;
  title: string;
}

export const Card: React.FC<CardProps> = ({ buttonLabel, children, icon, link, onButtonClick, subtitle, title }) => (
  <RBCard>
    <CardBody>
      <CardTitle tag="h5">{title}</CardTitle>
      {!!subtitle && (
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {subtitle}
        </CardSubtitle>
      )}
      <CardText>{children}</CardText>
      {buttonLabel && (
        <Button onClick={onButtonClick} color="primary">
          {buttonLabel}
        </Button>
      )}
      {!!link && (
        <Link className="btn btn-primary" to={link.path}>
          {link.label}
        </Link>
      )}
    </CardBody>
  </RBCard>
);
