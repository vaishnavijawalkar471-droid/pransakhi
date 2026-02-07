// PRANSAKHI Enhanced - Main Application Logic
const AppState = {
    currentScreen: 'language',
    previousScreen: null,
    selectedLanguage: 'en',
    selectedRegion: 'general',
    isListening: false,
    recognition: null,
    synthesis: null,
    currentResult: null,
    symptomSelection: {bodyPart: null, symptom: null, severity: null, duration: null},
    reminders: [],
    history: []
};

document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    loadLocalStorage();
    initializeSpeechAPIs();
    setupEventListeners();
}

function loadLocalStorage() {
    const saved = localStorage.getItem('pransakhi_data');
    if (saved) {
        const data = JSON.parse(saved);
        AppState.reminders = data.reminders || [];
        AppState.history = data.history || [];
        AppState.selectedLanguage = data.language || 'en';
        AppState.selectedRegion = data.region || 'general';
    }
}

function saveToLocalStorage() {
    localStorage.setItem('pransakhi_data', JSON.stringify({
        reminders: AppState.reminders,
        history: AppState.history,
        language: AppState.selectedLanguage,
        region: AppState.selectedRegion
    }));
}

function initializeSpeechAPIs() {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        AppState.recognition = new SR();
        AppState.recognition.continuous = false;
        AppState.recognition.interimResults = true;
        AppState.recognition.onresult = handleSpeechResult;
        AppState.recognition.onerror = (e) => {
            console.error('Speech recognition error:', e.error);
            showToast('Voice error. Please use MCQ or try again.');
        };
        AppState.recognition.onend = () => AppState.isListening = false;
        console.log('Speech recognition initialized');
    }
    
    // Initialize Speech Synthesis
    if ('speechSynthesis' in window) {
        AppState.synthesis = window.speechSynthesis;
        
        // Load voices (important for regional languages)
        let voicesLoaded = false;
        
        const loadVoices = () => {
            const voices = AppState.synthesis.getVoices();
            if (voices.length > 0 && !voicesLoaded) {
                voicesLoaded = true;
                console.log('Voices loaded:', voices.length);
                
                // Log available Indian language voices
                const indianVoices = voices.filter(v => v.lang.includes('-IN'));
                console.log('Indian voices available:', indianVoices.map(v => `${v.name} (${v.lang})`));
                
                // Check which regional languages are supported
                Object.entries(SPEECH_LANG_CODES).forEach(([lang, code]) => {
                    const hasVoice = voices.some(v => v.lang === code || v.lang.startsWith(code.split('-')[0]));
                    console.log(`${lang} (${code}): ${hasVoice ? '✓ Supported' : '✗ Not available'}`);
                });
            }
        };
        
        // Chrome loads voices asynchronously
        if (AppState.synthesis.onvoiceschanged !== undefined) {
            AppState.synthesis.onvoiceschanged = loadVoices;
        }
        
        // Try loading immediately
        loadVoices();
        
        // Also try after a delay
        setTimeout(loadVoices, 100);
        
        console.log('Speech synthesis initialized');
    }
}

