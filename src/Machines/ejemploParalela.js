import { createMachine } from "xstate";

const fileMachine = createMachine({
  id: 'maquinas paralelas',
  type: 'parallel', //importante para indicar el asincronismo
  states: {
    upload: {
      initial: 'inicial',
      states: {
        inicial: {
          on: {
            INIT_UPLOAD: {
              target: 'cargando'
            }
          }
        },
        cargando: {
          on: {
            UPLOAD_COMPLETE: {
              target: 'terminado'
            }
          }
        },
        terminado: {}
      }
    },

    download: {
      initial: 'inicial',
      states: {
        inicial: {
          on: {
            INIT_DOWNLOAD: {
              target: 'cargando'
            }
          }
        },
        cargando: {
          on: {
            DOWNLOAD_COMPLETE: {
              target: 'terminado'
            }
          }
        },
        terminado: {}
      }
    }
  }
});