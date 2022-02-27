import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Footer, Header } from './03-components';
import { LoginPage, RegisterPage } from './04-pages';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="about" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