function setupEventListeners() {
    // Language selection
    document.querySelectorAll('.language-card').forEach(card => {
        card.addEventListener('click', () => {
            const lang = card.dataset.lang;
            const region = card.dataset.region;
            selectLanguage(lang, region);
        });
    });
    
    // Change language button
    const changeLangBtn = document.getElementById('change-language');
    if (changeLangBtn) {
        changeLangBtn.addEventListener('click', () => navigateTo('language'));
    }
    
    // Main mic button
    const mainMic = document.getElementById('main-mic-btn');
    if (mainMic) mainMic.addEventListener('click', () => {
        navigateTo('listening');
        setTimeout(() => startListening(), 500);
    });
    
    // Navigation
    document.addEventListener('click', e => {
        const nav = e.target.closest('[data-screen]');
        if (nav) navigateTo(nav.dataset.screen);
        const back = e.target.closest('[data-back]');
        if (back) goBack();
    });
    
    // Body part selection
    setTimeout(() => {
        const bodyGrid = document.getElementById('body-parts-grid');
        if (bodyGrid) populateBodyParts();
    }, 100);
    
    // Severity buttons
    document.querySelectorAll('.severity-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.severity-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            AppState.symptomSelection.severity = btn.dataset.severity;
            showStep('step-duration');
        });
    });
    
    // Duration buttons
    document.querySelectorAll('.duration-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            AppState.symptomSelection.duration = btn.dataset.duration;
            analyzeSymptoms();
        });
    });
    
    // Voice alternative
    const voiceBtn = document.getElementById('use-voice-btn');
    if (voiceBtn) voiceBtn.addEventListener('click', () => {
        navigateTo('listening');
        setTimeout(() => startListening(), 500);
    });
    
    // Stop listening
    const stopBtn = document.getElementById('stop-listening');
    if (stopBtn) stopBtn.addEventListener('click', () => {
        stopListening();
        goBack();
    });
    
    // Read advice
    const readBtn = document.getElementById('read-advice');
    if (readBtn) readBtn.addEventListener('click', () => {
        if (AppState.currentResult?.voiceMessage) {
            speak(AppState.currentResult.voiceMessage);
        } else if (AppState.currentResult?.advice) {
            speak(AppState.currentResult.advice);
        }
    });
    
    // Find hospital
    const findHospital = document.getElementById('find-nearby-hospital');
    if (findHospital) findHospital.addEventListener('click', () => {
        navigateTo('hospitals');
        renderHospitals();
    });
    
    // Medicine reminder
    const addReminder = document.getElementById('add-reminder');
    if (addReminder) addReminder.addEventListener('click', addMedicineReminder);
    
    // Emergency buttons
    const callAmb = document.getElementById('call-ambulance');
    if (callAmb) callAmb.addEventListener('click', () => {
        speak(t('callAmbulance', AppState.selectedLanguage) + '. 108');
        window.location.href = 'tel:108';
    });
    
    // Hospital filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderHospitals(btn.dataset.filter);
        });
    });
}

function selectLanguage(lang, region) {
    AppState.selectedLanguage = lang;
    AppState.selectedRegion = region;
    
    if (AppState.recognition) {
        AppState.recognition.lang = SPEECH_LANG_CODES[lang] || 'en-IN';
    }
    
    updateI18n();
    saveToLocalStorage();
    
    // Speak welcome message in selected language
    const welcomeMessages = {
        en: "Welcome to PRANSAKHI. Your health assistant is ready.",
        hi: "प्रणसखी में आपका स्वागत है। आपका स्वास्थ्य सहायक तैयार है।",
        mr: "प्रणसखीमध्ये आपले स्वागत आहे। तुमचा आरोग्य सहाय्यक तयार आहे।",
        bn: "প্রণসখীতে আপনাকে স্বাগতম। আপনার স্বাস্থ্য সহায়क প্রস্তুত।",
        pa: "ਪ੍ਰਣਸਖੀ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ। ਤੁਹਾਡਾ ਸਿਹਤ ਸਹਾਇਕ ਤਿਆਰ ਹੈ।",
        ta: "ப்ரணசகீக்கு வரவேற்கிறோம். உங்கள் சுகாதார உதவியாளர் தயாராக உள்ளது.",
        te: "ప్రణసఖీకి స్వాగతం. మీ ఆరోగ్య సహాయకుడు సిద్ధంగా ఉన్నారు.",
        gu: "પ્રણસખીમાં આપનું સ્વાગત છે. તમારો આરોગ્ય સહાયક તૈયાર છે."
    };
    
    const welcomeMsg = welcomeMessages[lang] || welcomeMessages.en;
    
    // Delay speak to ensure voices are loaded
    setTimeout(() => {
        speak(welcomeMsg);
    }, 500);
    
    navigateTo('home');
    
    const currentLang = document.getElementById('current-lang');
    if (currentLang) currentLang.textContent = lang.toUpperCase();
}

function updateI18n() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const text = t(key, AppState.selectedLanguage);
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = text;
        } else {
            el.textContent = text;
        }
    });
}

