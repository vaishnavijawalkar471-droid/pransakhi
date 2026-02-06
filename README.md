# PRANSAKHI - Voice-Based Offline Healthcare Assistant

![PRANSAKHI Logo](https://img.shields.io/badge/PRANSAKHI-Healthcare%20Assistant-4CAF50?style=for-the-badge)

## 🎯 Project Overview

PRANSAKHI is a **voice-first, offline-capable healthcare assistant** designed for **rural families, elderly people, and low-literacy users** in India. Built as a complete hackathon prototype, it provides symptom triage, medicine reminders, and emergency assistance with a focus on accessibility and trust.

---

## ✨ Key Features

### 🎤 Voice-First Interaction
- **Web Speech API** integration for hands-free operation
- Real-time voice transcription
- Text-to-speech advice playback
- Fallback to text input when voice isn't available

### 🩺 Symptom Triage System
- Intelligent symptom analysis with **3-tier risk assessment**:
  - ❌ **HIGH RISK**: Emergency conditions requiring immediate medical attention
  - ⚠️ **MEDIUM RISK**: Conditions needing doctor visit within 24 hours
  - ✅ **LOW RISK**: Home care recommendations
- Offline symptom database with 30+ conditions
- Personalized treatment advice
- Voice playback of health recommendations

### 💊 Medicine Reminders
- Set unlimited medication reminders
- Time-based notifications
- Dosage tracking
- Persistent storage (survives page refresh)
- Easy delete functionality

### 🚨 Emergency Mode
- **One-tap emergency assistance**
- Quick dial to emergency services (108)
- Family notification system
- First aid voice instructions
- Emergency tips and guidance

### 📋 Consultation History
- Automatically saves all symptom checks
- View past consultations with risk levels
- Track health over time
- Stored locally for privacy

### 📱 Progressive Web App (PWA)
- **Works offline** - no internet required after first load
- Installable on mobile devices
- Native app-like experience
- Fast and responsive

---

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Safari, Edge, Firefox)
- **No server required** - runs entirely in browser
- **No dependencies** - pure HTML, CSS, JavaScript

### Installation

1. **Download or clone the project**
```bash
git clone <repository-url>
cd pransakhi
```

2. **Open in browser**
   
   **Option A: Direct File**
   - Simply double-click `index.html`
   - Or drag `index.html` into your browser
   
   **Option B: Local Server (Recommended for PWA features)**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js
   npx serve
   ```
   
   Then open: `http://localhost:8000`

3. **Enable microphone** (for voice features)
   - Browser will ask for permission
   - Grant microphone access when prompted
   - Voice features work best in Chrome/Edge

---

## 📂 Project Structure

```
pransakhi/
│
├── index.html              # Main HTML structure (all screens)
├── style.css               # Complete styling (mobile-first)
├── script.js               # Core app logic and features
├── symptom-data.js         # Offline symptom database
├── manifest.json           # PWA configuration
└── README.md               # This file
```

### File Breakdown

**index.html** (570 lines)
- 7 complete screens: Splash, Home, Listening, Result, Medicine, Emergency, History
- Semantic HTML with ARIA labels for accessibility
- Bottom navigation
- Toast notifications

**style.css** (850+ lines)
- CSS custom properties for theming
- Mobile-first responsive design
- Smooth animations and transitions
- High contrast for readability
- Accessibility features (focus states, reduced motion)

**script.js** (500+ lines)
- State management
- Voice recognition/synthesis
- Navigation system
- localStorage persistence
- Event handling

**symptom-data.js** (200+ lines)
- 30+ symptom keywords
- 3-tier risk classification
- Treatment protocols
- Condition-specific advice

---

## 🎮 How to Use / Demo Guide

### 1️⃣ **Home Screen**
- See the big green microphone button
- Notice "Works Offline" badge in header
- Three quick action cards:
  - Check Symptoms
  - Medicine Reminder
  - Emergency Help

