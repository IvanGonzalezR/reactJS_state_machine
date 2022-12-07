import React from 'react';
import './Nav.css';

export const Nav = ({ state, send }) => {
  const goToWelcome = () => {
    send('CANCEL');
  }
  const goBack = () => {
    send('BACK')
  }
  let showBack = [ 'passengers' ].includes(state.value); //boolean
  let showCancel = [ 'initial', 'tickets' ].includes(state.value); //boolean
  return (
    <nav className='Nav'>
      <h1 className='Nav-logo'>Book a fly ✈</h1>
      {showBack && (
        <button className="Nav-return button" onClick={goBack}>Regresar</button>
      )}
      {!showCancel && (
        <button className='Nav-cancel button-secondary'
          onClick={goToWelcome}
        >
          Cancelar
        </button>
      )}
    </nav>
  );
}; 