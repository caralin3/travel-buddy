import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import { Button } from 'reactstrap';
import TripService from './api/services/TripService';
import { Featured, Footer, Header } from './03-components';

function Home() {
  React.useEffect(() => {
    fetchEmployees();
  }, []);

  async function fetchEmployees() {
    try {
      const res = await TripService.getTrips();
      const res2 = await TripService.getTripById(1);
      console.log('res', res);
      console.log('res2', res2);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <>
      <main>
        <Featured />
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
    </>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>That feels like an existential question, don't you think?</p>
        <Button size="large">Button</Button>
      </main>
    </>
  );
}

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a> */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
      <Footer />
      {/* </header> */}
    </div>
  );
}

export default App;
