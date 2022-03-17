import React from 'react';
import { Input, Col, Row, FormFeedback } from 'reactstrap';
import { CostInput, Form, FormGroup, Label, Select, SelectOption } from '../02-molecules';
import { FlightRequest } from '../api';
import { TripSelector } from '../containers';

export interface FlightFormProps {
  edit?: boolean;
  endDateInvalid: boolean;
  errorMessage?: string;
  flight: FlightRequest;
  loading: boolean;
  onSubmit: () => void;
  setErrorMessage?: (value: string) => void;
  setFlightField: (value: string, field: keyof FlightRequest) => void;
}

export const FlightForm: React.FC<FlightFormProps> = ({
  edit = false,
  endDateInvalid,
  errorMessage,
  flight,
  loading,
  onSubmit,
  setErrorMessage,
  setFlightField,
}) => {
  const setMessage = () => {
    if (setErrorMessage) {
      setErrorMessage('');
    }
  };

  const flightClassOptions: SelectOption[] = [
    {
      label: 'Business',
      value: 'BUSINESS',
    },
    {
      label: 'Economy',
      value: 'ECONOMY',
    },
    {
      label: 'Economy Plus',
      value: 'ECONOMY_PLUS',
    },
    {
      label: 'First Class',
      value: 'FIRST',
    },
  ];

  return (
    <Form title={edit ? 'Update Flight' : 'Create Flight'} onSubmit={onSubmit} loading={loading}>
      <Row>
        <Col sm={12}>
          <TripSelector
            required
            value={flight.tripId.toString()}
            onSelect={(e) => {
              setMessage();
              setFlightField(e.target.value, 'tripId');
            }}
          />
        </Col>
        <Col sm={12} md={6} lg={3}>
          <FormGroup>
            <Label required for="flight-airline">
              Airline
            </Label>
            <Input
              required
              id="flight-airline"
              name="flight-airline"
              type="text"
              defaultValue={flight.airline}
              onChange={(e) => {
                setMessage();
                setFlightField(e.target.value, 'airline');
              }}
            />
          </FormGroup>
        </Col>
        <Col sm={12} md={6} lg={3}>
          <FormGroup>
            <Label required for="flight-confirmation-code">
              Confirmation Code
            </Label>
            <Input
              required
              id="flight-confirmation-code"
              name="flight-confirmation-code"
              type="text"
              defaultValue={flight.confirmationCode}
              onChange={(e) => {
                setMessage();
                setFlightField(e.target.value, 'confirmationCode');
              }}
            />
          </FormGroup>
        </Col>
        <Col sm={12} md={6} lg={3}>
          <FormGroup>
            <Label required for="flight-start-date">
              Departure Date
            </Label>
            <Input
              required
              id="flight-start-date"
              name="flight-start-date"
              type="date"
              defaultValue={flight.departureDate}
              onChange={(e) => {
                setMessage();
                setFlightField(e.target.value, 'departureDate');
              }}
            />
          </FormGroup>
        </Col>
        <Col sm={12} md={6} lg={3}>
          <FormGroup>
            <Label required for="flight-end-date">
              Arrival Date
            </Label>
            <Input
              required
              id="flight-end-date"
              name="flight-end-date"
              type="date"
              defaultValue={flight.arrivalDate}
              invalid={endDateInvalid}
              onChange={(e) => {
                setMessage();
                setFlightField(e.target.value, 'arrivalDate');
              }}
            />
            <FormFeedback>End date must be after start date.</FormFeedback>
          </FormGroup>
        </Col>
        <Col sm={12} md={6} lg={3}>
          <FormGroup>
            <Label required for="flight-departure-airport">
              Departure Airport Code
            </Label>
            <Input
              required
              id="flight-departure-airport"
              name="flight-departure-airport"
              className="text-uppercase"
              type="text"
              defaultValue={flight.departureAirport}
              maxLength={3}
              onChange={(e) => {
                setMessage();
                setFlightField(e.target.value, 'departureAirport');
              }}
            />
          </FormGroup>
        </Col>
        <Col sm={12} md={6} lg={3}>
          <FormGroup>
            <Label required for="flight-departure-city">
              Departure City
            </Label>
            <Input
              required
              id="flight-departure-city"
              name="flight-departure-city"
              type="text"
              defaultValue={flight.departureCity}
              onChange={(e) => {
                setMessage();
                setFlightField(e.target.value, 'departureCity');
              }}
            />
          </FormGroup>
        </Col>
        <Col sm={12} md={6} lg={3}>
          <FormGroup>
            <Label required for="flight-arrival-airport">
              Arrival Airport Code
            </Label>
            <Input
              required
              id="flight-arrival-airport"
              name="flight-arrival-airport"
              className="text-uppercase"
              type="text"
              defaultValue={flight.arrivalAirport}
              maxLength={3}
              onChange={(e) => {
                setMessage();
                setFlightField(e.target.value, 'arrivalAirport');
              }}
            />
          </FormGroup>
        </Col>
        <Col sm={12} md={6} lg={3}>
          <FormGroup>
            <Label required for="flight-arrival-city">
              Arrival City
            </Label>
            <Input
              required
              id="flight-arrival-city"
              name="flight-arrival-city"
              type="text"
              defaultValue={flight.arrivalCity}
              onChange={(e) => {
                setMessage();
                setFlightField(e.target.value, 'arrivalCity');
              }}
            />
          </FormGroup>
        </Col>
        <Col sm={12} md={4}>
          <FormGroup>
            <Label required for="flight-number">
              Flight Number
            </Label>
            <Input
              required
              id="flight-number"
              name="flight-number"
              type="text"
              defaultValue={flight.flightNumber}
              onChange={(e) => {
                setMessage();
                setFlightField(e.target.value, 'flightNumber');
              }}
            />
          </FormGroup>
        </Col>
        <Col sm={12} md={4}>
          <FormGroup>
            <Label required for="flight-terminal">
              Terminal
            </Label>
            <Input
              required
              id="flight-terminal"
              name="flight-terminal"
              type="text"
              defaultValue={flight.terminal}
              onChange={(e) => {
                setMessage();
                setFlightField(e.target.value, 'terminal');
              }}
            />
          </FormGroup>
        </Col>
        <Col sm={12} md={4}>
          <Select
            required
            id="flight-class"
            label="Flight Class"
            options={flightClassOptions}
            value={flight.flightClass}
            onSelect={(e) => {
              setMessage();
              setFlightField(e.target.value, 'flightClass');
            }}
          />
        </Col>
        <Col sm={12} md={6} lg={3}>
          <FormGroup>
            <Label for="flight-seats">Seats</Label>
            <Input
              id="flight-seats"
              name="flight-seats"
              type="text"
              defaultValue={flight.seats}
              onChange={(e) => {
                setMessage();
                setFlightField(e.target.value, 'seats');
              }}
            />
          </FormGroup>
        </Col>
        <Col sm={12} md={6} lg={3}>
          <FormGroup>
            <Label for="flight-gate">Gate</Label>
            <Input
              id="flight-gate"
              name="flight-gate"
              type="text"
              defaultValue={flight.gate}
              onChange={(e) => {
                setMessage();
                setFlightField(e.target.value, 'gate');
              }}
            />
          </FormGroup>
        </Col>
        <Col sm={12} md={6} lg={3}>
          <FormGroup>
            <Label for="flight-cost">Cost</Label>
            <CostInput
              id="flight-cost"
              name="flight-cost"
              defaultValue={flight.cost}
              onChange={(e) => {
                setMessage();
                setFlightField(e.target.value, 'cost');
              }}
            />
          </FormGroup>
        </Col>
        <Col sm={12} md={6} lg={3}>
          <FormGroup>
            <Label for="flight-currency">Currency</Label>
            <Input
              id="flight-currency"
              name="flight-currency"
              className="text-uppercase"
              type="text"
              defaultValue={flight.currency}
              maxLength={3}
              onChange={(e) => {
                setMessage();
                setFlightField(e.target.value, 'currency');
              }}
            />
          </FormGroup>
        </Col>
      </Row>
      {!!errorMessage && <p className="form-text text-danger">{errorMessage}</p>}
    </Form>
  );
};
