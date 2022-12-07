import react from 'react'
import { createMachine, assign } from "xstate";
import { fetchCountries } from '../utils/api';

const fillCountries = {
  initial: 'idle',
  states: {
    idle: {
      on: {
        FETCH: {
          target: 'loading',
        }
      }
    },
    loading: {
      invoke: { //invocar servicios
        id: 'getCountries',
        src: (context, event) => fetchCountries,
        onDone: {
          target: 'success',
          actions: assign({
            countries: (context, event) => {
              return event.data
            },
          })
        },
        onError: {
          target: 'failure',
          actions: assign({
            error: 'Fallo en el request de paises'
          })
        }
      },
    },
    success: {
    },
    failure: {
      on: {
        RETRY: {
          target: 'loading'
        },
      },
    },
  },
};

const bookingMachine = createMachine({
  predictableActionArguments: true,
  id: "buy plane tickets",
  initial: "initial",
  context: {
    passengers: [],
    selectedCountry: "",
    countries: [],
    error: ''
  },
  states: {
    initial: {
      on: {
        START: {
          target: "search",
        },
      },
    },
    search: {
      on: {
        CONTINUE: {
          target: "passengers",
          actions: assign({
            selectedCountry: (context, event) => event.selectedCountry
          })
        },
        CANCEL: "initial",
      },
      ...fillCountries,
    },
    passengers: {
      on: {
        DONE: {
          target: "tickets",
          cond: "moreThanOnePassenger"
        },
        CANCEL: {
          target: "initial",
          actions: 'resetContext'
        },
        BACK: {
          target: "search",
          actions: 'resetContext'
        },
        ADD: {
          actions: assign({
            passengers: (context, event) => {
              const newPassenger = {
                id: context.passengers.length + 1,
                name: event.name,
              };
              return [ ...context.passengers, newPassenger ];
            }
          }),
        }
      },
    },
    tickets: {
      after: {
        5000: {
          target: 'initial',
          actions: 'resetContext'
        }
      },
      on: {
        FINISH: "initial",
      },
    },
  },
},
  {
    actions: {
      resetContext: assign({
        passengers: [],
        selectedCountry: ""
      }),
    },
    guards: {
      moreThanOnePassenger: (context) => {
        return context.passengers.length > 0;
      }
    }
  }
);

export { bookingMachine };

