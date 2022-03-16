import moment from 'moment';
import React from 'react';
import { Col, Row } from 'reactstrap';
import { Activity } from '../api';
import { getDurationHours } from '../utils';

export interface ActivityDetailProps {
  activities: Activity[];
}

export const ActivityDetail: React.FC<ActivityDetailProps> = ({ activities }) => {
  const getDuration = (activity: Activity) => getDurationHours(activity.startDate, activity.endDate);

  return (
    <div className="activity-detail">
      <Row>
        <Col className="activity-detail__name text-primary">Activities</Col>
      </Row>
      <Row className="my-2">
        <Col xs={12} sm={2}>
          <p className="activity-detail__label">Time</p>
        </Col>
        <Col xs={12} sm={4}>
          <p className="activity-detail__label">Name</p>
        </Col>
        <Col xs={12} sm={6}>
          <p className="activity-detail__label">Notes</p>
        </Col>
      </Row>
      {activities.map((activity) => (
        <Row key={activity.id} className="activity">
          <Col xs={12} sm={2}>
            {moment(activity.startDate).format('h:mm A')}{' '}
            <em className="activity__duration">
              ({getDuration(activity)} hr{getDuration(activity) > 1 ? 's' : ''})
            </em>
          </Col>
          <Col xs={12} sm={4}>
            <p className="activity__name text-primary m-0">
              {activity.name}
              {!!activity.port && (
                <span className="activity__port">
                  &nbsp;({activity.port.city}, {!!activity.port.state ? activity.port.state : activity.port.country})
                </span>
              )}
            </p>
            <p className="activity__address m-0">
              {activity.addressLine1}
              {!!activity.addressLine2 ? ` ${activity.addressLine2}` : ''}
              {!!activity.city ? `, ${activity.city}` : ''}
              {!!activity.state ? `, ${activity.state}` : ''}
              {/* {!!activity.postalCode ? activity.postalCode : ''}{' '} */}
            </p>
          </Col>
          <Col xs={12} sm={6}>
            <p className="activity__notes m-0">{activity.description}</p>
          </Col>
        </Row>
      ))}
    </div>
  );
};
