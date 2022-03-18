import React from 'react';
import { Input, Col, Row, FormFeedback } from 'reactstrap';
import { CostInput, Form, FormGroup, Label, Select, SelectOption } from '../02-molecules';
import { PortRequest } from '../api';
import { CruiseSelector, TripSelector } from '../containers';
import { StateSelector } from './StateSelector';

export interface PortFormProps {
  edit?: boolean;
  endDateInvalid: boolean;
  errorMessage?: string;
  port: PortRequest;
  loading: boolean;
  onSubmit: () => void;
  setErrorMessage?: (value: string) => void;
  setPortField: (value: string, field: keyof PortRequest) => void;
}

export const PortForm: React.FC<PortFormProps> = ({
  edit = false,
  endDateInvalid,
  errorMessage,
  port,
  loading,
  onSubmit,
  setErrorMessage,
  setPortField,
}) => {
  const setMessage = () => {
    if (setErrorMessage) {
      setErrorMessage('');
    }
  };

  return (
    <Form title={edit ? 'Update Port' : 'Create Port'} onSubmit={onSubmit} loading={loading}>
      <Row>
        <Col xs={12}>
          <CruiseSelector
            required
            value={port.cruiseId.toString()}
            onSelect={(e) => {
              setMessage();
              setPortField(e.target.value, 'cruiseId');
            }}
          />
        </Col>
        <Col xs={12} md={4}>
          <FormGroup>
            <Label required for="port-day">
              Day
            </Label>
            <Input
              required
              id="port-day"
              name="port-day"
              type="number"
              defaultValue={port.day}
              onChange={(e) => {
                setMessage();
                setPortField(e.target.value, 'day');
              }}
            />
          </FormGroup>
        </Col>
        <Col xs={12} md={4}>
          <FormGroup>
            <Label required for="port-start-date">
              Departure Date
            </Label>
            <Input
              required
              id="port-start-date"
              name="port-start-date"
              type="datetime"
              defaultValue={port.departure}
              onChange={(e) => {
                setMessage();
                setPortField(e.target.value, 'departure');
              }}
            />
          </FormGroup>
        </Col>
        <Col xs={12} md={4}>
          <FormGroup>
            <Label required for="port-end-date">
              Arrival Date
            </Label>
            <Input
              required
              id="port-end-date"
              name="port-end-date"
              type="datetime"
              defaultValue={port.arrival}
              invalid={endDateInvalid}
              onChange={(e) => {
                setMessage();
                setPortField(e.target.value, 'arrival');
              }}
            />
            <FormFeedback>End date must be after start date.</FormFeedback>
          </FormGroup>
        </Col>
        <Col xs={12}>
          <FormGroup>
            <Label required for="port-description">
              Description
            </Label>
            <Input
              required
              id="port-description"
              name="port-description"
              type="textarea"
              defaultValue={port.description}
              onChange={(e) => {
                setMessage();
                setPortField(e.target.value, 'description');
              }}
            />
          </FormGroup>
        </Col>
        <Col xs={12} md={4}>
          <FormGroup>
            <Label required for="port-city">
              City
            </Label>
            <Input
              required
              id="port-city"
              name="port-city"
              type="text"
              defaultValue={port.city}
              onChange={(e) => {
                setMessage();
                setPortField(e.target.value, 'city');
              }}
            />
          </FormGroup>
        </Col>
        <Col xs={12} md={4}>
          <StateSelector
            id="port-state"
            label="State"
            value={port.state ? port.state.toString() : ''}
            onSelect={(e) => {
              setMessage();
              setPortField(e.target.value, 'state');
            }}
          />
        </Col>
        <Col xs={12} md={4}>
          <FormGroup>
            <Label required for="port-country">
              Country
            </Label>
            <Input
              required
              id="port-country"
              name="port-country"
              type="text"
              defaultValue={port.city}
              onChange={(e) => {
                setMessage();
                setPortField(e.target.value, 'country');
              }}
            />
          </FormGroup>
        </Col>
      </Row>
      {!!errorMessage && <p className="form-text text-danger">{errorMessage}</p>}
    </Form>
  );
};
