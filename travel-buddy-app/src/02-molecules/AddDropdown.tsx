import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dropdown, DropdownMenuItem } from '../01-atoms';
import {
  ADD_ACTIVITIES_ROUTE,
  ADD_CRUISES_ROUTE,
  ADD_FLIGHTS_ROUTE,
  ADD_HOTELS_ROUTE,
  ADD_PORTS_ROUTE,
  ADD_TRIPS_ROUTE,
} from '../router';

export interface AddDropdownProps {}

export const AddDropdown: React.FC<AddDropdownProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const showItem = (item: string) => !location.pathname.includes(item);

  const getItems = () => {
    const items: DropdownMenuItem[] = [];

    if (showItem('trips')) {
      items.push({
        label: 'Add Trip',
        onClick: () => navigate(ADD_TRIPS_ROUTE),
      });
    }
    if (showItem('flights')) {
      items.push({
        label: 'Add Flight',
        onClick: () => navigate(ADD_FLIGHTS_ROUTE),
      });
    }
    if (showItem('hotels')) {
      items.push({
        label: 'Add Hotel',
        onClick: () => navigate(ADD_HOTELS_ROUTE),
      });
    }
    if (showItem('cruises')) {
      items.push({
        label: 'Add Cruise',
        onClick: () => navigate(ADD_CRUISES_ROUTE),
      });
    }
    if (showItem('ports')) {
      items.push({
        label: 'Add Port',
        onClick: () => navigate(ADD_PORTS_ROUTE),
      });
    }
    if (showItem('activities')) {
      items.push({
        label: 'Add Activity',
        onClick: () => navigate(ADD_ACTIVITIES_ROUTE),
      });
    }
    return items;
  };

  return (
    <Dropdown isOpen={dropdownOpen} label="Add" menuItems={getItems()} toggle={() => setDropdownOpen(!dropdownOpen)} />
  );
};
