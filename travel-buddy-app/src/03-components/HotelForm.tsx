import React from 'react';
import { Input, Col, Row, FormFeedback } from 'reactstrap';
import { CostInput, Form, FormGroup, Label, Select, SelectOption } from '../02-molecules';
import { HotelRequest } from '../api';
import { TripSelector } from '../containers';

export interface HotelFormProps {
  edit?: boolean;
  endDateInvalid: boolean;
  errorMessage?: string;
  hotel: HotelRequest;
  loading: boolean;
  onSubmit: () => void;
  setErrorMessage?: (value: string) => void;
  setHotelField: (value: string, field: keyof HotelRequest) => void;
}

export const HotelForm: React.FC<HotelFormProps> = ({
  edit = false,
  endDateInvalid,
  errorMessage,
  hotel,
  loading,
  onSubmit,
  setErrorMessage,
  setHotelField,
}) => {
  const setMessage = () => {
    if (setErrorMessage) {
      setErrorMessage('');
    }
  };

  const roomTypeOptions: SelectOption[] = [
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
    <Form title={edit ? 'Update Hotel' : 'Create Hotel'} onSubmit={onSubmit} loading={loading}>
      <Row>
        <Col sm={12}>
          <TripSelector
            required
            value={hotel.tripId.toString()}
            onSelect={(e) => {
              setMessage();
              setHotelField(e.target.value, 'tripId');
            }}
          />
        </Col>
        <Col sm={12} md={6} lg={3}>
          <FormGroup>
            <Label required for="hotel-name">
              Name
            </Label>
            <Input
              required
              id="hotel-name"
              name="hotel-name"
              type="text"
              defaultValue={hotel.name}
              onChange={(e) => {
                setMessage();
                setHotelField(e.target.value, 'name');
              }}
            />
          </FormGroup>
        </Col>
        <Col sm={12} md={6} lg={3}>
          <FormGroup>
            <Label required for="hotel-room-count">
              Room Count
            </Label>
            <Input
              required
              id="hotel-room-count"
              name="hotel-room-count"
              type="number"
              defaultValue={hotel.roomCount}
              onChange={(e) => {
                setMessage();
                setHotelField(e.target.value, 'roomCount');
              }}
            />
          </FormGroup>
        </Col>
        <Col sm={12} md={6} lg={3}>
          <Select
            id="hotel-room-type"
            label="Room Type"
            options={roomTypeOptions}
            value={hotel.roomType ? hotel.roomType.toString() : ''}
            onSelect={(e) => {
              setMessage();
              setHotelField(e.target.value, 'roomType');
            }}
          />
        </Col>
        <Col sm={12} md={6} lg={3}>
          <FormGroup>
            <Label for="hotel-description">Description</Label>
            <Input
              id="hotel-description"
              name="hotel-description"
              type="textarea"
              defaultValue={hotel.description}
              onChange={(e) => {
                setMessage();
                setHotelField(e.target.value, 'description');
              }}
            />
          </FormGroup>
        </Col>
        <Col sm={12} md={6} lg={3}>
          <FormGroup>
            <Label required for="hotel-start-date">
              Check In Date
            </Label>
            <Input
              required
              id="hotel-start-date"
              name="hotel-start-date"
              type="datetime"
              defaultValue={hotel.checkInDate}
              onChange={(e) => {
                setMessage();
                setHotelField(e.target.value, 'checkInDate');
              }}
            />
          </FormGroup>
        </Col>
        <Col sm={12} md={6} lg={3}>
          <FormGroup>
            <Label required for="hotel-end-date">
              Check Out Date
            </Label>
            <Input
              required
              id="hotel-end-date"
              name="hotel-end-date"
              type="datetime"
              defaultValue={hotel.checkOutDate}
              invalid={endDateInvalid}
              onChange={(e) => {
                setMessage();
                setHotelField(e.target.value, 'checkOutDate');
              }}
            />
            <FormFeedback>End date must be after start date.</FormFeedback>
          </FormGroup>
        </Col>
        <Col sm={12} md={6} lg={3}>
          <FormGroup>
            <Label required for="hotel-street">
              Street
            </Label>
            <Input
              required
              id="hotel-street"
              name="hotel-street"
              className="text-uppercase"
              type="text"
              defaultValue={hotel.addressLine1}
              maxLength={3}
              onChange={(e) => {
                setMessage();
                setHotelField(e.target.value, 'addressLine1');
              }}
            />
          </FormGroup>
        </Col>
        <Col sm={12} md={6} lg={3}>
          <FormGroup>
            <Label for="hotel-street-2">Street 2</Label>
            <Input
              id="hotel-street-2"
              name="hotel-street-2"
              className="text-uppercase"
              type="text"
              defaultValue={hotel.addressLine2}
              maxLength={3}
              onChange={(e) => {
                setMessage();
                setHotelField(e.target.value, 'addressLine2');
              }}
            />
          </FormGroup>
        </Col>
        <Col sm={12} md={6} lg={3}>
          <FormGroup>
            <Label required for="hotel-city">
              City
            </Label>
            <Input
              required
              id="hotel-city"
              name="hotel-city"
              type="text"
              defaultValue={hotel.city}
              onChange={(e) => {
                setMessage();
                setHotelField(e.target.value, 'city');
              }}
            />
          </FormGroup>
        </Col>
        {/* @TODO: State Dropdown */}
        <Col sm={12} md={6} lg={3}>
          <FormGroup>
            <Label for="hotel-postal-code">Postal Code</Label>
            <Input
              id="hotel-postal-code"
              name="hotel-postal-code"
              className="text-uppercase"
              type="text"
              defaultValue={hotel.postalCode}
              onChange={(e) => {
                setMessage();
                setHotelField(e.target.value, 'postalCode');
              }}
            />
          </FormGroup>
        </Col>
        <Col sm={12} md={6} lg={3}>
          <FormGroup>
            <Label for="hotel-country">Country</Label>
            <Input
              id="hotel-country"
              name="hotel-country"
              type="text"
              defaultValue={hotel.country}
              onChange={(e) => {
                setMessage();
                setHotelField(e.target.value, 'country');
              }}
            />
          </FormGroup>
        </Col>
        <Col sm={12} md={6} lg={3}>
          <FormGroup>
            <Label for="hotel-cost">Cost</Label>
            <CostInput
              id="hotel-cost"
              name="hotel-cost"
              defaultValue={hotel.cost}
              onChange={(e) => {
                setMessage();
                setHotelField(e.target.value, 'cost');
              }}
            />
          </FormGroup>
        </Col>
        <Col sm={12} md={6} lg={3}>
          <FormGroup>
            <Label for="hotel-currency">Currency</Label>
            <Input
              id="hotel-currency"
              name="hotel-currency"
              className="text-uppercase"
              type="text"
              defaultValue={hotel.currency}
              maxLength={3}
              onChange={(e) => {
                setMessage();
                setHotelField(e.target.value, 'currency');
              }}
            />
          </FormGroup>
        </Col>
      </Row>
      {/* @TODO optional fields */}
      {!!errorMessage && <p className="form-text text-danger">{errorMessage}</p>}
    </Form>
  );
};
