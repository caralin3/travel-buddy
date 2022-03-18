import React from 'react';
import { Input, Col, Row, FormFeedback } from 'reactstrap';
import { CostInput, Form, FormGroup, Label, SelectOption } from '../02-molecules';
import { ActivityRequest } from '../api';
import { CruiseSelector, PortSelector, TripSelector } from '../containers';
import { StateSelector } from './StateSelector';

export interface ActivityFormProps {
  edit?: boolean;
  endDateInvalid: boolean;
  errorMessage?: string;
  activity: ActivityRequest;
  loading: boolean;
  onSubmit: () => void;
  setErrorMessage?: (value: string) => void;
  setActivityField: (value: string, field: keyof ActivityRequest) => void;
}

export const ActivityForm: React.FC<ActivityFormProps> = ({
  edit = false,
  endDateInvalid,
  errorMessage,
  activity,
  loading,
  onSubmit,
  setErrorMessage,
  setActivityField,
}) => {
  const setMessage = () => {
    if (setErrorMessage) {
      setErrorMessage('');
    }
  };

  return (
    <Form title={edit ? 'Update Activity' : 'Create Activity'} onSubmit={onSubmit} loading={loading}>
      <Row>
        <Col xs={12}>
          <TripSelector
            required
            value={activity.tripId.toString()}
            onSelect={(e) => {
              setMessage();
              setActivityField(e.target.value, 'tripId');
            }}
          />
        </Col>
        <Col xs={12} md={6}>
          <CruiseSelector
            value={activity.tripId.toString()}
            onSelect={(e) => {
              setMessage();
              setActivityField(e.target.value, 'tripId');
            }}
          />
        </Col>
        <Col xs={12} md={6}>
          <PortSelector
            value={activity.tripId.toString()}
            onSelect={(e) => {
              setMessage();
              setActivityField(e.target.value, 'tripId');
            }}
          />
        </Col>
        <Col xs={12} md={6}>
          <FormGroup>
            <Label required for="activity-name">
              Name
            </Label>
            <Input
              required
              id="activity-name"
              name="activity-name"
              type="text"
              defaultValue={activity.name}
              onChange={(e) => {
                setMessage();
                setActivityField(e.target.value, 'name');
              }}
            />
          </FormGroup>
        </Col>
        <Col xs={12} md={6}>
          <FormGroup>
            <Label for="activity-company">Company</Label>
            <Input
              id="activity-company"
              name="activity-company"
              type="text"
              defaultValue={activity.company}
              onChange={(e) => {
                setMessage();
                setActivityField(e.target.value, 'company');
              }}
            />
          </FormGroup>
        </Col>
        <Col xs={12}>
          <FormGroup>
            <Label required for="activity-description">
              Description
            </Label>
            <Input
              required
              id="activity-description"
              name="activity-description"
              type="textarea"
              defaultValue={activity.description}
              onChange={(e) => {
                setMessage();
                setActivityField(e.target.value, 'description');
              }}
            />
          </FormGroup>
        </Col>
        <Col xs={12} md={6} lg={3}>
          <FormGroup>
            <Label required for="activity-start-date">
              Start Date
            </Label>
            <Input
              required
              id="activity-start-date"
              name="activity-start-date"
              type="datetime"
              defaultValue={activity.startDate}
              onChange={(e) => {
                setMessage();
                setActivityField(e.target.value, 'startDate');
              }}
            />
          </FormGroup>
        </Col>
        <Col xs={12} md={6} lg={3}>
          <FormGroup>
            <Label required for="activity-end-date">
              End Date
            </Label>
            <Input
              required
              id="activity-end-date"
              name="activity-end-date"
              type="datetime"
              defaultValue={activity.endDate}
              invalid={endDateInvalid}
              onChange={(e) => {
                setMessage();
                setActivityField(e.target.value, 'endDate');
              }}
            />
            <FormFeedback>End date must be after start date.</FormFeedback>
          </FormGroup>
        </Col>
        <Col xs={12} md={6} lg={3}>
          <FormGroup>
            <Label for="activity-cost">Cost</Label>
            <CostInput
              id="activity-cost"
              name="activity-cost"
              defaultValue={activity.cost}
              onChange={(e) => {
                setMessage();
                setActivityField(e.target.value, 'cost');
              }}
            />
          </FormGroup>
        </Col>
        <Col xs={12} md={6} lg={3}>
          <FormGroup>
            <Label for="activity-currency">Currency</Label>
            <Input
              id="activity-currency"
              name="activity-currency"
              className="text-uppercase"
              type="text"
              defaultValue={activity.currency}
              maxLength={3}
              onChange={(e) => {
                setMessage();
                setActivityField(e.target.value, 'currency');
              }}
            />
          </FormGroup>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <FormGroup>
            <Label required for="activity-street">
              Street
            </Label>
            <Input
              required
              id="activity-street"
              name="activity-street"
              className="text-uppercase"
              type="text"
              defaultValue={activity.addressLine1}
              maxLength={3}
              onChange={(e) => {
                setMessage();
                setActivityField(e.target.value, 'addressLine1');
              }}
            />
          </FormGroup>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <FormGroup>
            <Label for="activity-street-2">Street 2</Label>
            <Input
              id="activity-street-2"
              name="activity-street-2"
              className="text-uppercase"
              type="text"
              defaultValue={activity.addressLine2}
              maxLength={3}
              onChange={(e) => {
                setMessage();
                setActivityField(e.target.value, 'addressLine2');
              }}
            />
          </FormGroup>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <FormGroup>
            <Label for="activity-city">City</Label>
            <Input
              id="activity-city"
              name="activity-city"
              type="text"
              defaultValue={activity.city}
              onChange={(e) => {
                setMessage();
                setActivityField(e.target.value, 'city');
              }}
            />
          </FormGroup>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <StateSelector
            id="activity-state"
            label="State"
            value={activity.state ? activity.state.toString() : ''}
            onSelect={(e) => {
              setMessage();
              setActivityField(e.target.value, 'state');
            }}
          />
        </Col>
        <Col xs={12} md={6} lg={4}>
          <FormGroup>
            <Label for="activity-postal-code">Postal Code</Label>
            <Input
              id="activity-postal-code"
              name="activity-postal-code"
              className="text-uppercase"
              type="text"
              defaultValue={activity.postalCode}
              onChange={(e) => {
                setMessage();
                setActivityField(e.target.value, 'postalCode');
              }}
            />
          </FormGroup>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <FormGroup>
            <Label for="activity-country">Country</Label>
            <Input
              id="activity-country"
              name="activity-country"
              type="text"
              defaultValue={activity.country}
              onChange={(e) => {
                setMessage();
                setActivityField(e.target.value, 'country');
              }}
            />
          </FormGroup>
        </Col>
      </Row>
      {!!errorMessage && <p className="form-text text-danger">{errorMessage}</p>}
    </Form>
  );
};
