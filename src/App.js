import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/Homepage/HomePage';
import AdminLogin from './components/Admin/AdminLogin';
import Manager from './components/Manager';
import DefibrillatorInfo from './components/DefibrillatorInfo/DefibrillatorInfo';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Helmet>
            <title>פאתי מזרח | דף בית</title>
          </Helmet>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/manager" element={<Manager />} />
          </Routes>

          <DefibrillatorInfo />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