### 2️⃣ **Voice Symptom Check**
**Try these sample inputs:**

```
✅ LOW RISK:
- "I have a headache"
- "I'm feeling tired and have a mild cough"
- "I have a runny nose and sneezing"

⚠️ MEDIUM RISK:
- "I have a high fever"
- "My stomach is hurting a lot"
- "I've been vomiting since morning"

❌ HIGH RISK:
- "I'm having chest pain"
- "I can't breathe properly"
- "I'm feeling dizzy and have severe headache"
```

**Steps:**
1. Tap microphone button (or "Check Symptoms")
2. Speak or type symptoms
3. Get instant analysis with risk level
4. Hear voice advice automatically
5. Tap "Read Aloud" to replay advice

### 3️⃣ **Medicine Reminders**
1. Go to "Medicine Reminder" screen
2. Enter medicine name (e.g., "Paracetamol")
3. Set time (e.g., "09:00")
4. Add dosage (e.g., "1 tablet")
5. Tap "Add Reminder"
6. See confirmation toast + voice feedback

### 4️⃣ **Emergency Mode**
1. Tap red "Emergency Help" card
2. Choose action:
   - **Call Ambulance** → Dials 108
   - **Notify Family** → Sends mock alert
   - **First Aid Guide** → Plays voice instructions
3. Read emergency tips while waiting

### 5️⃣ **Consultation History**
- Navigate to "History" tab in bottom nav
- View all past symptom checks
- See risk levels and conditions
- Review advice given

---

## 🎨 Design Highlights

