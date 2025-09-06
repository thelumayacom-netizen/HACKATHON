import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = 're_5ppbjvPL_L7p7ZZDacffgRBC2UR7B9wWv'

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const { inviterEmail, inviteeEmail, battleId } = await req.json()
    
    const acceptUrl = `${req.headers.get('origin')}/battle-response?id=${battleId}&action=accept`
    const declineUrl = `${req.headers.get('origin')}/battle-response?id=${battleId}&action=decline`
    
    const emailHtml = `
      <!-- Your email template here -->
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Battle Challenge from ${inviterEmail}!</h1>
        <a href="${acceptUrl}" style="background: #00ffff; padding: 10px 20px; color: black; text-decoration: none; border-radius: 5px;">Accept</a>
        <a href="${declineUrl}" style="background: #666; padding: 10px 20px; color: white; text-decoration: none; border-radius: 5px; margin-left: 10px;">Decline</a>
      </div>
    `

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'StackX <noreply@stackx.com>',
        to: inviteeEmail,
        subject: 'Battle Challenge on StackX!',
        html: emailHtml,
      }),
    })

    if (response.ok) {
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
      })
    } else {
      throw new Error('Failed to send email')
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})