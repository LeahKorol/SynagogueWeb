import React from 'react';
import { Helmet } from 'react-helmet';
import logo from './logo.svg';
import './App.css';
import './styles/try.css';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>פאתי מזרח | דף בית</title>
      </Helmet>
      <Header />
    </div>
  );
}

export default App;
