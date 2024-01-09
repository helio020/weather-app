import { useState } from 'react';
import './App.css';

function App() {
  const [searchedCity, setSearchedCity] = useState('');
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ex: Ipatinga"
          value={searchedCity}
          onChange={event => setSearchedCity(event.value)}
        />
        <button type="submit">Pesquisar Cidade</button>
      </form>
    </>
  );
}

export default App;
