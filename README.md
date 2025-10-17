
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

Features Working:
✅ User Signup - Create new accounts
✅ User Login - Access chat interface
✅ Admin Login - Access admin dashboard
✅ Form Validation - Real-time error messages
✅ Loading States - Visual feedback during authentication
✅ Session Persistence - User stays logged in across page refreshes
📱 Current Status:
✅ Build: Successful (no errors)
✅ Runtime: No more TypeError or module errors
✅ Server: Running on http://localhost:3000
✅ Authentication: Fully functional
✅ Forms: Working with proper validation
✅ Navigation: Automatic redirects working

What's Working Now:
Login Page - All three tabs (Signup, User Login, Admin Login) are functional
Form Validation - Proper error messages and loading states
Authentication Flow - Users can login and access appropriate sections
Session Management - User sessions persist across browser refreshes
Navigation - Automatic redirects to chat (users) or admin dashboard (admins)



 
👨‍💻 *Developed by Team KLE Institute of Technology, Hubballi*  

[![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-Backend-black?logo=flask)](https://flask.palletsprojects.com/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-ML-orange?logo=tensorflow)](https://www.tensorflow.org/)
[![Dialogflow](https://img.shields.io/badge/Dialogflow-NLP-yellow?logo=dialogflow)](https://cloud.google.com/dialogflow)
[![Twilio](https://img.shields.io/badge/Twilio-WhatsApp%20Integration-green?logo=twilio)](https://www.twilio.com/)
[![License](https://img.shields.io/badge/License-MIT-lightgrey)](LICENSE)

---

## 🧩 Overview

The **AI-Driven Public Health Chatbot** is a multilingual, multimodal healthcare assistant designed to educate and assist **semi-literate and differently-abled users**.  
It provides **voice, sign, text, and facial interaction modes** for inclusivity and integrates with **official health databases** for real-time outbreak alerts.

🧠 **Built using:** AI + NLP + Speech Recognition + Computer Vision  
📱 **Accessible via:** Web • WhatsApp • SMS  
🌐 **Languages:** English, Hindi, Kannada (expandable)

---

## 🎯 Objectives

- Deliver verified **preventive healthcare information** in local languages.  
- Support **semi-literate users** via voice and **differently-abled users** via ISL (Indian Sign Language).  
- Detect **health-related vocal or facial symptoms**.  
- Provide **vaccination reminders** and **outbreak alerts** from Govt. APIs.  
- Work seamlessly on low bandwidth and WhatsApp/SMS platforms.

---

## 🚀 Features

| Module | Description |
|--------|--------------|
| 🗣️ **Voice Analysis** | Converts speech → text and detects cough/breath using the **Coswara Dataset**. |
| ✋ **Sign Language (ISL)** | Recognizes and translates ISL gestures (IIIT-ISL Dataset). |
| 😊 **Facial Screening** | Detects signs like jaundice/rashes using **OpenCV + MobileNet**. |
| 💬 **Multilingual Chatbot** | Powered by **Dialogflow / Rasa**, supports Indic languages. |
| 🩺 **Smart Health Alerts** | Fetches real-time outbreak data from **MoHFW / IDSP** APIs. |
| 📊 **Admin Dashboard** | Monitor users, manage reminders, and send emergency alerts. |

---

## 🏗️ System Architecture

![System Architecture](https://raw.githubusercontent.com/yourusername/AI-HealthChatbot/main/docs/System_Architecture.png)

User (Text / Voice / Sign / Facial Input)
│
▼
[ Input Processor Layer ]
├─ Whisper / Google ASR
├─ CNN+LSTM (ISL)
├─ OpenCV (Facial Screening)
└─ Translation API
│
▼
[ AI Engine Layer ]
├─ NLP (Dialogflow / Rasa)
├─ Symptom Detection (Coswara)
├─ Health Data Integrator
│
▼
[ Output Layer ]
├─ Text
├─ Voice (gTTS)
└─ Sign Avatar (MediaPipe / SignAvatar)

yaml
Copy code

---

## 🧬 Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | HTML5, TailwindCSS, JavaScript |
| **Backend** | Python (Flask / FastAPI) |
| **AI Models** | TensorFlow, Whisper, Dialogflow |
| **Vision Models** | OpenCV, MobileNet, MediaPipe |
| **Database** | PostgreSQL / Firebase |
| **Deployment** | Docker, Render, AWS Lambda |
| **Communication** | Twilio API (WhatsApp + SMS) |
| **Translation** | IndicTrans2 / Google Translate API |

---

## 🧠 Datasets & APIs

| Dataset / API | Purpose | Source |
|----------------|----------|---------|
| **Coswara (IISc Bangalore)** | Voice, cough, breath analysis | [https://coswara.iisc.ac.in](https://coswara.iisc.ac.in) |
| **IIIT-ISL Dataset** | Indian Sign Language recognition | [IIIT Hyderabad CVIT](https://cvit.iiit.ac.in/research/projects/cvit-projects/isl) |
| **MoHFW Data** | Vaccination & disease info | [https://www.mohfw.gov.in](https://www.mohfw.gov.in) |
| **IDSP API** | Real-time outbreak tracking | [https://idsp.nic.in](https://idsp.nic.in) |
 https://www.kaggle.com/datasets
---

## 🔬 Implementation Roadmap

| Phase | Milestone | Status |
|-------|------------|---------|
| 🧩 Phase 1 | Problem analysis, architecture, dataset research | ✅ Completed |
| ⚙️ Phase 2 | Voice + Text chatbot (Flask + Dialogflow) | ✅ Completed |
| 🖐 Phase 3 | ISL & Facial detection modules | 🕐 Planned |
| 💬 Phase 4 | WhatsApp & SMS integration (Twilio) | ✅ Completed |
| 📊 Phase 5 | Admin Dashboard + Analytics | ✅ Completed|
| ☁️ Phase 6 | Cloud deployment (Render / Firebase) | 🕐 Planned |

---

## 📁 Folder Structure

AI-HealthChatbot/
│── docs/ # Documentation, PPTs, diagrams
│── backend/ # Flask/FastAPI + AI logic
│── frontend/ # Chat UI + Admin Dashboard
│── ai_models/ # NLP, Voice, Vision training
│── database/ # Schema, seed data
│── deployment/ # Docker, cloud configs
│── tests/ # Unit & integration tests
└── README.md

yaml
Copy code

---

## 📊 Evaluation Metrics

| Metric | Target Accuracy |
|---------|----------------|
| Speech-to-Text (Whisper) | ≥ 94% |
| Cough/Breath Detection | ≥ 85% |
| NLP Intent Recognition | ≥ 80% |
| Latency (Response Time) | ≤ 2 sec |
| Awareness Improvement | +20% (pilot testing) |

---

## 📚 References

1. **Bhattacharya, D. et al. (2023)** – *Coswara: A Respiratory Sounds and Symptoms Dataset for Remote Screening of SARS-CoV-2 Infection.* [PubMed](https://pubmed.ncbi.nlm.nih.gov/37349364/)  
2. **Pahar, M. & Niesler, T. (2021)** – *Machine Learning-based COVID-19 Detection from Smartphone Recordings: Cough, Breath and Speech.* [arXiv](https://arxiv.org/abs/2106.08563)  
3. **Imran, A. et al. (2020)** – *AI4COVID-19: AI Enabled Preliminary Diagnosis from Cough Sounds.* [IEEE Access](https://ieeexplore.ieee.org/document/9144181)  
4. **Radford, A. et al. (2022)** – *Whisper: Robust Speech Recognition via Large-Scale Weak Supervision.* [OpenAI Research](https://openai.com/research/whisper)  
5. **Patra, S. et al. (2024)** – *Hierarchical Windowed Graph Attention Network for ISL Recognition.* [arXiv](https://arxiv.org/abs/2407.14224)

---

## 👥 Team

| Name | Role |
|------|------|
| **Aditya Kude** | Project Lead / Backend Developer |
| **Bharat Bajaraddi** | AI & NLP Engineer |
| **Gireesh Biradar** | Frontend Developer |
| **Guruling Dandinavar** | Research & Data Integration |
| **Dr. Rajesh Yakkundimath** | Faculty Mentor |

---

## 💻 Setup Instructions

```bash
# Clone repo
git clone https://github.com/AdityaKude/AI-HealthChatbot.git
cd AI-HealthChatbot/backend

# Install dependencies
pip install -r requirements.txt

# Run Flask app
python app.py
Frontend can be run by opening /frontend/index.html in a browser.

🌍 Deployment
🐳 Docker: docker-compose up --build

☁️ Render / Firebase Hosting: /deployment/cloud_config.md

📞 Twilio WhatsApp: https://www.twilio.com/whatsapp

📞 Contact
📧 teamhealthai@kletech.ac.in
🏫 KLE Institute of Technology, Hubballi, Karnataka
🎯 Smart India Hackathon 2025 – Software Edition

