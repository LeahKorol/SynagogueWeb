import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/Homepage/HomePage';
import EventHall from './components/EventHall/EventHall';
import AboutContact from './components/About-Contact/AboutContact';
import Contributes from './components/Contributes/ContributesPage';
import AdminLogin from './components/Admin/AdminLogin';
import Manager from './components/Manager';
import DefibrillatorInfo from './components/DefibrillatorInfo/DefibrillatorInfo';



import AutoUpdatingComponent from './components/AutoUpdatingComponent';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/event-hall" element={<EventHall />} />
          <Route path="/about-contact" element={<AboutContact />} />
          <Route path="/about-contact" element={<AboutContact />} />
          <Route path="/contributes" element={<Contributes />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/manager" element={<Manager />} />
        </Routes>
        <DefibrillatorInfo />
      </div>

      <main>
        <AutoUpdatingComponent url="http://localhost:3001/api/news" interval={3000} />
      </main>

    </Router>
  );
}

export default App;