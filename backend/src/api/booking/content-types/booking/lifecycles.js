module.exports = {
  async afterCreate(event) {
    const { result } = event;

    try {
      const clientName = result.clientName;
      const email = result.email;
      const specialRequests = result.specialRequests || '';

      // Safely extract the selected tour title from specialRequests
      let tourTitle = 'Premium Custom Tour';
      const tourMatch = specialRequests.match(/Selected Tour:\s*([^.\n]+)/);
      if (tourMatch && tourMatch[1]) {
        tourTitle = tourMatch[1].trim();
      }

      // Default the target frontend URL to local dev server (port 3000)
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      
      const payload = {
        name: clientName,
        email: email,
        tourTitle: tourTitle,
        price: 'Based on Inquiry',
        travelDate: result.travelDate || 'TBD',
        adults: result.adultsCount || 1,
        children: result.childrenCount || 0,
      };

      // Dispatch webhook payload to our Next.js email sender route
      const response = await fetch(`${frontendUrl}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Email microservice returned status: ${response.status}`);
      }
    } catch (err) {
      // Log errors safely within Strapi's logging engine
      if (typeof strapi !== 'undefined') {
        strapi.log.error('Error running booking afterCreate lifecycle hook:', err);
      } else {
        console.error('Error running booking afterCreate lifecycle hook:', err);
      }
    }
  },
};
