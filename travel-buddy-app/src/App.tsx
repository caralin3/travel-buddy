import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer, Header } from './03-components';
import { HomePage, LoginPage, RegisterPage } from './04-pages';
import { store } from './store';
import { HOME, LOGIN, REGISTER } from './routes';

function App() {
  const persistor = persistStore(store);

  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Header />
          <Routes>
            <Route path={HOME} element={<HomePage />} />
            <Route path={REGISTER} element={<RegisterPage />} />
            <Route path={LOGIN} element={<LoginPage />} />
          </Routes>
          <Footer />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
