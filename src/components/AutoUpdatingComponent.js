import React, { useState, useEffect, useCallback } from 'react';
import './AutoUpdatingComponent.css'; // נוסיף קובץ CSS חדש

function AutoUpdatingComponent({ url, interval = 5000 }) {
  const [news, setNews] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchUpdates = useCallback(() => {
    setIsUpdating(true);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.hasUpdates) {
          setNews(data.news);
          setLastUpdate(new Date());
        }
      })
      .catch(error => console.error('Error:', error))
      .finally(() => {
        setIsUpdating(false);
      });
  }, [url]);

  useEffect(() => {
    const timer = setInterval(fetchUpdates, interval);
    return () => clearInterval(timer);
  }, [fetchUpdates, interval]);

  return (
    <div className={`news-container ${isUpdating ? 'updating' : ''}`}>
      <h2>חדשות מתעדכנות</h2>
      <p>עדכון אחרון: {lastUpdate.toLocaleTimeString()}</p>
      <ul>
        {news.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default AutoUpdatingComponent;
