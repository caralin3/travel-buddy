import React from 'react';
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

export interface ListItemProps {
  dates?: string;
  description?: string;
  heading: string;
  onClick?: () => void;
}

export const ListItem: React.FC<ListItemProps> = ({ dates, description, heading, onClick }) => (
  <ListGroupItem className="list-item py-3" onClick={!!onClick ? onClick : undefined}>
    <ListGroupItemHeading className="list-item__heading text-primary">{heading}</ListGroupItemHeading>
    <ListGroupItemText className="list-item__body d-flex flex-column align-items-start m-0">
      {!!dates && <span className="list-item__dates">{dates}</span>}
      {!!description && (
        <span className="list-item__description mt-3" dangerouslySetInnerHTML={{ __html: description }} />
      )}
    </ListGroupItemText>
  </ListGroupItem>
);
