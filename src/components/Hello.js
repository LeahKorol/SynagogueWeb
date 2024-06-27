import React, { useState } from 'react';

const HelloWithInput = (props) => {
  const [name, setName] = useState(props.name);

  const handleNameChange = (newName) => {
    setName(newName);
  };

  return (
    <div>
      <h1>Hello {name}</h1>
      <label>Enter your name: </label>
      <input
        type="text"
        value={name}
        onChange={(e) => handleNameChange(e.target.value)}
      />
    </div>
  );
};

export default HelloWithInput;


