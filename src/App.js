import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/Homepage/HomePage';
import EventHall from './components/EventHall/EventHall';
import AboutContact from './components/About-Contact/AboutContact';
import Contributes from './components/Contributes/Contributes';
import AdminLogin from './components/Admin/AdminLogin';
import Manager from './components/Manager';
import DefibrillatorInfo from './components/DefibrillatorInfo/DefibrillatorInfo';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/event-hall" element={<EventHall />} />
          <Route path="/about" element={<AboutContact />} />
          <Route path="/contact" element={<AboutContact />} />
          <Route path="/contributes" element={<Contributes />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/manager" element={<Manager />} />
        </Routes>
        <DefibrillatorInfo />
      </div>
    </Router>
  );
}

export default App;
