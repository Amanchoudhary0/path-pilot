import { NextRequest, NextResponse } from 'next/server'

const PAYPAL_BASE = process.env.NODE_ENV === 'production'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com'

async function getPayPalToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID!
  const secret = process.env.PAYPAL_CLIENT_SECRET!
  const auth = Buffer.from(`${clientId}:${secret}`).toString('base64')

  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })
  const data = await res.json()
  return data.access_token
}

// POST /api/payments - Create PayPal order
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { amount, currency = 'USD', itinerary_id } = body

  try {
    const token = await getPayPalToken()

    const order = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          reference_id: itinerary_id,
          amount: {
            currency_code: currency,
            value: (amount / 100).toFixed(2),
          },
          description: 'PathPilot Travel Booking',
        }],
        application_context: {
          brand_name: 'PathPilot',
          return_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
        },
      }),
    })

    const orderData = await order.json()
    return NextResponse.json({ orderId: orderData.id })
  } catch (err) {
    console.error('PayPal order creation error:', err)
    return NextResponse.json({ error: 'Failed to create PayPal order' }, { status: 500 })
  }
}

// PATCH /api/payments - Capture PayPal order
export async function PATCH(request: NextRequest) {
  const { orderId, itinerary_id } = await request.json()

  try {
    const token = await getPayPalToken()

    const capture = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })

    const captureData = await capture.json()

    if (captureData.status === 'COMPLETED') {
      // In production: update DB via Supabase
      // await supabase.from('payments').update({ status: 'paid' }).eq('paypal_order_id', orderId)
      // await supabase.from('itineraries').update({ status: 'confirmed' }).eq('id', itinerary_id)

      return NextResponse.json({
        success: true,
        captureId: captureData.id,
        status: captureData.status,
      })
    }

    return NextResponse.json({ error: 'Payment not completed', status: captureData.status }, { status: 400 })
  } catch (err) {
    console.error('PayPal capture error:', err)
    return NextResponse.json({ error: 'Failed to capture payment' }, { status: 500 })
  }
}
