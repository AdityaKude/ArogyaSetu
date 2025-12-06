# 🏥 ArogyaSetu - AI-Powered Health Chatbot

[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Genkit AI](https://img.shields.io/badge/Genkit-1.14.1-green?logo=google)](https://genkit.dev/)
[![Twilio](https://img.shields.io/badge/Twilio-WhatsApp-green?logo=twilio)](https://www.twilio.com/)
[![License](https://img.shields.io/badge/License-MIT-lightgrey)](LICENSE)

**ArogyaSetu** is an AI-driven public health chatbot platform that provides multilingual healthcare assistance through web, WhatsApp, and SMS. Built with Next.js 15, React, and Google Genkit AI, it offers symptom analysis, health information retrieval, image analysis, voice analysis, and sign language support.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Authentication](#-authentication)
- [Admin Dashboard](#-admin-dashboard)
- [AI Features](#-ai-features)
- [WhatsApp Integration](#-whatsapp-integration)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Team](#-team)

---

## ✨ Features

### 🤖 AI-Powered Health Assistance
- **Symptom Analysis**: Describe symptoms and get possible conditions with recommended actions
- **Health Information Retrieval**: Ask questions about medical conditions and get detailed summaries
- **Image Disease Analysis**: Upload images for AI-powered visual health analysis
- **Voice Analysis**: Analyze voice recordings to detect cough, breathlessness, and fatigue
- **Audio Analysis**: Upload audio clips for comprehensive health-related acoustic analysis
- **Sign Language Support**: Indian Sign Language (ISL) recognition and translation

### 🌐 Multilingual Support
- **Languages**: English, Hindi, Kannada, Telugu, Bengali
- **Dynamic Language Switching**: Change language on the fly
- **Localized Content**: All UI elements and responses support multiple languages

### 🔐 Authentication & Security
- **User Authentication**: Secure login/signup system
- **Admin Dashboard**: Protected admin panel with role-based access
- **Session Management**: Persistent sessions with localStorage
- **Protected Routes**: Chatbot access requires authentication
- **Recent Login Tracking**: Admin can view recently logged-in users

### 💬 Communication Channels
- **Web Chat Interface**: Modern, responsive chat UI
- **WhatsApp Integration**: Receive and respond via Twilio WhatsApp
- **SMS Support**: Send SMS messages via Twilio
- **Real-time Messaging**: Asynchronous message processing

### 📊 Admin Dashboard
- **User Management**: View and manage all users
- **Recent Logins**: Track user login activity
- **Message Sending**: Send WhatsApp/SMS messages to users
- **Alerts Management**: Create and send health alerts
- **Reminders Management**: Manage vaccination reminders
- **Analytics**: Platform insights and statistics

### 🎨 User Interface
- **Modern Design**: Clean, professional, and aesthetic UI
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Scrolling**: Systematic scrolling with progress indicator
- **Dark Mode**: Toggle between light and dark themes
- **Accessibility**: WCAG compliant with proper focus states

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.5.3 (App Router)
- **UI Library**: React 18.3.1
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 3.4.1
- **UI Components**: Radix UI (shadcn/ui)
- **Icons**: Lucide React
- **Charts**: Recharts

### Backend & AI
- **AI Framework**: Google Genkit 1.14.1
- **AI Models**: Google Gemini Pro Latest
- **AI Features**: 
  - Text-to-Speech (Gemini 2.5 Flash Preview TTS)
  - Image Analysis
  - Voice Analysis
  - Sign Language Analysis
  - Text-to-Sign Language

### Communication
- **WhatsApp/SMS**: Twilio 5.10.2
- **Webhooks**: Next.js API Routes

### Data Storage
- **User Data**: JSON file-based storage (`data/users.json`)
- **Future**: Firebase integration ready

### Development Tools
- **Build Tool**: Turbopack (Next.js)
- **Linting**: ESLint 9.37.0
- **Type Checking**: TypeScript
- **Package Manager**: npm

---

## 📁 Project Structure

```
ArogyaSetu/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── admin/             # Admin dashboard pages
│   │   │   ├── alerts/        # Alerts management
│   │   │   ├── analytics/     # Analytics page
│   │   │   ├── messages/     # Message sending
│   │   │   ├── reminders/     # Reminders management
│   │   │   ├── users/        # User management
│   │   │   ├── layout.tsx    # Admin layout
│   │   │   └── page.tsx      # Admin dashboard
│   │   ├── api/              # API routes
│   │   │   ├── admin/        # Admin APIs
│   │   │   ├── auth/         # Authentication APIs
│   │   │   └── twilio/       # Twilio webhook
│   │   ├── chat/             # Chatbot page
│   │   ├── login/            # Login/signup page
│   │   ├── about/            # About page
│   │   ├── contact/          # Contact page
│   │   ├── privacy/          # Privacy policy
│   │   ├── quiz/             # Health quiz
│   │   ├── search/           # Search page
│   │   ├── sign-language/    # Sign language page
│   │   ├── image-analysis/   # Image analysis page
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Landing page
│   │   └── globals.css       # Global styles
│   ├── components/           # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── chat-interface.tsx
│   │   ├── landing-page.tsx
│   │   ├── site-header.tsx
│   │   ├── site-footer.tsx
│   │   └── ...
│   ├── lib/                  # Utility libraries
│   │   ├── auth-context.tsx  # Authentication context
│   │   ├── user-store.ts     # User data management
│   │   ├── twilio.ts         # Twilio service
│   │   ├── types.ts          # TypeScript types
│   │   └── utils.ts          # Utility functions
│   ├── ai/                   # AI flows and configurations
│   │   ├── flows/            # Genkit AI flows
│   │   │   ├── symptom-analysis.ts
│   │   │   ├── health-information-retrieval.ts
│   │   │   ├── image-disease-analysis.ts
│   │   │   ├── voice-analysis.ts
│   │   │   ├── audio-analysis.ts
│   │   │   ├── sign-language-analysis.ts
│   │   │   ├── text-to-sign-language.ts
│   │   │   ├── text-to-speech.ts
│   │   │   └── messaging-webhook.ts
│   │   └── genkit.ts        # Genkit configuration
│   └── hooks/                # Custom React hooks
├── data/                     # Data storage
│   └── users.json           # User database
├── public/                   # Static assets
├── package.json             # Dependencies
├── tsconfig.json           # TypeScript config
├── tailwind.config.ts      # Tailwind config
└── README.md               # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Google AI API Key**: For Genkit AI features
- **Twilio Account**: For WhatsApp/SMS integration (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ArogyaSetu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Google AI (Genkit)
   GOOGLE_GENAI_API_KEY=your_google_ai_api_key_here

   # Twilio (Optional - for WhatsApp/SMS)
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
   TWILIO_PHONE_NUMBER=+1234567890

   # Site URL (Optional)
   NEXT_PUBLIC_SITE_URL=http://localhost:9002
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:9002`

5. **Run Genkit AI server** (in a separate terminal)
   ```bash
   npm run genkit:dev
   ```

### Build for Production

```bash
npm run build
npm start
```

---

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_GENAI_API_KEY` | Google AI API key for Genkit | Yes |
| `TWILIO_ACCOUNT_SID` | Twilio Account SID | Optional |
| `TWILIO_AUTH_TOKEN` | Twilio Auth Token | Optional |
| `TWILIO_WHATSAPP_NUMBER` | Twilio WhatsApp number | Optional |
| `TWILIO_PHONE_NUMBER` | Twilio phone number for SMS | Optional |
| `NEXT_PUBLIC_SITE_URL` | Public site URL | Optional |

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User signup

### Admin APIs
- `GET /api/admin/recent-logins` - Get recently logged-in users

### Twilio Webhook
- `POST /api/twilio/webhook` - Twilio WhatsApp/SMS webhook
- `GET /api/twilio/webhook` - Webhook health check

---

## 🔐 Authentication

### User Authentication Flow

1. **Signup**: Users can create accounts with:
   - Name
   - Phone number
   - Preferred language
   - Password

2. **Login**: Users login with phone number and password

3. **Session Management**: 
   - Sessions stored in localStorage
   - Persistent across page refreshes
   - Automatic logout on token expiry

4. **Protected Routes**:
   - `/chat` - Requires authentication
   - `/admin/*` - Requires admin role

### Admin Authentication

- **Email**: `admin@arogyasetu.gov`
- **Password**: `admin123`
- **Access**: Full admin dashboard access

---

## 📊 Admin Dashboard

### Features

1. **Dashboard Overview**
   - Total users count
   - Total queries count
   - Active sessions
   - Growth rate metrics
   - Recent logins table

2. **User Management** (`/admin/users`)
   - View all users
   - Search functionality
   - User status management
   - Language preferences

3. **Messages** (`/admin/messages`)
   - Send WhatsApp messages
   - Send SMS messages
   - Message delivery status

4. **Alerts** (`/admin/alerts`)
   - Create health alerts
   - Specify disease/condition
   - Set location/region
   - Send to all users

5. **Reminders** (`/admin/reminders`)
   - Upload vaccination schedules (CSV)
   - View reminder status
   - Track pending/sent/failed reminders

6. **Analytics** (`/admin/analytics`)
   - Platform insights
   - User engagement metrics
   - Query patterns

---

## 🤖 AI Features

### 1. Symptom Analysis
- **Input**: User describes symptoms
- **Output**: Possible conditions and recommended actions
- **Model**: Gemini Pro Latest
- **Use Case**: Initial health assessment

### 2. Health Information Retrieval
- **Input**: Health-related questions
- **Output**: Detailed summaries and key information
- **Model**: Gemini Pro Latest
- **Use Case**: Educational health information

### 3. Image Disease Analysis
- **Input**: Medical images (skin conditions, rashes, etc.)
- **Output**: Analysis summary, possible conditions, recommendations
- **Model**: Gemini Pro Latest (Vision)
- **Use Case**: Visual health screening

### 4. Voice Analysis
- **Input**: Voice transcript
- **Output**: Detected symptoms (cough, breathlessness, fatigue)
- **Model**: Gemini Pro Latest
- **Use Case**: Vocal symptom detection

### 5. Audio Analysis
- **Input**: Audio file
- **Output**: Comprehensive audio analysis with transcription
- **Model**: Gemini Pro Latest (Audio)
- **Use Case**: Audio-based health screening

### 6. Sign Language Analysis
- **Input**: Sign language video
- **Output**: Translated text and intent classification
- **Model**: Gemini Pro Latest (Vision)
- **Use Case**: ISL recognition and translation

### 7. Text-to-Speech
- **Input**: Text
- **Output**: Audio response
- **Model**: Gemini 2.5 Flash Preview TTS
- **Use Case**: Audio responses for accessibility

---

## 📱 WhatsApp Integration

### Setup

1. **Twilio Account Setup**
   - Create a Twilio account
   - Get WhatsApp Sandbox number
   - Configure webhook URL: `https://your-domain.com/api/twilio/webhook`

2. **Webhook Configuration**
   - The webhook handles incoming messages
   - Processes text and media (images)
   - Routes messages to appropriate AI flows
   - Sends responses via Twilio API

### Features

- **Incoming Messages**: Receive and process WhatsApp messages
- **Image Analysis**: Analyze images sent via WhatsApp
- **Smart Routing**: Automatically routes messages to symptom analysis or health info
- **Asynchronous Processing**: Prevents webhook timeouts
- **Error Handling**: Graceful error handling with user-friendly messages

### Message Flow

1. User sends message → Twilio webhook
2. Webhook acknowledges immediately
3. Message processed asynchronously
4. AI generates response
5. Response sent via Twilio API

---

## 🎨 UI/UX Features

### Design System
- **Primary Color**: Sky Blue (#007BFF)
- **Secondary Color**: Emerald Green (#28A745)
- **Typography**: Inter font family
- **Components**: shadcn/ui component library

### Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Touch-friendly interfaces
- Optimized for low bandwidth

### Accessibility
- WCAG 2.1 compliant
- Keyboard navigation
- Screen reader support
- Focus indicators
- Skip to content links

### Animations
- Smooth scroll behavior
- Fade-in animations on scroll
- Hover effects
- Loading states
- Transition animations

---

## 🧪 Development Scripts

```bash
# Development
npm run dev              # Start Next.js dev server (port 9002)
npm run genkit:dev       # Start Genkit AI server
npm run genkit:watch     # Start Genkit with watch mode

# Production
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run typecheck        # Run TypeScript type checking
```

---

## 🐛 Troubleshooting

### Common Issues

1. **Genkit Model Not Found**
   - Ensure `GOOGLE_GENAI_API_KEY` is set correctly
   - Check API key permissions

2. **Twilio Webhook Not Responding**
   - Verify webhook URL is accessible
   - Check Twilio account credentials
   - Ensure webhook is configured in Twilio console

3. **Authentication Issues**
   - Clear localStorage and try again
   - Check user data in `data/users.json`
   - Verify API routes are working

4. **Build Errors**
   - Run `npm install` again
   - Clear `.next` folder
   - Check TypeScript errors with `npm run typecheck`

---

## 📝 Recent Updates

### Version 0.1.0 (Current)

- ✅ Complete authentication system
- ✅ Protected chatbot access
- ✅ Recent login tracking
- ✅ Admin dashboard improvements
- ✅ WhatsApp integration with async processing
- ✅ Enhanced UI/UX with smooth scrolling
- ✅ Multiple AI features (symptom analysis, image analysis, voice analysis)
- ✅ Multilingual support (5 languages)
- ✅ Responsive design
- ✅ Error handling and validation

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 👥 Team

| Name | Role |
|------|------|
| **Aditya Kude** | Project Lead / Backend Developer |
| **Bharat Bajaraddi** | AI & NLP Engineer |
| **Gireesh Biradar** | Frontend Developer |
| **Guruling Dandinavar** | Research & Data Integration |
| **Dr. Rajesh Yakkundimath** | Faculty Mentor |

**Institution**: KLE Institute of Technology, Hubballi, Karnataka

---

## 📞 Contact

- **Email**: kudeaditya@gmail.com
- **Institution**: KLE Institute of Technology, Hubballi
- **Project**: Health Project 2025 – Software Edition

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **Google Genkit** for AI framework
- **Twilio** for WhatsApp/SMS integration
- **shadcn/ui** for UI components
- **Next.js Team** for the amazing framework
- **Open Source Community** for various libraries and tools

---

## 🔮 Future Roadmap

- [ ] Firebase integration for real-time data
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] More language support
- [ ] Enhanced sign language recognition
- [ ] Voice call integration
- [ ] Telemedicine integration
- [ ] Health record management
- [ ] Appointment scheduling
- [ ] Integration with government health APIs

---

**Built with ❤️ for a healthier society**
