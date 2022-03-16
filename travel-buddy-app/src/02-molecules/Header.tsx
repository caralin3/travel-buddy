import React from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import {
  ABOUT_ROUTE,
  CRUISES_ROUTE,
  DASHBOARD_ROUTE,
  FLIGHTS_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  TRIPS_ROUTE,
} from '../router';
import { LinkItem } from '../types';

export interface HeaderProps {
  auth?: boolean;
  logout: VoidFunction;
}

export const Header: React.FC<HeaderProps> = ({ auth = false, logout }) => {
  const publicLinks: LinkItem[] = [
    { label: 'Home', path: HOME_ROUTE },
    { label: 'About', path: ABOUT_ROUTE },
    { label: 'Login', path: LOGIN_ROUTE },
    { label: 'Register', path: REGISTER_ROUTE },
  ];

  const authLinks: LinkItem[] = [
    { label: 'Dashboard', path: DASHBOARD_ROUTE },
    { label: 'Trips', path: TRIPS_ROUTE },
    { label: 'Flights', path: FLIGHTS_ROUTE },
    { label: 'Cruises', path: CRUISES_ROUTE },
    { label: 'Account', path: HOME_ROUTE },
  ];

  const links = auth ? authLinks : publicLinks;

  return (
    <header>
      <Navbar color="light" expand="md" light>
        <NavbarBrand tag={Link} to={HOME_ROUTE}>
          Travel Buddy
        </NavbarBrand>
        <NavbarToggler onClick={function noRefCheck() {}} />
        <Collapse navbar className="flex-grow-0">
          <Nav className="me-auto" navbar>
            {links.map((link) => (
              <NavItem key={link.path}>
                <NavLink tag={Link} to={link.path}>
                  {link.label}
                </NavLink>
              </NavItem>
            ))}
            {auth && (
              <NavItem>
                <NavLink tag={Link} to={HOME_ROUTE} onClick={logout}>
                  Logout
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
};
