import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email and message are required' })
  }

  const { error } = await supabase
    .from('Messages')
    .insert({ email, body: `[${name}] ${message}` })

  if (error) {
    console.error('Supabase insert error:', error)
    return res.status(500).json({ message: 'Failed to save message' })
  }

  return res.status(200).json({ message: 'Message sent successfully' })
}
