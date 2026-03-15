import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const event = JSON.parse(body)

  console.log('PayPal webhook event:', event.event_type)

  // In production: verify the webhook signature using PayPal's API
  // const webhookId = process.env.PAYPAL_WEBHOOK_ID
  // ... verification logic ...

  switch (event.event_type) {
    case 'PAYMENT.CAPTURE.COMPLETED': {
      const resource = event.resource
      const orderId = resource.supplementary_data?.related_ids?.order_id

      if (orderId) {
        // Update DB: mark payment as paid & itinerary as confirmed
        // await supabase.from('payments').update({ status: 'paid', paid_at: new Date() }).eq('paypal_order_id', orderId)
        // await supabase.from('itineraries').update({ status: 'confirmed' }).eq('id', itinerary_id)
        console.log(`Payment ${orderId} confirmed`)
      }
      break
    }
    case 'PAYMENT.CAPTURE.DENIED': {
      const orderId = event.resource?.id
      // await supabase.from('payments').update({ status: 'failed' }).eq('paypal_order_id', orderId)
      console.log(`Payment ${orderId} failed`)
      break
    }
  }

  return NextResponse.json({ received: true })
}