function populateBodyParts() {
    const grid = document.getElementById('body-parts-grid');
    if (!grid) return;
    
    const parts = BODY_PARTS[AppState.selectedLanguage] || BODY_PARTS.en;
    const icons = ['🧠', '💓', '🫃', '🗣️', '🧍', '🦵', '🦴', '➕'];
    
    grid.innerHTML = parts.map((part, i) => `
        <button class="mcq-option" data-body-part="${i}">
            <span class="mcq-icon">${icons[i]}</span>
            <span class="mcq-label">${part}</span>
        </button>
    `).join('');
    
    grid.querySelectorAll('.mcq-option').forEach((btn, i) => {
        btn.addEventListener('click', () => {
            const partKeys = Object.keys(SYMPTOMS_BY_PART);
            AppState.symptomSelection.bodyPart = partKeys[i] || 'other';
            populateSymptoms(partKeys[i] || 'other');
            showStep('step-symptom');
        });
    });
}

function populateSymptoms(bodyPart) {
    const grid = document.getElementById('symptoms-grid');
    if (!grid) return;
    
    const symptoms = SYMPTOMS_BY_PART[bodyPart]?.[AppState.selectedLanguage] || 
                     SYMPTOMS_BY_PART[bodyPart]?.en || ['Pain', 'Discomfort', 'Other'];
    
    grid.innerHTML = symptoms.map(symptom => `
        <button class="mcq-option">
            <span class="mcq-label">${symptom}</span>
        </button>
    `).join('');
    
    grid.querySelectorAll('.mcq-option').forEach((btn, i) => {
        btn.addEventListener('click', () => {
            AppState.symptomSelection.symptom = symptoms[i];
            showStep('step-severity');
        });
    });
}

function showStep(stepId) {
    document.querySelectorAll('.symptom-step').forEach(s => s.classList.remove('active'));
    const step = document.getElementById(stepId);
    if (step) step.classList.add('active');
}

function analyzeSymptoms() {
    const {bodyPart, symptom, severity, duration} = AppState.symptomSelection;
    const result = analyzeSymptomsMCQ(bodyPart, symptom, severity, duration);
    
    const remedies = getRegionalRemedies(symptom, AppState.selectedRegion, AppState.selectedLanguage);
    
    AppState.currentResult = {
        ...result,
        symptom: symptom,
        remedies: remedies,
        advice: generateAdvice(result.risk, AppState.selectedLanguage)
    };
    
    addToHistory();
    displayResult();
    navigateTo('result');
    
    // Announce analysis complete in regional language
    const analyzingMessages = {
        en: "Analysis complete. Here is your health advice.",
        hi: "विश्लेषण पूरा हुआ। यहाँ आपकी स्वास्थ्य सलाह है।",
        mr: "विश्लेषण पूर्ण झाले. येथे तुमचा आरोग्य सल्ला आहे।",
        bn: "বিশ্লেষণ সম্পূর্ণ। এখানে আপনার স্বাস্থ্য পরামর্শ।",
        pa: "ਵਿਸ਼ਲੇਸ਼ਣ ਪੂਰਾ ਹੋਇਆ। ਇਹ ਤੁਹਾਡਾ ਸਿਹਤ ਸਲਾਹ ਹੈ।",
        ta: "பகுப்பாய்வு முடிந்தது. இதோ உங்கள் சுகாதார ஆலோசனை.",
        te: "విశ్లేషణ పూర్తయింది. ఇదిగో మీ ఆరోగ్య సలహా.",
        gu: "વિશ્લેષણ પૂર્ણ થયું. આ રહ્યો તમારો આરોગ્ય સલાહ."
    };
    
    setTimeout(() => {
        speak(analyzingMessages[AppState.selectedLanguage] || analyzingMessages.en);
        // Then speak the full advice after a pause
        setTimeout(() => {
            if (AppState.currentResult.voiceMessage) {
                speak(AppState.currentResult.voiceMessage);
            }
        }, 2000);
    }, 500);
}

function generateAdvice(risk, lang) {
    const adviceMap = {
        low: t('homeCareSufficient', lang),
        medium: t('seeDoctorSoon', lang),
        high: t('seekImmediateHelp', lang)
    };
    return adviceMap[risk] || adviceMap.low;
}

