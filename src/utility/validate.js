export const validatePayload = (req, res) => {
  const payload = req.body
  // Validaciones
  if (!payload.partidaId || typeof payload.partidaId !== 'string' || payload.partidaId.trim().length === 0) {
    return res.status(400).json({ error: "El campo 'partidaId' es obligatorio y debe ser un string no vacío." })
  }

  if (!Array.isArray(payload.estadoTablero) || payload.estadoTablero.length !== 9) {
    return res.status(400).json({ error: "El campo 'estadoTablero' es obligatorio y debe ser un array de longitud 9." })
  }

  for (let i = 0; i < 9; i++) {
    if (!['x', 'o', null].includes(payload.estadoTablero[i])) {
      return res.status(400).json({ error: "El campo 'estadoTablero' solo debe contener 'x', 'o' o vacío." })
    }
  }

  const movimiento = payload.siguienteMovimiento
  if (!movimiento || typeof movimiento !== 'object' || !['x', 'o'].includes(movimiento.caracter) || !Number.isInteger(movimiento.posicion) || movimiento.posicion < 0 || movimiento.posicion > 8) {
    return res.status(400).json({ error: "El campo 'siguienteMovimiento' es incorrecto. Asegúrate de que contiene 'caracter' ('x' u 'o') y 'posicion' (entero entre 0 y 8, inclusivo)." })
  }

  // Validación del historial
  if (!Array.isArray(payload.historial)) {
    return res.status(400).json({ error: "El campo 'historial' es obligatorio y debe ser un array." })
  }

  for (const item of payload.historial) {
    if (!item || typeof item !== 'object' || !['x', 'o'].includes(item.caracter) || !Number.isInteger(item.posicion) || item.posicion < 0 || item.posicion > 8) {
      return res.status(400).json({ error: "Los elementos del campo 'historial' deben ser objetos válidos con un 'caracter' ('x' u 'o') y una 'posicion' (entero entre 0 y 8, inclusivo)." })
    }
  }
}
