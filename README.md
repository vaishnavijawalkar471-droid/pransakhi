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
- #### 1. **8 Regional Languages Support**
- English, Hindi, Marathi, Bengali, Punjabi, Tamil, Telugu, Gujarati
- Complete UI translation
- **Voice recognition in all languages** 🎤
- **Speech output in native languages** 🔊
- **Welcome greetings spoken in selected language**
- **Results and remedies read aloud automatically**

#### 2. **MCQ-Based Symptom Selection**
- NO TYPING REQUIRED - Voice OR MCQ
- Step-by-step guided flow:
  1. Select body part (Head, Chest, Stomach, etc.)
  2. Choose specific symptom
  3. Rate severity (Mild/Moderate/Severe)
  4. Duration (Hours to Weeks)
- Large, accessible buttons with icons
- Perfect for elderly and low-literacy users

#### 3. **Regional Home Remedies**
- North India (Hindi/Punjabi): Tulsi, Ajwain, Haldi-based remedies
- West India (Marathi/Gujarati): Neem, Kokum, Sandalwood remedies
- East India (Bengali): Traditional Bengali home treatments
- South India (Tamil/Telugu): Coriander, Pepper rasam remedies
- Remedies shown in user's selected language

#### 4. **Advanced Illness Detection**
- Synonym tracking for critical conditions
- Detects emergencies: Heart attack, Stroke, Breathing emergencies
- Multiple ways to describe same symptom
- Intelligent pattern matching

#### 5. **Hospital & Clinic Finder**
- Find nearby hospitals, clinics, pharmacies
- Filter by type
- Shows distance, phone, address
- One-tap calling
- Location-based results

---

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Safari, Edge, Firefox)
- **No server required** - runs entirely in browser
- **No dependencies** - pure HTML, CSS, JavaScript



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
## 🤝 Contributing

This is a hackathon prototype built in 24 hours. Contributions welcome!

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

**Made for humanity. Built for accessibility. Designed for trust.** 🏥💚