function displayResult() {
    const container = document.getElementById('result-content');
    if (!container || !AppState.currentResult) return;
    
    const {risk, symptom, remedies, advice} = AppState.currentResult;
    const riskClass = `risk-${risk}`;
    const riskLabel = t(risk === 'low' ? 'lowRisk' : risk === 'medium' ? 'mediumRisk' : 'highRisk', AppState.selectedLanguage);
    
    let html = `
        <div class="risk-badge ${riskClass}">${riskLabel}</div>
        <h3>${symptom}</h3>
        <p>${advice}</p>
        <h4>${t('regionalRemedies', AppState.selectedLanguage)}:</h4>
        <ul>${remedies.map(r => `<li>${r}</li>`).join('')}</ul>
    `;
    
    // Add what to do section with translations
    const whatToDoMessages = {
        en: "What you should do:",
        hi: "आपको क्या करना चाहिए:",
        mr: "तुम्ही काय करावे:",
        bn: "আপনার কী করা উচিত:",
        pa: "ਤੁਹਾਨੂੰ ਕੀ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ:",
        ta: "நீங்கள் என்ன செய்ய வேண்டும்:",
        te: "మీరు ఏమి చేయాలి:",
        gu: "તમારે શું કરવું જોઈએ:"
    };
    
    html += `<h4>${whatToDoMessages[AppState.selectedLanguage] || whatToDoMessages.en}</h4>`;
    
    // Add risk-specific advice in regional language
    if (risk === 'high') {
        const emergencyAdvice = {
            en: ["Call emergency services (108) immediately", "Do not drive yourself", "Have someone stay with you", "Follow first aid if trained"],
            hi: ["तुरंत आपातकालीन सेवाओं (108) को कॉल करें", "खुद गाड़ी न चलाएं", "किसी को अपने साथ रखें", "प्रशिक्षित हों तो प्राथमिक उपचार करें"],
            mr: ["आपत्कालीन सेवा (108) ला लगेच कॉल करा", "स्वतः गाडी चालवू नका", "कोणीतरी तुमच्यासोबत राहू द्या", "प्रशिक्षित असल्यास प्राथमिक उपचार करा"],
            bn: ["অবিলম্বে জরুরি সেবা (108) কল করুন", "নিজে গাড়ি চালাবেন না", "কেউ আপনার সাথে থাকুক", "প্রশিক্ষিত হলে প্রাথমিক চিকিৎসা করুন"],
            pa: ["ਤੁਰੰਤ ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ (108) ਨੂੰ ਕਾਲ ਕਰੋ", "ਖੁਦ ਗੱਡੀ ਨਾ ਚਲਾਓ", "ਕੋਈ ਤੁਹਾਡੇ ਨਾਲ ਰਹੇ", "ਸਿਖਲਾਈ ਹੋਵੇ ਤਾਂ ਪਹਿਲੀ ਸਹਾਇਤਾ ਕਰੋ"],
            ta: ["உடனடியாக அவசர சேவைகளை (108) அழைக்கவும்", "நீங்களே வாகனம் ஓட்ட வேண்டாம்", "யாராவது உங்களுடன் இருக்கட்டும்", "பயிற்சி பெற்றிருந்தால் முதலுதவி செய்யுங்கள்"],
            te: ["వెంటనే అత్యవసర సేవలను (108) కాల్ చేయండి", "మీరే వాహనం నడపకండి", "ఎవరైనా మీతో ఉండనివ్వండి", "శిక్షణ ఉంటే ప్రథమ చికిత్స చేయండి"],
            gu: ["તાત્કાલિક કટોકટી સેવાઓ (108) ને કૉલ કરો", "જાતે વાહન ચલાવશો નહીં", "કોઈ તમારી સાથે રહે", "તાલીમ હોય તો પ્રથમ સારવાર કરો"]
        };
        const adviceList = emergencyAdvice[AppState.selectedLanguage] || emergencyAdvice.en;
        html += `<ul>${adviceList.map(a => `<li>${a}</li>`).join('')}</ul>`;
    }
    
    container.innerHTML = html;
    
    // Prepare voice message that includes all information
    let voiceMessage = `${riskLabel}. ${advice}. `;
    if (remedies.length > 0) {
        voiceMessage += `${t('homeRemedies', AppState.selectedLanguage)}: ${remedies.slice(0, 3).join('. ')}. `;
    }
    
    // Store for "Read Aloud" button
    AppState.currentResult.voiceMessage = voiceMessage;
}

