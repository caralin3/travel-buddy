import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Footer, Header } from '../02-molecules';
import { RootState } from '../store';
import * as sessionState from '../store/reducers/session';

export const Layout: React.FC = ({ children }) => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state: RootState) => state.session.isAuthenticated);

  const logout = () => dispatch(sessionState.reset());

  return (
    <>
      <Header auth={isAuthenticated} logout={logout} />
      {children}
      <Footer />
    </>
  );
};
