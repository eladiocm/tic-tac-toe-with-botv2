import { useState } from 'react'
import { Square } from './Square'
import { WinnerModal } from './WinnerModal'
import { TURNS } from '@/utility/constants'
import { checkEndGame, checkWinnerForm } from '@/utility/board'
import confetti from 'canvas-confetti'

export function App () {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState('x')
  const [winner, setWinner] = useState(null) // null es que no hay ganador, false hay empate

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn('x')
    setWinner(null)

    /* resetGameStorage() */
  }

  const updateBoard = (index) => {
    //* no actualizamos la posición si ya tiene algo
    if (board[index] || winner) return

    //* actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //* cambiar el turno
    const newTurn = turn === 'x' ? 'o' : 'x'
    setTurn(newTurn)

    /* //* guardar aquí partida en el localStorage
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    }) */

    //* revisamos si hay ganador
    const newWinner = checkWinnerForm(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) //* empate
    }
  }

  const handleTurnWrite = (square) => {
    if (square === 'x') return TURNS.X
    if (square === 'o') return TURNS.O
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {handleTurnWrite(square)}
              </Square>
            )
          })
        }
      </section>
      <p>Es el turno de :</p>
      <section className='turn'>
        <Square isSelected={turn === 'x'}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === 'o'}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}
