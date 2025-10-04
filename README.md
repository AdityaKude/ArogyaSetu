<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2a2b77c50d0653927a59adb2fb8d3313d8a36478

To get started, take a look at src/app/page.tsx.

## Setup

This project uses Genkit and the Google AI Gemini models to power its AI features. To run the application locally, you will need a Gemini API key.

1.  **Get a Gemini API Key**: Visit [Google AI Studio](https://aistudio.google.com/app/apikey) to create your free API key.

2.  **Set up your environment variables**:
    *   Create a copy of the `.env.example` file and name it `.env`.
    *   Open the `.env` file and add your Gemini API key:
        ```
        GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"
        ```

## Other Integrations

*   **SMS/WhatsApp**: The `messaging-webhook` flow is designed to work with services like Twilio. To make it functional, you would need to:
    1.  Sign up for a Twilio account (or a similar provider).
    2.  Get a phone number that supports SMS and/or WhatsApp.
    3.  Configure the messaging webhook for that number to point to your deployed application's webhook endpoint.
    4.  Add the necessary API keys and auth tokens (e.g., `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`) to your `.env` file.
=======

Test Credentials:
User Login: Phone: +919876543210, Password: password123
Admin Login: Email: admin@arogyasetu.gov, Password: admin123