function startListening() {
    if (!AppState.recognition) {
        showToast('Voice not supported. Please use MCQ options.');
        return;
    }
    try {
        AppState.recognition.lang = SPEECH_LANG_CODES[AppState.selectedLanguage] || 'en-IN';
        AppState.recognition.start();
        AppState.isListening = true;
    } catch (e) {
        showToast('Please use MCQ options or try again.');
    }
}

function stopListening() {
    if (AppState.recognition && AppState.isListening) {
        AppState.recognition.stop();
        AppState.isListening = false;
    }
}

function handleSpeechResult(event) {
    const transcript = Array.from(event.results).map(r => r[0].transcript).join('');
    const box = document.getElementById('transcript-text');
    if (box) {
        box.textContent = transcript;
        box.style.fontStyle = 'normal';
    }
    
    if (event.results[0].isFinal) {
        const critical = detectCriticalCondition(transcript);
        if (critical.critical) {
            AppState.currentResult = {
                risk: 'high',
                symptom: critical.condition,
                remedies: [],
                advice: t('seekImmediateHelp', AppState.selectedLanguage)
            };
        } else {
            AppState.currentResult = {
                risk: 'medium',
                symptom: transcript,
                remedies: getRegionalRemedies('general', AppState.selectedRegion, AppState.selectedLanguage),
                advice: t('seeDoctorSoon', AppState.selectedLanguage)
            };
        }
        addToHistory();
        displayResult();
        navigateTo('result');
        setTimeout(() => speak(AppState.currentResult.advice), 1000);
    }
}

function speak(text) {
    if (!AppState.synthesis) return;
    AppState.synthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = SPEECH_LANG_CODES[AppState.selectedLanguage] || 'en-IN';
    utterance.rate = 0.85; // Slightly slower for clarity in regional languages
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Try to find a voice that matches the selected language
    const voices = AppState.synthesis.getVoices();
    const langCode = SPEECH_LANG_CODES[AppState.selectedLanguage];
    
    // Find the best matching voice
    let selectedVoice = voices.find(voice => voice.lang === langCode);
    
    // Fallback: try language prefix match (e.g., 'hi' matches 'hi-IN')
    if (!selectedVoice) {
        const langPrefix = langCode.split('-')[0];
        selectedVoice = voices.find(voice => voice.lang.startsWith(langPrefix));
    }
    
    // Fallback: try any Indian voice
    if (!selectedVoice) {
        selectedVoice = voices.find(voice => voice.lang.includes('-IN'));
    }
    
    if (selectedVoice) {
        utterance.voice = selectedVoice;
        console.log('Using voice:', selectedVoice.name, selectedVoice.lang);
    }
    
    // Handle voice loading
    utterance.onerror = (e) => {
        console.error('Speech synthesis error:', e);
        // Show visual feedback if voice fails
        showToast('Reading advice (voice may not be available for this language)');
    };
    
    utterance.onend = () => {
        console.log('Speech completed');
    };
    
    AppState.synthesis.speak(utterance);
    
    // Show visual indicator that voice is speaking
    showToast('🔊 ' + (AppState.selectedLanguage === 'en' ? 'Reading aloud...' : 'पढ़ रहा है...'));
}

function navigateTo(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    AppState.previousScreen = AppState.currentScreen;
    AppState.currentScreen = screen;
    const target = document.getElementById(`${screen}-screen`);
    if (target) setTimeout(() => target.classList.add('active'), 50);
}

function goBack() {
    navigateTo(AppState.previousScreen || 'home');
}

