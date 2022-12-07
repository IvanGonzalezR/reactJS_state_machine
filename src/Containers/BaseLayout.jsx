import React from 'react';
import './BaseLayout.css';
import { useMachine } from '@xstate/react';
import { bookingMachine } from '../Machines/bookingMachine';
import { StepsLayout } from './StepsLayout';
import { Nav } from '../Components/Nav';

const BaseLayout = () => {
  const [ state, send ] = useMachine(bookingMachine);

  // console.log('objeto machine', state);
  // console.log('nuestra machine', state.value, state.context);

  return (
    <div className="BaseLayout">
      {/* <h1>Base Layout</h1> */}
      <Nav send={send} state={state} />
      <StepsLayout send={send} state={state} />
    </div>
  );
};

export { BaseLayout };