async function getCityWeather(searchedCity) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${
        import.meta.env.VITE_API_KEY
      }&lang=pt_br&units=metric`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    alert('Cidade não encontrada');
  }
}

async function getUserCurrentLocation(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_API_KEY
      }&lang=pt_br&units=metric`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao obter a localização:', error.message);
  }
}

export { getCityWeather, getUserCurrentLocation };
