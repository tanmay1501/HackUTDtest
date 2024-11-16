import React, { useState } from 'react';
import { fetchWeatherREST } from './api';

function App() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [useGraphQL, setUseGraphQL] = useState(false);

  const fetchData = async () => {
    const fetchFunction = fetchWeatherREST;
    const data = await fetchFunction(date, time);
    setWeatherData(data);
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h1>Weather App</h1>
      <label>
        Date: 
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ marginLeft: '10px' }}
        />
      </label>
      <br />
      <label>
        Time: 
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{ marginLeft: '10px' }}
        />
      </label>
      <br />
      
      <br />
      <button onClick={fetchData} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Get Weather
      </button>
      <div style={{ marginTop: '20px' }}>
        {weatherData && (
          <pre>{JSON.stringify(weatherData, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}

export default App;