function addMedicineReminder() {
    const name = document.getElementById('medicine-name').value.trim();
    const time = document.getElementById('medicine-time').value;
    const dosage = document.getElementById('medicine-dosage').value.trim();
    
    if (!name || !time) {
        const errorMsg = t('medicineName', AppState.selectedLanguage) + ' ' + t('time', AppState.selectedLanguage);
        showToast(errorMsg);
        speak(errorMsg);
        return;
    }
    
    AppState.reminders.push({id: Date.now(), name, time, dosage: dosage || '1 tablet'});
    saveToLocalStorage();
    renderReminders();
    
    // Speak confirmation in selected language
    const confirmMessages = {
        en: `Reminder set for ${name} at ${time}. You will be notified.`,
        hi: `${name} के लिए ${time} बजे रिमाइंडर सेट किया गया। आपको सूचित किया जाएगा।`,
        mr: `${name} साठी ${time} वाजता रिमाइंडर सेट केला. तुम्हाला सूचित केले जाईल।`,
        bn: `${name} এর জন্য ${time} এ রিমাইন্ডার সেট করা হয়েছে। আপনাকে জানানো হবে।`,
        pa: `${name} ਲਈ ${time} ਵਜੇ ਰਿਮਾਈਂਡਰ ਸੈੱਟ ਕੀਤਾ ਗਿਆ। ਤੁਹਾਨੂੰ ਸੂਚਿਤ ਕੀਤਾ ਜਾਵੇਗਾ।`,
        ta: `${name} க்கு ${time} மணிக்கு நினைவூட்டல் அமைக்கப்பட்டது. உங்களுக்கு அறிவிக்கப்படும்.`,
        te: `${name} కోసం ${time} కు రిమైండర్ సెట్ చేయబడింది. మీకు తెలియజేయబడుతుంది.`,
        gu: `${name} માટે ${time} વાગ્યે રિમાઇન્ડર સેટ કર્યું. તમને જાણ કરવામાં આવશે.`
    };
    
    const msg = confirmMessages[AppState.selectedLanguage] || confirmMessages.en;
    showToast('✓ ' + t('addReminder', AppState.selectedLanguage));
    speak(msg);
    
    document.getElementById('medicine-name').value = '';
    document.getElementById('medicine-time').value = '';
    document.getElementById('medicine-dosage').value = '';
}

function renderReminders() {
    const container = document.getElementById('reminders-container');
    if (!container) return;
    
    if (AppState.reminders.length === 0) {
        container.innerHTML = `<div class="empty-state"><p>${t('yourReminders', AppState.selectedLanguage)}</p></div>`;
        return;
    }
    
    container.innerHTML = AppState.reminders.map(r => `
        <div class="reminder-item">
            <div class="reminder-info">
                <h4>${r.name}</h4>
                <p>${r.dosage}</p>
            </div>
            <div>
                <span class="reminder-time">${r.time}</span>
                <button class="delete-reminder" onclick="deleteReminder(${r.id})">×</button>
            </div>
        </div>
    `).join('');
}

function deleteReminder(id) {
    AppState.reminders = AppState.reminders.filter(r => r.id !== id);
    saveToLocalStorage();
    renderReminders();
    showToast('Deleted');
}

window.deleteReminder = deleteReminder;

function addToHistory() {
    if (!AppState.currentResult) return;
    AppState.history.unshift({
        id: Date.now(),
        date: new Date().toLocaleString(AppState.selectedLanguage),
        symptom: AppState.currentResult.symptom,
        risk: AppState.currentResult.risk
    });
    if (AppState.history.length > 20) AppState.history = AppState.history.slice(0, 20);
    saveToLocalStorage();
}

function renderHospitals(filter = 'all') {
    const container = document.getElementById('hospitals-list');
    if (!container) return;
    
    const hospitals = getHospitals('pune', filter);
    container.innerHTML = hospitals.map(h => `
        <div class="hospital-card">
            <div class="hospital-type">${h.type}</div>
            <h4>${h.name}</h4>
            <p>📍 ${h.address}</p>
            <p>📞 ${h.phone}</p>
            <p>📏 ${h.distance}</p>
            <button class="call-btn" onclick="window.location.href='tel:${h.phone}'">Call Now</button>
        </div>
    `).join('');
}

function showToast(msg) {
    const toast = document.getElementById('notification-toast');
    const msgEl = toast.querySelector('.toast-message');
    if (msgEl) msgEl.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

console.log('PRANSAKHI Enhanced loaded successfully');
