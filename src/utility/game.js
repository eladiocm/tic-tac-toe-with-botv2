const board = ['-', '-', '-', '-', '-', '-', '-', '-', '-']

/* const humPlayer = null
const aiPlayer = null */

// Función para verificar si hay un ganador
function checkWinner (board, player) {
  // Combinaciones ganadoras en un array unidimensional
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
    [0, 4, 8], [2, 4, 6] // diagonales
  ]

  // Comprobamos si el jugador ha ganado con alguna de las combinaciones ganadoras
  for (let i = 0; i < winningCombos.length; i++) {
    const combo = winningCombos[i]
    if (board[combo[0]] === player &&
      board[combo[1]] === player &&
      board[combo[2]] === player) {
      return true
    }
  }
  return false
}

// Función para obtener todas las jugadas posibles
function getAvailableMoves (board) {
  const moves = []
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '-') {
      moves.push(i)
    }
  }
  return moves
}

// Función para aplicar el algoritmo Minimax y obtener la mejor jugada
function minimax (board, player) {
  // Comprobamos si el jugador ha ganado
  if (checkWinner(board, 'X')) {
    return { score: -10 }
  } else if (checkWinner(board, 'O')) {
    return { score: 10 }
  } else if (getAvailableMoves(board).length === 0) {
    return { score: 0 }
  }

  // Creamos un array para almacenar las jugadas y sus puntajes
  const moves = []

  // Recorremos todas las jugadas posibles
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '-') {
      // Hacemos una copia del tablero
      const newBoard = [...board]
      // Realizamos la jugada
      newBoard[i] = player
      // Calculamos el puntaje para esta jugada
      const move = {}
      move.index = i
      if (player === 'O') {
        const result = minimax(newBoard, 'X')
        move.score = result.score
      } else {
        const result = minimax(newBoard, 'O')
        move.score = result.score
      }
      // Agregamos la jugada al array
      moves.push(move)
    }
  }

  // Obtenemos la mejor jugada
  let bestMove
  if (player === 'O') {
    let bestScore = -Infinity
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score
        bestMove = moves[i]
      }
    }
  } else {
    let bestScore = Infinity
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score
        bestMove = moves[i]
      }
    }
  }

  // Devolvemos la mejor jugada
  return bestMove
}

// Función para que la computadora realice su jugada
export function computerMove () {
  // Obtenemos la mejor jugada para la computadora
  const index = minimax(board, 'O').index
  // Realizamos la jugada
  board[index] = 'O'
}
