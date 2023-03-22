import { TURNS } from '@/utility/constants'
import { Square } from './Square'

export const WinnerModal = ({ winner, resetGame }) => {
  if (winner === null) return null

  const winnerText = winner === false ? 'Empate' : 'Gano'

  return (
    <section className='winner'>
      <div className='text'>
        <h2>{winnerText}</h2>

        <header className='win'>
          {winner
            ? <Square>{winner === 'x' ? TURNS.X : TURNS.O}</Square>
            : (
              <>
                <Square>{TURNS.X}</Square>
                <Square>{TURNS.O}</Square>
              </>
              )}
        </header>

        <footer>
          <button onClick={resetGame}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  )
}
