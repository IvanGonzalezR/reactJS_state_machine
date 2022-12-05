import react from 'react'
import { createMachine, assign } from "xstate";

const bookingMachine = createMachine({
  predictableActionArguments: true,
  id: "buy plane tickets",
  initial: "initial",
  context: {
    passengers: [],
    selectedCountry: "",
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
    },
    passengers: {
      on: {
        DONE: "tickets",
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
  }
);



export { bookingMachine };

