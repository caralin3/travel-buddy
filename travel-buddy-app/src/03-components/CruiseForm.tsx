import React from 'react';
import { Input, Col, Row, FormFeedback } from 'reactstrap';
import { CostInput, Form, FormGroup, Label, Select, SelectOption } from '../02-molecules';
import { CruiseRequest } from '../api';

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

  const cabinTypeOptions: SelectOption[] = [
    {
      label: 'Single',
      value: 'SINGLE',
    },
    {
      label: 'Double',
      value: 'DOUBLE',
    },
    {
      label: 'Suite',
      value: 'SUITE',
    },
  ];

  return (
    <Form title={edit ? 'Update Cruise' : 'Create Cruise'} onSubmit={onSubmit} loading={loading}>
      <Row>
        <Col sm={12} md={6}>
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
        <Col sm={12} md={6}>
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
        <Col sm={12} md={4}>
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
        <Col sm={12} md={4}>
          <Select
            id="cruise-cabin-type"
            label="Cabin Type"
            options={cabinTypeOptions}
            value={cruise.cabinType ? cruise.cabinType.toString() : ''}
            onSelect={(e) => {
              setMessage();
              setCruiseField(e.target.value, 'cabinType');
            }}
          />
        </Col>
        <Col sm={12} md={4}>
          <FormGroup>
            <Label required for="cruise-description">
              Description
            </Label>
            <Input
              required
              id="cruise-description"
              name="cruise-description"
              type="text"
              defaultValue={cruise.description}
              onChange={(e) => {
                setMessage();
                setCruiseField(e.target.value, 'description');
              }}
            />
          </FormGroup>
        </Col>
        <Col sm={12} md={6} lg={3}>
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
        <Col sm={12} md={6} lg={3}>
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
        <Col sm={12} md={6} lg={3}>
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
        {/* @TODO: State dropdown */}
        <Col sm={12} md={6} lg={3}>
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
        <Col sm={12} md={6} lg={3}>
          <FormGroup>
            <Label required for="cruise-destination-city">
              Destination City
            </Label>
            <Input
              required
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
        {/* @TODO: State dropdown */}
        <Col sm={12} md={6} lg={3}>
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
        <Col sm={12} md={6} lg={3}>
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
        <Col sm={12} md={6} lg={3}>
          <FormGroup>
            <Label for="cruise-currency">Currency</Label>
            <Input
              id="cruise-currency"
              name="cruise-currency"
              cabintypeName="text-uppercase"
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
