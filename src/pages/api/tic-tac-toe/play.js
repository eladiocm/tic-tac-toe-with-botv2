import { validatePayload } from '@/utility/validate'

export default function handler (req, res) {
  if (req.method !== 'POST') {
    validatePayload(req, res)
  }

  res.status(200).json({ name: 'Perra Api' })
}
