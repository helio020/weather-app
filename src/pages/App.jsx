import { useEffect, useState } from 'react';
import { Spinner } from '../components/spinner/Spinner';
import {
  getCityWeather,
  getUserCurrentLocation,
} from '../services/weather.service';
import {
  Button,
  Container,
  Form,
  H1,
  H2,
  ImgMoon,
  ImgSun,
  Input,
  InputCheckBox,
  Label,
  Main,
  P,
  Section,
} from './styleApp';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../themes/theme';
import { GlobalStyles } from '../themes/GlobalStyles';
import Sun from '../assets/sun-svgrepo-com.svg';
import Moon from '../assets/moon-svgrepo-com.svg';

function App() {
  const [searchedCity, setSearchedCity] = useState('');
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const [theme, setTheme] = useState('light');

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

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Container>
        <InputCheckBox
          type="checkbox"
          id="darkmode-toggle"
          onClick={() => handleThemeChange()}
        ></InputCheckBox>
        <Label htmlFor="darkmode-toggle">
          <ImgSun src={Sun} alt="sun" className="sun" />
          <ImgMoon src={Moon} alt="moon" className="moon" />
        </Label>

        <header>
          <Form action="" onSubmit={handleSubmit} name="form">
            <Input
              type="text"
              placeholder="Ex: Ipatinga"
              value={searchedCity}
              onChange={event => setSearchedCity(event.target.value)}
            />
            <Button type="submit">
              {isLoading ? <Spinner /> : <span>Pesquisar cidade</span>}
            </Button>
          </Form>
        </header>

        {city && weather && (
          <Main>
            <H1>{city}</H1>
            <Section className="current-weather">
              <H2>Tempo atual</H2>
              <P>{Math.trunc(weather.main.temp)} °C</P>
              <P>{titleize(weather.weather[0].description)}</P>
              <div id="icon">
                <img
                  id="wicon"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="Weather icon"
                ></img>
              </div>
            </Section>
          </Main>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
