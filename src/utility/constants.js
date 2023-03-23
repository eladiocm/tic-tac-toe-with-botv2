export const TURNS = {
  X: '❌',
  O: '⚪'
}

export const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

export const initialPlay = {
  partida: {
    partidaId: '5a5c6f9b4d749d008e07e695',
    estadoTablero: [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    siguienteMovimiento: {
      caracter: null,
      posicion: null
    },
    historial: [
      {
        caracter: null,
        posicion: null
      }
    ],
    campoPersonalizado1: 'valorPersonalizado1'
  }
}
