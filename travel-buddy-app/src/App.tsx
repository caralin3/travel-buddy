import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import './App.css';
import { Layout } from './03-components';
import { store } from './store';
import { Router } from './router';

function App() {
  const persistor = persistStore(store);

  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Layout>
            <Router />
          </Layout>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
