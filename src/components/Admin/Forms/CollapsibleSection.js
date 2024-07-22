import React, { useState } from 'react';
import './CollapsibleSection.css';

function CollapsibleSection({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="collapsible-section">
      <button
        className={`collapsible-header ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3>{title}</h3>
        <span className="toggle-icon">{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && <div className="collapsible-content">{children}</div>}
    </div>
  );
}

export default CollapsibleSection;