### Color Palette
- **Primary**: Green (#4CAF50) - Trust, health, growth
- **Secondary**: Blue (#2196F3) - Calm, professional
- **Emergency**: Red (#F44336) - Alert, urgent
- **Neutral**: Grays for text hierarchy

### Typography
- System fonts for fast loading
- Large, readable text (min 16px)
- High contrast ratios (WCAG AA compliant)

### Interactions
- Smooth 300ms transitions
- Tactile feedback on all buttons
- Pulse animations for active states
- Loading indicators

### Accessibility
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators
- Reduced motion support
- Screen reader friendly

---

## 🔧 Technical Highlights

### Offline-First Architecture
- **No external dependencies** - everything embedded
- LocalStorage for data persistence
- Mock API calls (ready to connect real backend)
- Works without internet after first load

### Voice Technology
- **Web Speech API** for recognition
- **SpeechSynthesis API** for text-to-speech
- Continuous interim results
- Error handling and fallbacks
- Hindi/English support ready

### Performance
- Vanilla JavaScript (no frameworks = fast)
- CSS animations (GPU accelerated)
- Lazy loading techniques
- < 100KB total bundle size

### Browser Compatibility
- ✅ Chrome/Edge (full features)
- ✅ Safari (full features on iOS 14.5+)
- ⚠️ Firefox (limited voice support)
- ✅ Mobile browsers (optimized)

---

## 📱 PWA Installation

### On Android/Chrome:
1. Open app in Chrome
2. Tap menu (⋮) → "Install app" or "Add to Home Screen"
3. App icon appears on home screen
4. Opens in standalone mode

### On iOS/Safari:
1. Open app in Safari
2. Tap Share button
3. Select "Add to Home Screen"
4. Name it and add to home

---

## 🧪 Testing Checklist

- [ ] Microphone permission granted
- [ ] Voice recognition works
- [ ] Text input fallback works
- [ ] Symptom analysis shows correct risk levels
- [ ] Voice advice plays automatically
- [ ] Medicine reminders save and persist
- [ ] Emergency buttons trigger appropriate actions
- [ ] History saves consultations
- [ ] Bottom navigation works
- [ ] App works offline (disable network)
- [ ] Responsive on mobile screens
- [ ] Toast notifications appear

---

## 🚧 Future Enhancements (Post-Hackathon)

### Phase 2 - Smart Features
- [ ] AI-powered symptom checker
- [ ] Integration with real medical databases
- [ ] Multi-language support (Hindi, Tamil, Telugu, etc.)
- [ ] Image-based diagnosis (rash, wound photos)
- [ ] Medicine barcode scanner

### Phase 3 - Connectivity
- [ ] Doctor video consultation
- [ ] Pharmacy integration
- [ ] Health records sync
- [ ] Family account linking
- [ ] Real-time ambulance tracking

### Phase 4 - Advanced
- [ ] Wearable device integration
- [ ] Chronic condition management
- [ ] Medication interaction warnings
- [ ] Telemedicine prescriptions
- [ ] Insurance claim assistance

---

## 🎯 Hackathon Pitch Points

### Problem
- 65% of India's population lives in rural areas
- Limited access to healthcare professionals
- Language and literacy barriers
- Smartphone penetration growing rapidly

### Solution
- Voice-first interface (no typing needed)
- Works offline (no internet required)
- Simple, large UI (elderly-friendly)
- Free and accessible to all

### Impact
- **Immediate**: Symptom triage saves lives
- **Preventive**: Medicine adherence improves health
- **Scalable**: Can serve millions at zero marginal cost
- **Equitable**: Bridges urban-rural healthcare gap

### Tech Innovation
- Progressive Web App (cross-platform)
- Voice AI (hands-free)
- Offline-first (no connectivity needed)
- Privacy-focused (data stays on device)

---

## 🤝 Contributing

This is a hackathon prototype built in 24 hours. Contributions welcome!

### To Add Features:
1. Fork the repository
2. Create feature branch
3. Add your code
4. Test thoroughly
5. Submit pull request

### Code Style:
- Use semantic HTML
- CSS custom properties for theming
- Clear comments explaining logic
- Mobile-first responsive design

---

## 📄 License

MIT License - Free to use, modify, and distribute

---

## 👨‍💻 Credits

Built with ❤️ for hackathon demo
- **Purpose**: Democratize healthcare access
- **Target**: Rural India, elderly, low-literacy users
- **Tech**: HTML5, CSS3, JavaScript (ES6+)
- **APIs**: Web Speech API, LocalStorage API

---

## 📞 Support

### Common Issues:

**Voice not working?**
- Enable microphone in browser settings
- Use Chrome/Edge for best compatibility
- Try typing instead (text input always works)

**Reminders not saving?**
- Check localStorage is enabled
- Don't use incognito/private mode
- Clear cache and reload

**App not installing as PWA?**
- Ensure using HTTPS or localhost
- Try Chrome/Edge browser
- Check manifest.json is loading

---

## 🎉 Demo Tips for Judges

1. **Start with voice demo**: Show the wow factor first
2. **Try emergency flow**: Demonstrates critical use case
3. **Show offline mode**: Disable network, still works
4. **Add medicine reminder**: Show persistence
5. **Check history**: Show data retention
6. **Highlight accessibility**: Large buttons, voice, simple language

### Sample Demo Script (2 minutes):

> "PRANSAKHI is a voice-first healthcare assistant for rural India. 
> 
> [TAP MIC] I'll speak: 'I have a fever and cough'
> 
> [SHOWS ANALYSIS] It instantly analyzes and gives advice in both text and voice. Notice it classified this as MEDIUM RISK and suggests seeing a doctor.
> 
> [NAVIGATE TO MEDICINE] I can set reminders - 'Paracetamol at 9 AM' - and it saves locally.
> 
> [SHOW EMERGENCY] For emergencies, one tap calls ambulance and gives first aid instructions.
> 
> [DISABLE NETWORK] Most importantly - it works completely offline. No internet needed.
> 
> Built in 24 hours with just HTML, CSS, and JavaScript. Ready to help millions."

---

**Made for humanity. Built for accessibility. Designed for trust.** 🏥💚
