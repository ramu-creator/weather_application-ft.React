import React, { useState } from 'react';
import '../styles/style.css'; // Import the CSS file

const OpenWeather = () => {
  const api = {
    key: '905d0cf4552d0196bc2ca11e8e2fb3d2',
    url: 'https://api.openweathermap.org/data/2.5/weather',
  };

  const [search, setSearch] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const SearchCity = () => {
    if (search.trim() === '') {
      setError('Please enter a city name.');
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`${api.url}?q=${search}&appid=${api.key}&units=metric`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setData(null);
        setLoading(false);
        setError(error.message);
      });
  };

  const Enter = (e) => {
    if (e.key === 'Enter') {
      SearchCity();
    }
  };

  return (
    <div id="weather-container">
      <div id="search-container">
        <input
          id="city-input"
          type="text"
          placeholder="Check Weather 🌨️"
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={Enter}
        />
        <button id="search-button" onClick={SearchCity}>
          Get Weather
        </button>
      </div>

      {loading && <p id="loading">Loading...</p>}
      {error && <p id="error" style={{ color: 'red' }}>{error}</p>}

      {data && !loading && !error && (
        <div id="weather-details">
          <h2 id="city-name">{data.name}</h2>
          <p id="temperature">Temperature: {data.main.temp}°C</p>
          <p id="weather">Description: {data.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default OpenWeather;
