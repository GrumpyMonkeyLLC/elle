const { app } = require('@azure/functions');

app.http('booking', {
  methods: ['POST', 'OPTIONS'],
  authLevel: 'anonymous',
  route: 'booking',
  handler: async (request, context) => {

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      };
    }

    try {
      const body = await request.json();
      const { name, email, service, date, budget, message } = body;

      // Basic validation
      if (!name || !email || !service || !message) {
        return { status: 400, body: JSON.stringify({ error: 'Missing required fields.' }) };
      }

      // Log to Azure context (visible in Application Insights / Log stream)
      context.log('📩 New booking inquiry:', { name, email, service, date, budget });

      // ── Optional: send email via SendGrid ─────────────
      // Uncomment and set SENDGRID_API_KEY + TO_EMAIL in Azure App Settings
      //
      // const sgMail = require('@sendgrid/mail');
      // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      // await sgMail.send({
      //   to:      process.env.TO_EMAIL,          // your email
      //   from:    process.env.FROM_EMAIL,         // verified sender
      //   replyTo: email,
      //   subject: `New booking inquiry from ${name} — ${service}`,
      //   text: [
      //     `Name: ${name}`,
      //     `Email: ${email}`,
      //     `Service: ${service}`,
      //     `Date: ${date || 'Not specified'}`,
      //     `Budget: ${budget || 'Not specified'}`,
      //     `\nMessage:\n${message}`,
      //   ].join('\n'),
      // });
      // ───────────────────────────────────────────────────

      return {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true }),
      };

    } catch (err) {
      context.log.error('Booking handler error:', err);
      return { status: 500, body: JSON.stringify({ error: 'Internal server error.' }) };
    }
  },
});
