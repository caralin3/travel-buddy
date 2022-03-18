import React from 'react';
import { Input, Col, Row, FormFeedback } from 'reactstrap';
import { CostInput, Form, FormGroup, Label } from '../02-molecules';
import { CruiseRequest } from '../api';
import { TripSelector } from '../containers';
import { RoomTypeSelector } from './RoomTypeSelector';
import { StateSelector } from './StateSelector';

export interface CruiseFormProps {
  edit?: boolean;
  endDateInvalid: boolean;
  errorMessage?: string;
  cruise: CruiseRequest;
  loading: boolean;
  onSubmit: () => void;
  setErrorMessage?: (value: string) => void;
  setCruiseField: (value: string, field: keyof CruiseRequest) => void;
}

export const CruiseForm: React.FC<CruiseFormProps> = ({
  edit = false,
  endDateInvalid,
  errorMessage,
  cruise,
  loading,
  onSubmit,
  setErrorMessage,
  setCruiseField,
}) => {
  const setMessage = () => {
    if (setErrorMessage) {
      setErrorMessage('');
    }
  };

  return (
    <Form title={edit ? 'Update Cruise' : 'Create Cruise'} onSubmit={onSubmit} loading={loading}>
      <Row>
        <Col xs={12}>
          <TripSelector
            required
            value={cruise.tripId.toString()}
            onSelect={(e) => {
              setMessage();
              setCruiseField(e.target.value, 'tripId');
            }}
          />
        </Col>
        <Col xs={12} md={6}>
          <FormGroup>
            <Label required for="cruise-cruise-line">
              Cruise Line
            </Label>
            <Input
              required
              id="cruise-cruise-line"
              name="cruise-cruise-line"
              type="text"
              defaultValue={cruise.cruiseLine}
              onChange={(e) => {
                setMessage();
                setCruiseField(e.target.value, 'cruiseLine');
              }}
            />
          </FormGroup>
        </Col>
        <Col xs={12} md={6}>
          <FormGroup>
            <Label required for="cruise-ship-name">
              Ship Name
            </Label>
            <Input
              required
              id="cruise-ship-name"
              name="cruise-ship-name"
              type="text"
              defaultValue={cruise.shipName}
              onChange={(e) => {
                setMessage();
                setCruiseField(e.target.value, 'shipName');
              }}
            />
          </FormGroup>
        </Col>
        <Col xs={12}>
          <FormGroup>
            <Label required for="cruise-description">
              Description
            </Label>
            <Input
              required
              id="cruise-description"
              name="cruise-description"
              type="textarea"
              defaultValue={cruise.description}
              onChange={(e) => {
                setMessage();
                setCruiseField(e.target.value, 'description');
              }}
            />
          </FormGroup>
        </Col>
        <Col xs={12} md={3}>
          <FormGroup>
            <Label required for="cruise-number">
              Cabin Number
            </Label>
            <Input
              required
              id="cruise-number"
              name="cruise-number"
              type="text"
              defaultValue={cruise.cabinNumber}
              onChange={(e) => {
                setMessage();
                setCruiseField(e.target.value, 'cabinNumber');
              }}
            />
          </FormGroup>
        </Col>
        <Col xs={12} md={3}>
          <RoomTypeSelector
            id="cruise-cabin-type"
            label="Cabin Type"
            value={cruise.cabinType ? cruise.cabinType.toString() : ''}
            onSelect={(e) => {
              setMessage();
              setCruiseField(e.target.value, 'cabinType');
            }}
          />
        </Col>
        <Col xs={12} md={3}>
          <FormGroup>
            <Label required for="cruise-start-date">
              Start Date
            </Label>
            <Input
              required
              id="cruise-start-date"
              name="cruise-start-date"
              type="datetime"
              defaultValue={cruise.startDate}
              onChange={(e) => {
                setMessage();
                setCruiseField(e.target.value, 'startDate');
              }}
            />
          </FormGroup>
        </Col>
        <Col xs={12} md={3}>
          <FormGroup>
            <Label required for="cruise-end-date">
              End Date
            </Label>
            <Input
              required
              id="cruise-end-date"
              name="cruise-end-date"
              type="datetime"
              defaultValue={cruise.endDate}
              invalid={endDateInvalid}
              onChange={(e) => {
                setMessage();
                setCruiseField(e.target.value, 'endDate');
              }}
            />
            <FormFeedback>End date must be after start date.</FormFeedback>
          </FormGroup>
        </Col>
        <Col xs={12} md={4}>
          <FormGroup>
            <Label required for="cruise-departure-city">
              Departure City
            </Label>
            <Input
              required
              id="cruise-departure-city"
              name="cruise-departure-city"
              type="text"
              defaultValue={cruise.departureCity}
              onChange={(e) => {
                setMessage();
                setCruiseField(e.target.value, 'departureCity');
              }}
            />
          </FormGroup>
        </Col>
        <Col xs={12} md={4}>
          <StateSelector
            id="cruise-departure-state"
            label="Departure State"
            value={cruise.departureState ? cruise.departureState.toString() : ''}
            onSelect={(e) => {
              setMessage();
              setCruiseField(e.target.value, 'departureState');
            }}
          />
        </Col>
        <Col xs={12} md={4}>
          <FormGroup>
            <Label required for="cruise-departure-country">
              Departure Country
            </Label>
            <Input
              required
              id="cruise-departure-country"
              name="cruise-departure-country"
              type="text"
              defaultValue={cruise.departureCountry}
              onChange={(e) => {
                setMessage();
                setCruiseField(e.target.value, 'departureCountry');
              }}
            />
          </FormGroup>
        </Col>
        <Col xs={12} md={4}>
          <FormGroup>
            <Label for="cruise-destination-city">Destination City</Label>
            <Input
              id="cruise-destination-city"
              name="cruise-destination-city"
              type="text"
              defaultValue={cruise.destinationCity}
              onChange={(e) => {
                setMessage();
                setCruiseField(e.target.value, 'destinationCity');
              }}
            />
          </FormGroup>
        </Col>
        <Col xs={12} md={4}>
          <StateSelector
            id="cruise-destination-state"
            label="Destination State"
            value={cruise.destinationState ? cruise.destinationState.toString() : ''}
            onSelect={(e) => {
              setMessage();
              setCruiseField(e.target.value, 'destinationState');
            }}
          />
        </Col>
        <Col xs={12} md={4}>
          <FormGroup>
            <Label for="cruise-destination-country">Destination Country</Label>
            <Input
              id="cruise-destination-country"
              name="cruise-destination-country"
              type="text"
              defaultValue={cruise.destinationCountry}
              onChange={(e) => {
                setMessage();
                setCruiseField(e.target.value, 'destinationCountry');
              }}
            />
          </FormGroup>
        </Col>
        <Col xs={12} md={4}>
          <FormGroup>
            <Label for="cruise-cost">Cost</Label>
            <CostInput
              id="cruise-cost"
              name="cruise-cost"
              defaultValue={cruise.cost}
              onChange={(e) => {
                setMessage();
                setCruiseField(e.target.value, 'cost');
              }}
            />
          </FormGroup>
        </Col>
        <Col xs={12} md={4}>
          <FormGroup>
            <Label for="cruise-currency">Currency</Label>
            <Input
              id="cruise-currency"
              name="cruise-currency"
              className="text-uppercase"
              type="text"
              defaultValue={cruise.currency}
              maxLength={3}
              onChange={(e) => {
                setMessage();
                setCruiseField(e.target.value, 'currency');
              }}
            />
          </FormGroup>
        </Col>
      </Row>
      {!!errorMessage && <p className="form-text text-danger">{errorMessage}</p>}
    </Form>
  );
};
