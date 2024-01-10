import { useEffect, useState } from 'react';
import './App.css';
import { Spinner } from '../components/spinner/Spinner';
import {
  getCityWeather,
  getUserCurrentLocation,
} from '../services/weather.service';

function App() {
  const [searchedCity, setSearchedCity] = useState('');
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState('');
  const [isLoading, setIsLoading] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (navigator.geolocation) {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });

          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const data = await getUserCurrentLocation(latitude, longitude);
          setCity(data.name);
          setWeather(data);
        }
      } catch (error) {
        console.error('Erro ao obter a localização:', error.message);
      }
    };

    fetchData().catch(console.error);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const weather = await getCityWeather(searchedCity);
      setCity(weather.name);
      setWeather(weather);
      setIsLoading(false);
    } catch (error) {
      alert('Cidade não encontrada');
    }
  }

  function titleize(text) {
    let words = text.toLowerCase().split(' ');
    for (let i = 0; i < words.length; i++) {
      const element = words[i];
      words[i] = element[0].toUpperCase() + element.slice(1);
    }
    return words.join(' ');
  }

  return (
    <div className="App">
      <header>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ex: Ipatinga"
            value={searchedCity}
            onChange={event => setSearchedCity(event.target.value)}
          />
          <button type="submit">
            {isLoading ? <Spinner /> : <span>Pesquisar cidade</span>}
          </button>
        </form>
      </header>

      {city && weather && (
        <main>
          <h1>{city}</h1>
          <section className="current-weather">
            <h2>Tempo atual</h2>
            <p>{Math.trunc(weather.main.temp)} °C</p>
            <p>{titleize(weather.weather[0].description)}</p>
            <div id="icon">
              <img
                id="wicon"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Weather icon"
              ></img>
            </div>
          </section>
        </main>
      )}
    </div>
  );
}

export default App;
