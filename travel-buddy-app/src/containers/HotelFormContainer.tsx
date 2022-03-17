import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HotelForm } from '../03-components';
import { Hotel, HotelRequest, handleError, RoomType } from '../api';
import HotelService from '../api/services/HotelService';
import { TRIPS_ROUTE } from '../router';
import { RootState } from '../store';
import * as hotelsState from '../store/reducers/hotels';
import * as tripsState from '../store/reducers/trips';
import { isEndDateValid } from '../utils';

export interface HotelFormContainerProps {
  hotelId?: number;
}

export const HotelFormContainer: React.FC<HotelFormContainerProps> = ({ hotelId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector((state: RootState) => state.session.token);
  const user = useSelector((state: RootState) => state.session.user);
  const existingHotel = useSelector((state: RootState) => hotelsState.selectById(state, hotelId || ''));
  const [nextTrip] = useSelector((state: RootState) => tripsState.selectFutureTrips(state));

  const initialHotel: HotelRequest = {
    name: '',
    roomType: 'DOUBLE',
    roomCount: 0,
    checkInDate: '',
    checkOutDate: '',
    cost: 0,
    currency: '',
    addressLine1: '',
    city: '',
    tripId: 0,
  };

  const [hotel, setHotel] = React.useState<HotelRequest>(initialHotel);
  const [loading, setLoading] = React.useState(false);
  const [endDateInvalid, setEndDateInvalid] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    if (!!hotelId && !!existingHotel) {
      setHotel({
        ...existingHotel,
        tripId: existingHotel.trip.id,
      });
    }
  }, [existingHotel, hotelId]);

  React.useEffect(() => {
    if (!hotelId) {
      setHotel({
        ...initialHotel,
        tripId: nextTrip.id,
      });
    }
  }, [hotelId, nextTrip]);

  const handleAdd = async (request: HotelRequest) => {
    try {
      if (accessToken) {
        setLoading(true);
        const res = await HotelService.createHotel(request, accessToken);
        if (Hotel.is(res)) {
          dispatch(hotelsState.addHotel(res));
          setLoading(false);
          navigate(TRIPS_ROUTE);
        }
      }
    } catch (err) {
      setLoading(false);
      handleError(err, (msg) => setErrorMessage(msg));
    }
  };

  const handleEdit = async (request: HotelRequest) => {
    try {
      if (accessToken && hotelId) {
        setLoading(true);
        const res = await HotelService.updateHotel(request, hotelId, accessToken);
        if (Hotel.is(res)) {
          dispatch(hotelsState.updateHotel({ id: res.id, changes: {} }));
          navigate(TRIPS_ROUTE);
        }
      }
    } catch (err) {
      setLoading(false);
      handleError(err, (msg) => setErrorMessage(msg));
    }
  };

  const handleSubmit = () => {
    if (!isEndDateValid(hotel.checkInDate, hotel.checkOutDate)) {
      setEndDateInvalid(true);
    } else if (!!user) {
      if (!!hotelId) {
        handleEdit(hotel);
      } else {
        handleAdd(hotel);
      }
    }
  };

  const handleChange = (value: string, field: keyof HotelRequest) => {
    setEndDateInvalid(false);
    setHotel({
      ...hotel,
      [field]: value,
    });
  };

  return (
    <HotelForm
      edit={!!hotelId}
      hotel={hotel}
      endDateInvalid={endDateInvalid}
      errorMessage={errorMessage}
      loading={loading}
      onSubmit={handleSubmit}
      setErrorMessage={setErrorMessage}
      setHotelField={handleChange}
    />
  );
};
