import { useEffect, useState } from 'react';
import './App.css';

function App() {
  // states
  const [city, setCity] = useState("dehradun");
  const [weatherData, setWeatherData] = useState(null);

  // date
  const currentDate = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;

  // API
  const API_KEY = "5ce8659e0b6874b674061c1ab88b368b";

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  }

  return (
    <div className="App">
      <div className="container">
        <h1>{formattedDate}</h1>
        <div className="weather-data">
          {weatherData ? (
            <>
              <h2>{weatherData.name}</h2>
              <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
              <h2>{weatherData.main.temp}°C</h2>
              <p>{weatherData.weather[0].description}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Enter city name' onChange={handleInputChange} />
          <button type='submit'>Search</button>
        </form>
      </div>
    </div>
  );
}

export default App;

