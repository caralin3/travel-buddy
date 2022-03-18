import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PortForm } from '../03-components';
import { Port, PortRequest, handleError } from '../api';
import PortService from '../api/services/PortService';
import { FLIGHTS_ROUTE } from '../router';
import { RootState } from '../store';
import * as portsState from '../store/reducers/ports';
import * as cruisesState from '../store/reducers/cruises';
import { isEndDateValid } from '../utils';

export interface PortFormContainerProps {
  portId?: number;
}

export const PortFormContainer: React.FC<PortFormContainerProps> = ({ portId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector((state: RootState) => state.session.token);
  const user = useSelector((state: RootState) => state.session.user);
  const existingPort = useSelector((state: RootState) => portsState.selectById(state, portId || ''));
  const [nextCruise] = useSelector((state: RootState) => cruisesState.selectFutureCruises(state));

  const initialPort: PortRequest = {
    day: 0,
    arrival: '',
    departure: '',
    city: '',
    country: '',
    cruiseId: 0,
  };

  const [port, setPort] = React.useState<PortRequest>(initialPort);
  const [loading, setLoading] = React.useState(false);
  const [endDateInvalid, setEndDateInvalid] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    if (!!portId && !!existingPort) {
      setPort({
        ...existingPort,
        cruiseId: existingPort.cruise.id,
      });
    }
  }, [existingPort, portId]);

  React.useEffect(() => {
    if (!portId && !!nextCruise) {
      setPort({
        ...initialPort,
        cruiseId: nextCruise.id,
      });
    }
  }, [portId, nextCruise]);

  const handleAdd = async (request: PortRequest) => {
    try {
      if (accessToken) {
        setLoading(true);
        const res = await PortService.createPort(request, accessToken);
        if (Port.is(res)) {
          dispatch(portsState.addPort(res));
          setLoading(false);
          navigate(FLIGHTS_ROUTE);
        }
      }
    } catch (err) {
      setLoading(false);
      handleError(err, (msg) => setErrorMessage(msg));
    }
  };

  const handleEdit = async (request: PortRequest) => {
    try {
      if (accessToken && portId) {
        setLoading(true);
        const res = await PortService.updatePort(request, portId, accessToken);
        if (Port.is(res)) {
          dispatch(portsState.updatePort({ id: res.id, changes: {} }));
          navigate(FLIGHTS_ROUTE);
        }
      }
    } catch (err) {
      setLoading(false);
      handleError(err, (msg) => setErrorMessage(msg));
    }
  };

  const handleSubmit = () => {
    if (!isEndDateValid(port.arrival, port.departure)) {
      setEndDateInvalid(true);
    } else if (!!user) {
      if (!!portId) {
        handleEdit(port);
      } else {
        handleAdd(port);
      }
    }
  };

  const handleChange = (value: string, field: keyof PortRequest) => {
    setEndDateInvalid(false);
    setPort({
      ...port,
      [field]: value,
    });
  };

  return (
    <PortForm
      edit={!!portId}
      port={port}
      endDateInvalid={endDateInvalid}
      errorMessage={errorMessage}
      loading={loading}
      onSubmit={handleSubmit}
      setErrorMessage={setErrorMessage}
      setPortField={handleChange}
    />
  );
};
