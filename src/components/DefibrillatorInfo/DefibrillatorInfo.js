import React from 'react';
import './DefibrillatorInfo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';

function DefibrillatorInfo() {
  return (
    <div className="defibrillator-container">
      <FontAwesomeIcon icon={faHeartbeat} className="defibrillator-icon" />
      <span className="defibrillator-text">דיפריבילטור</span>
    </div>
  );
}

export default DefibrillatorInfo;