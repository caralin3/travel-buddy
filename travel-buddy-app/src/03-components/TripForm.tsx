import React from 'react';
import { Input, Col, Row, FormFeedback } from 'reactstrap';
import { Form, FormGroup, Label } from '../02-molecules';
import { TripRequest } from '../api';

export interface TripFormProps {
  description: string;
  edit?: boolean;
  endDate: string;
  endDateInvalid: boolean;
  errorMessage?: string;
  loading: boolean;
  onSubmit: () => void;
  setErrorMessage?: (value: string) => void;
  setTripField: (value: string, field: keyof TripRequest) => void;
  startDate: string;
  title: string;
}

export const TripForm: React.FC<TripFormProps> = ({
  description,
  edit = false,
  endDate,
  endDateInvalid,
  errorMessage,
  loading,
  onSubmit,
  setErrorMessage,
  setTripField,
  startDate,
  title,
}) => {
  const setMessage = () => {
    if (setErrorMessage) {
      setErrorMessage('');
    }
  };

  return (
    <Form title={edit ? 'Update Trip' : 'Create Trip'} onSubmit={onSubmit} loading={loading}>
      <Row>
        <Col sm={12} md={6}>
          <FormGroup>
            <Label required for="trip-title">
              Title
            </Label>
            <Input
              required
              id="trip-title"
              name="trip-title"
              type="text"
              defaultValue={title}
              onChange={(e) => {
                setMessage();
                setTripField(e.target.value, 'title');
              }}
            />
          </FormGroup>
        </Col>
        <Col sm={12} md={6}>
          <FormGroup>
            <Label for="trip-description">Description</Label>
            <Input
              id="trip-description"
              name="trip-description"
              type="textarea"
              defaultValue={description}
              onChange={(e) => {
                setMessage();
                setTripField(e.target.value, 'description');
              }}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={6}>
          <FormGroup>
            <Label required for="trip-start-date">
              Start Date
            </Label>
            <Input
              required
              id="trip-start-date"
              name="trip-start-date"
              type="date"
              defaultValue={startDate}
              onChange={(e) => {
                setMessage();
                setTripField(e.target.value, 'startDate');
              }}
            />
          </FormGroup>
        </Col>
        <Col sm={12} md={6}>
          <FormGroup>
            <Label required for="trip-end-date">
              End Date
            </Label>
            <Input
              required
              id="trip-end-date"
              name="trip-end-date"
              type="date"
              defaultValue={endDate}
              invalid={endDateInvalid}
              onChange={(e) => {
                setMessage();
                setTripField(e.target.value, 'endDate');
              }}
            />
            <FormFeedback>End date must be after start date.</FormFeedback>
          </FormGroup>
        </Col>
      </Row>
      {!!errorMessage && <p className="form-text text-danger">{errorMessage}</p>}
    </Form>
  );
};
