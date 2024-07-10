// TimesList.js
import React, { useEffect, useState } from "react";
import { fetchTimesCollection } from "./try";

const TimesList = () => {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    const getTimes = async () => {
      const timesData = await fetchTimesCollection();
      setTimes(timesData);
    };

    getTimes();
  }, []);

  return (
    <div>
      <h1>Times Collection</h1>
      <ul>
        {times.map(time => (
          <li key={time.id}>
            {Object.entries(time).map(([key, value]) => (
              <p key={key}><strong>{key}:</strong> {value.toString()}</p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimesList;
