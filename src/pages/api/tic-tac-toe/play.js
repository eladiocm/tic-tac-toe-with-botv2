import { validatePayload } from '@/utility/validate'
import axios from 'axios'

// Establece la URL BD
const dbURL = 'http://localhost:5000'

export default async function handler (req, res) {
  if (req.method === 'GET') {
    try {
      // Obtenemos la partida actual
      const { data: partidas } = await axios.get(`${dbURL}/partidas`)

      // Genera un nuevo ID para la nueva partida
      const newId = Date.now().toString()

      // Crea una nueva partida con el estado inicial
      const newPartida = {
        id: newId,
        estadoTablero: [null, null, null, null, null, null, null, null, null],
        siguienteMovimiento: { caracter: null, posicion: null },
        historial: [{ caracter: null, posicion: null }],
        campoPersonalizado1: 'valorPersonalizado123'
      }

      // Añade la nueva partida a la base de datos
      await axios.post(`${dbURL}/partidas`, newPartida)

      // Elimina la partida anterior
      await axios.delete(`${dbURL}/partidas/${partidas[0].id}`)

      // Envía la nueva partida como respuesta
      res.status(200).json(newPartida)
    } catch (error) {
      res.status(400).json({ error: 'No se pudo reiniciar la partida' })
    }
  }

  if (req.method === 'POST') {
    validatePayload(req, res)

    const idClient = req.body.id
    const { data: partidas } = await axios.get(`${dbURL}/partidas`)
    if (idClient !== partidas[0].id) {
      res.status(400).json({ error: 'Id no valido' })
    }
  }
  res.status(405).json({ error: 'Método no permitido' })
}
