import React, { useState, useEffect } from 'react';
import './Search.css';

export const Search = ({ send, state }) => {
  const [ flight, setFlight ] = useState('');
  // const [ options, setOptions ] = useState([]);
  send('FETCH');
  console.log('nuestra machine', state.value, state.context);
  const options = state.context.countries;

  const goToPassengers = () => {
    send('CONTINUE', { selectedCountry: flight });
  }

  const handleSelectChange = (event) => {
    setFlight(event.target.value);
  };

  return (
    <div className='Search'>
      <p className='Search-title title'>Busca tu destino</p>
      <select id="country" className='Search-select' value={flight} onChange={handleSelectChange}>
        <option value="" disabled defaultValue>Escoge un país</option>
        {options.map((option) => <option value={option.name.common} key={option.name.common}>{option.name.common}</option>)}
      </select>
      <button disabled={flight === ''}
        className='Search-continue button'
        onClick={goToPassengers}
      >Continuar</button>
    </div>
  );
}; 