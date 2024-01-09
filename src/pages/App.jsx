import { useEffect, useState } from 'react';
import './App.css';
import { Spinner } from '../components/spinner/Spinner';

function App() {
  const [searchedCity, setSearchedCity] = useState('');
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState('');
  const [isLoading, setIsLoading] = useState('');

  async function getCityWeather() {
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=68dfa6e218e39b568308d8ac4fcef993&lang=pt_br&units=metric`,
      );
      const data = await response.json();
      setWeather(data);
      setCity(data.name);
    } catch (error) {
      alert('Cidade não encontrada');
    } finally {
      setIsLoading(false);
    }
  }

  async function getLocation() {
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/ipinfo?&apiKey=3d8ac1686e93495b992b4fb651f9c343`,
      );
      const data = await response.json();
      setSearchedCity(data.city.name);
      console.log(searchedCity);
    } catch (error) {
      alert('Cidade não encontrada');
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    getCityWeather();
  }

  function titleize(text) {
    let words = text.toLowerCase().split(' ');
    for (let i = 0; i < words.length; i++) {
      const element = words[i];
      words[i] = element[0].toUpperCase() + element.slice(1);
    }
    return words.join(' ');
  }

  useEffect(() => {
    getLocation();
  }, []);

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
            {isLoading ? <Spinner /> : <span>Pesquisar Cidade</span>}
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
