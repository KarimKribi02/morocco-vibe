import { Resend } from 'resend';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, tourTitle, price, travelDate, adults, children } = body;

    // Validate the recipient email
    if (!email) {
      return new Response(JSON.stringify({ error: 'Recipient email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    // Defensive fallback: If Resend API Key is not set, log the output to console instead of failing
    if (!resendApiKey) {
      console.log('--- [DEVELOPMENT MOCK EMAIL] ---');
      console.log(`Recipient: ${email}`);
      console.log(`Subject: Your Private Expedition Reservation | Morocco Vibe`);
      console.log(`Content: Bonjour ${name || 'Explorer'}, your private expedition "${tourTitle}" for ${travelDate} with ${adults} adults and ${children} children is registered.`);
      console.log('--------------------------------');

      return new Response(JSON.stringify({ 
        message: 'Mock email printed to server logs (RESEND_API_KEY missing in .env)' 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const resend = new Resend(resendApiKey);

    // Dispatch a high-end luxury HTML editorial email layout
    const emailResponse = await resend.emails.send({
      from: 'Morocco Vibe <onboarding@resend.dev>', // Resend test sandbox sender
      to: email,
      subject: 'Your Private Expedition Reservation | Morocco Vibe',
      html: `
        <div style="background-color: #FDFBF7; padding: 40px 20px; font-family: 'Playfair Display', 'Georgia', serif; color: #121212; min-height: 100%;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #121212; padding: 40px; border: 1px solid #C19343; color: #FFFFFF; text-align: center;">
            <h2 style="font-size: 24px; letter-spacing: 4px; font-weight: 300; margin-top: 0; margin-bottom: 30px; color: #FFFFFF; font-family: 'Playfair Display', 'Georgia', serif;">
              MOROCCO<span style="color: #C19343; font-style: italic;">VIBE</span>
            </h2>
            <div style="width: 40px; height: 1px; background-color: #C19343; margin: 0 auto 30px auto;"></div>
            
            <p style="font-family: 'Plus Jakarta Sans', 'Inter', sans-serif; font-size: 14px; font-weight: 300; line-height: 1.8; color: #E0E0E0; margin-bottom: 40px; text-align: left;">
              Dear ${name || 'Valued Explorer'},<br/><br/>
              Thank you for choosing Morocco Vibe. Your premium private expedition is securely registered and has been forwarded to our private curators. Below are your booking blueprint details:
            </p>
            
            <div style="background-color: #1A1A1A; border-left: 3px solid #C19343; padding: 25px; margin-bottom: 40px; text-align: left; font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;">
              <p style="margin: 0 0 15px 0; font-size: 12px; color: #C19343; font-weight: bold; letter-spacing: 1px; text-transform: uppercase;">Booking Blueprint</p>
              <p style="margin: 6px 0; font-size: 13px; color: #FFFFFF;"><strong style="color: #999; font-weight: normal;">Tour Title:</strong> ${tourTitle}</p>
              <p style="margin: 6px 0; font-size: 13px; color: #FFFFFF;"><strong style="color: #999; font-weight: normal;">Travel Date:</strong> ${travelDate}</p>
              <p style="margin: 6px 0; font-size: 13px; color: #FFFFFF;"><strong style="color: #999; font-weight: normal;">Guests:</strong> ${adults} Adults, ${children} Children</p>
              <p style="margin: 6px 0; font-size: 13px; color: #FFFFFF;"><strong style="color: #999; font-weight: normal;">Estimate:</strong> ${price}</p>
            </div>
            
            <p style="font-family: 'Plus Jakarta Sans', 'Inter', sans-serif; font-size: 12px; font-weight: 300; line-height: 1.6; color: #888888; text-align: left; margin-bottom: 0;">
              Our local concierge team is already reviewing your schedule and will contact you on WhatsApp within the next 1 hour to finalize your tailored journey.
            </p>
            
            <div style="margin-top: 40px; font-size: 10px; color: #C19343; font-family: 'Plus Jakarta Sans', 'Inter', sans-serif; letter-spacing: 2px; text-transform: uppercase; font-weight: 600;">
              Bespoke Private Journeys
            </div>
          </div>
        </div>
      `,
    });

    if (emailResponse.error) {
      return new Response(JSON.stringify({ error: emailResponse.error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Email dispatched successfully', id: emailResponse.data?.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
